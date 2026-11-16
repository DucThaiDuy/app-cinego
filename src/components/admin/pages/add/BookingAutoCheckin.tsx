import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BookingStatus } from "../../../../api/types/enum/BookingStatus";
import { PaymentMethod } from "../../../../api/types/enum/PaymentMethod";
import { RefreshCw, Camera } from "lucide-react";
import "./scss/BookingAutoCheckin.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";
import { adminBookingService } from "../../../../api/service/booking.service";
import type { BookingResponse } from "../../../../api/types/response/BookingResponse";
import { MessageContainer, useMessage } from "../../../UI/Message/Message";

export default function BookingAutoCheckin() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [scannedBooking, setScannedBooking] = useState<BookingResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const message = useMessage();
  const [cameraPermission, setCameraPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");

  // Load real bookings on mount
  const loadBookings = async () => {
    try {
      const response = await adminBookingService.fetchUsers({ page: 1, limit: 1000 });
      setBookings(response.items || []);
    } catch (error) {
      console.error("Failed to load bookings", error);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  const scanActiveRef = useRef<boolean>(false);
  const controlsRef = useRef<any>(null);
  const lastScannedCodeRef = useRef<{ code: string; time: number }>({ code: "", time: 0 });

  // Hàm phát âm thanh feedback
  const playSound = (type: 'success' | 'error') => {
    try {
      // Kiểm tra hỗ trợ Web Audio API
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        console.warn('Web Audio API không được hỗ trợ trên trình duyệt này');
        return;
      }

      const context = new AudioContext();
      
      // Resume context nếu cần (cho Chrome)
      if (context.state === 'suspended') {
        context.resume();
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      if (type === 'success') {
        // Âm thanh thành công
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.setValueAtTime(1000, context.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
      } else {
        // Âm thanh lỗi
        oscillator.frequency.setValueAtTime(300, context.currentTime);
        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
        
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.5);
      }
    } catch (error) {
      console.warn('Không thể phát âm thanh:', error);
      // Fallback: thử dùng Audio element
      try {
        const audio = new Audio();
        if (type === 'success') {
          // Có thể thêm file âm thanh thực tế ở đây
          console.log('✅ Check-in thành công!');
        } else {
          console.log('❌ Lỗi check-in!');
        }
      } catch (fallbackError) {
        console.warn('Fallback audio cũng thất bại:', fallbackError);
      }
    }
  };

  // Yêu cầu quyền camera
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((track) => track.stop()); // Dừng stream test
      setCameraPermission("granted");
      setErrorMsg("");
      return true;
    } catch (error: any) {
      console.error("Camera permission error:", error);
      setCameraPermission("denied");

      if (error.name === "NotAllowedError") {
        setErrorMsg(
          "❌ Vui lòng cho phép truy cập camera trong cài đặt trình duyệt!",
        );
      } else if (error.name === "NotFoundError") {
        setErrorMsg("❌ Không tìm thấy camera trên thiết bị!");
      } else {
        setErrorMsg("❌ Lỗi khi truy cập camera: " + error.message);
      }
      return false;
    }
  };

  const handleManualInput = async () => {
    const code = window.prompt("Nhập mã QR (UUID/Token) hoặc Mã Booking:");
    if (!code || !code.trim()) return;

    try {
      const adminInfoStr = localStorage.getItem("admin_info");
      if (!adminInfoStr) {
        message?.error("Không tìm thấy thông tin Admin. Vui lòng đăng nhập lại.");
        return;
      }
      const adminInfo = JSON.parse(adminInfoStr);

      const apiResult = await adminBookingService.checkInQr(code.trim(), adminInfo.id);
      const ticketData = apiResult?.data || apiResult; // Fallback nếu cấu trúc trả về khác

      playSound("success");
      setScannedBooking({ ...ticketData, status: ticketData?.status || 'USED' });
      message?.success(`✅ ${apiResult?.message || "Check-in thành công!"}`);
    } catch (err: any) {
      console.error("QR check-in error:", err);
      playSound("error");
      const errorDetail = err.response?.data?.message || err.message || "Lỗi xử lý mã";
      message?.error(`❌ ${errorDetail}`);
    }
  };

  // Bắt đầu quét
  const startScanning = async () => {
    if (!videoRef.current) return;

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setIsScanning(true);
    scanActiveRef.current = true;
    setErrorMsg("");
    isProcessingRef.current = false;

    try {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      controlsRef.current = await codeReader.decodeFromVideoElement(
        videoRef.current,
        async (result, err) => {
          if (isProcessingRef.current) return;

          if (result) {
            isProcessingRef.current = true;
            try {
              const rawData = result.getText();

              if (!rawData || rawData.trim() === '') {
                isProcessingRef.current = false;
                return;
              }

              const now = Date.now();
              if (lastScannedCodeRef.current.code === rawData && (now - lastScannedCodeRef.current.time) < 3000) {
                 isProcessingRef.current = false;
                 return; // Không xử lý lại mã vừa quét trong vòng 3s
              }
              lastScannedCodeRef.current = { code: rawData, time: now };

              console.log("QR scanned raw:", rawData);

              let lookupCode = rawData.trim();
              
              // Get adminId from localStorage
              const adminInfoStr = localStorage.getItem("admin_info");
              const adminInfo = adminInfoStr ? JSON.parse(adminInfoStr) : {};
              const adminId = adminInfo.id || 1; // Backend requires an adminId

              try {
                // Gửi thẳng Token quét được cho Backend giải quyết
                const apiResult = await adminBookingService.checkInQr(lookupCode, adminId);
                const ticketData = apiResult?.data || apiResult; // Lấy body data
                
                // Nếu thành công (Backend trả về HTTP 200)
                playSound("success");
                let successMsg = apiResult?.message || "✅ Check-in thành công!";
                if (ticketData?.customerName) {
                   successMsg += ` Khách: ${ticketData.customerName} - ${ticketData.bookingCode || ""}`;
                }

                setScannedBooking({ ...ticketData, status: 'USED' }); // Đè trạng thái thành USED
                message.success(successMsg);
                setErrorMsg("");
                
                // Cập nhật local state list (nếu đang hiển thị list)
                if (ticketData?.id) {
                  setBookings((prev) =>
                    prev.map((b) => b.id === ticketData.id ? { ...b, status: BookingStatus.USED as any } : b)
                  );
                }
              } catch (apiErr: any) {
                // Backend ném lỗi HTTP 400 Bad Request
                const errMsgStr = apiErr.response?.data?.message || apiErr.response?.data?.error || apiErr.message || "Lỗi đọc thẻ";
                const msg = `❌ Thất bại: ${errMsgStr}`;
                
                setErrorMsg(msg);
                playSound("error");
                message.error(msg);
                setScannedBooking(null);
              }
            } catch (processingError) {
              console.error("Error processing QR result:", processingError);
              setErrorMsg("❌ Lỗi xử lý mã QR!");
              playSound("error");
              message.error("Lỗi xử lý hệ thống");
            } finally {
              isProcessingRef.current = false;
            }
          } else if (err) {
            // Tắt xử lý nếu đã dừng quét
            if (!scanActiveRef.current) return;

            // ZXing throw continuous errors when scanning empty frames.
            const isIgnorableError = 
              err.name === "NotFoundException" || 
              err.name === "ChecksumException" || 
              err.name === "FormatException" || 
              (err.message && err.message.includes("No MultiFormat Readers"));
              
            if (!isIgnorableError) {
               console.warn("QR scan error:", err.message || err.name);
            }
          }
        },
      );
    } catch (error: any) {
      console.error("Start scanning error:", error);
      setErrorMsg("❌ Không thể khởi động camera: " + error.message);
      setIsScanning(false);
    }
  };

  // Dừng quét
  const stopScanning = () => {
    scanActiveRef.current = false;

    // Stop zxing controls loop
    if (controlsRef.current && controlsRef.current.stop) {
       try {
         controlsRef.current.stop();
       } catch (e) {
         console.warn("Failed to stop controls", e);
       }
       controlsRef.current = null;
    }

    // Dừng stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Clear video
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (codeReaderRef.current && typeof (codeReaderRef.current as any).reset === 'function') {
      try {
        (codeReaderRef.current as any).reset();
      } catch (e) {}
    }
    
    codeReaderRef.current = null;
    setIsScanning(false);
  };

  // Cleanup khi unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  // Cleanup khi component unmount hoặc khi dependencies thay đổi
  useEffect(() => {
    const cleanup = () => {
      if (codeReaderRef.current) {
        try {
          // BrowserMultiFormatReader không có method reset, chỉ cần set null
          codeReaderRef.current = null;
        } catch (error) {
          console.warn("Error cleaning up code reader:", error);
        }
      }
      stopScanning();
    };

    return cleanup;
  }, []);

  return (
    <div className="checkin-page">
      <MessageContainer
        messages={message.messages}
        onRemove={message.removeMessage}
      />
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý đặt vé", path: "/admin/bookings" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Checkin Auto" },
        ]}
        action={
          <button
            className="btn-add"
            onClick={() => {
              loadBookings();
              setScannedBooking(null);
              setErrorMsg("");
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={18} /> Tải lại Bookings
          </button>
        }
      />
      <div className="checkin-header">
        <h1><span className="red-square"></span> Check-in tự động bằng QR</h1>
        <p>Quét mã QR trên vé để check-in nhanh chóng</p>
      </div>

      <div className="checkin-split-layout">
        <div className="left-panel">
          <div className="qr-reader-section">
            <div className="qr-reader-container">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="qr-video"
              />

              {!isScanning && (
                <div className="qr-overlay">
                  <div className="qr-frame"></div>
                  <p>Camera chưa được bật</p>
                </div>
              )}
            </div>

            <div className="scanner-controls">
              {!isScanning ? (
                <button className="btn-start" onClick={startScanning}>
                  Bật Camera & Quét QR
                </button>
              ) : (
                <button className="btn-stop" onClick={stopScanning}>
                  Dừng Quét
                </button>
              )}
              <button className="btn-manual" onClick={handleManualInput}>Nhập mã</button>
            </div>
          </div>
        </div>

        <div className="right-panel">
          {scannedBooking && Object.keys(scannedBooking).length > 0 ? (
            <div className="booking-info">
              <div className="booking-header">
                <h2><span className="green-dot"></span> Thông tin Cuống Vé</h2>
                <span className={`status-badge ${scannedBooking.status || scannedBooking.tokenStatus || 'USED'}`}>
                  {scannedBooking.status || scannedBooking.tokenStatus || 'USED'}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <span className="label">Phim</span>
                  <span className="value">{scannedBooking.movieTitle || scannedBooking.movieName || scannedBooking.movie || "N/A"}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Suất chiếu</span>
                  <span className="value">
                    {scannedBooking.showTime || scannedBooking.time || "N/A"} — {scannedBooking.showDate || scannedBooking.date || "N/A"}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="label">Phòng / Ghế</span>
                  <span className="value">
                    {scannedBooking.hallName || scannedBooking.hall || scannedBooking.roomName || "N/A"} 
                    {" — Ghế "} 
                    {scannedBooking.seatNames || scannedBooking.seatName || scannedBooking.seats || "N/A"}
                  </span>
                </div>

                <div className="detail-row booking-code-row">
                  <span className="label">Mã Booking</span>
                  <span className="value code-val">{scannedBooking.bookingCode || scannedBooking.code || "N/A"}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Khách hàng</span>
                  <span className="value">{scannedBooking.customerName || scannedBooking.userName || "Khách vãng lai"}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Loại ghế</span>
                  <span className="value">Standard</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="booking-info placeholder">
               <span className="placeholder-icon"><Camera size={48} color="var(--admin-text-muted)" /></span>
               <h3>Đang chờ quét thẻ...</h3>
               <p>Hãy đưa mã QR vào trước ống kính camera. Thông tin vé sẽ hiển thị tại đây.</p>
            </div>
          )}
        </div>
      </div>

      {/* Camera Permission Instructions */}
      {cameraPermission === "denied" && (
        <div className="permission-guide">
          <h3>📋 Hướng dẫn cấp quyền camera:</h3>
          <ul>
            <li>
              <strong>Chrome:</strong> Nhấp vào biểu tượng 🔒 trên thanh địa chỉ
              → Quyền → Camera → Cho phép
            </li>
            <li>
              <strong>Firefox:</strong> Nhấp vào biểu tượng 🔒 → Quyền → Camera
              → Cho phép
            </li>
            <li>
              <strong>Safari:</strong> Safari → Settings → Websites → Camera →
              Cho phép
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
