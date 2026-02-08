import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { Booking } from "../../../model/Booking";
import { BookingStatus } from "../../../ENUM/BookingStatus.enum";
import "./scss/BookingAutoCheckin.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";

const initialBookings: Booking[] = [
  {
    id: 1,
    booking_code: "BK001",
    user_id: undefined,
    showtime_id: 1,
    voucher_id: undefined,
    customer_name: "Nguyen Van A",
    customer_email: "a@example.com",
    customer_phone: "0123456789",
    ticket_price: 100000,
    combo_price: 50000,
    discount_amount: 20000,
    points_used: 0,
    total_amount: 130000,
    status: BookingStatus.PAID,
    payment_method: "visa",
    checked_in_at: undefined,
    checked_in_by: undefined,
    created_at: "2025-12-28T10:00:00",
    updated_at: "2025-12-28T10:00:00",
  },
  {
    id: 2,
    booking_code: "BK002",
    user_id: undefined,
    showtime_id: 2,
    voucher_id: undefined,
    customer_name: "Tran Thi B",
    customer_email: "b@example.com",
    customer_phone: "0987654321",
    ticket_price: 120000,
    combo_price: 80000,
    discount_amount: 0,
    points_used: 1000,
    total_amount: 200000,
    status: BookingStatus.PENDING,
    payment_method: "momo",
    checked_in_at: undefined,
    checked_in_by: undefined,
    created_at: "2025-12-27T15:30:00",
    updated_at: "2025-12-27T15:30:00",
  },
];

export default function BookingAutoCheckin() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [scannedBooking, setScannedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [cameraPermission, setCameraPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
          "❌ Vui lòng cho phép truy cập camera trong cài đặt trình duyệt!"
        );
      } else if (error.name === "NotFoundError") {
        setErrorMsg("❌ Không tìm thấy camera trên thiết bị!");
      } else {
        setErrorMsg("❌ Lỗi khi truy cập camera: " + error.message);
      }
      return false;
    }
  };

  // Bắt đầu quét
  const startScanning = async () => {
    if (!videoRef.current) return;

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    setIsScanning(true);
    setErrorMsg("");

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

      await codeReader.decodeFromVideoElement(
        videoRef.current,
        (result, err) => {
          if (result) {
            const data = result.getText();
            console.log("QR scanned:", data);

            const found = bookings.find(
              (b) => b.booking_code.toLowerCase() === data.toLowerCase()
            );

            if (found) {
              if (found.status === BookingStatus.USED) {
                setErrorMsg("⚠️ Booking đã check-in trước đó!");
              } else {
                setBookings((prev) =>
                  prev.map((b) =>
                    b.id === found.id
                      ? {
                          ...b,
                          status: BookingStatus.USED,
                          checked_in_at: new Date().toISOString(),
                        }
                      : b
                  )
                );
                setErrorMsg("");
              }
              setScannedBooking(found);
            } else {
              setScannedBooking(null);
              setErrorMsg("❌ Mã booking không tồn tại!");
            }
          } else if (err && err.name !== "NotFoundException") {
            console.error("QR scan error:", err);
          }
        }
      );
    } catch (error: any) {
      console.error("Start scanning error:", error);
      setErrorMsg("❌ Không thể khởi động camera: " + error.message);
      setIsScanning(false);
    }
  };

  // Dừng quét
  const stopScanning = () => {
    // Dừng stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Clear video
    if (videoRef.current) {
      videoRef.current.srcObject = null;
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

  return (
    <div className="checkin-page">
      <PageHeader
        showBack
        breadcrumbs={[
          { label: "Trang chủ", path: "/admin/dashboard" },
          { label: "Quản lý đặt vé", path: "/admin/bookings" },
          // { label: "Lịch chiếu", path: "/admin/showtimes" },
          { label: "Checkin Auto" },
        ]}
        // action={
        //   <button
        //     className="btn-add"
        //     onClick={() => navigate("/admin/bookings/auto-checkin")}
        //   >
        //     <QrCodeIcon /> Checkin Auto
        //   </button>
        // }
      />
      <div className="checkin-header">
        <h1>📱 Check-in tự động bằng QR</h1>
        <p>Quét mã QR trên vé để check-in nhanh chóng</p>
      </div>

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
              🎥 Bật Camera & Quét QR
            </button>
          ) : (
            <button className="btn-stop" onClick={stopScanning}>
              ⏹️ Dừng Quét
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="error-message">
          <p>{errorMsg}</p>
          {cameraPermission === "denied" && (
            <button className="btn-retry" onClick={requestCameraPermission}>
              🔄 Thử lại
            </button>
          )}
        </div>
      )}

      {scannedBooking && (
        <div className="booking-info">
          <div className="booking-header">
            <h2>✅ Thông tin Booking</h2>
            <span className={`status-badge ${scannedBooking.status}`}>
              {scannedBooking.status}
            </span>
          </div>

          <div className="booking-details">
            <div className="detail-row">
              <span className="label">Mã Booking:</span>
              <span className="value">{scannedBooking.booking_code}</span>
            </div>

            <div className="detail-row">
              <span className="label">Khách hàng:</span>
              <span className="value">{scannedBooking.customer_name}</span>
            </div>

            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{scannedBooking.customer_email}</span>
            </div>

            <div className="detail-row">
              <span className="label">Số điện thoại:</span>
              <span className="value">{scannedBooking.customer_phone}</span>
            </div>

            <div className="detail-row highlight">
              <span className="label">Tổng tiền:</span>
              <span className="value">
                {scannedBooking.total_amount.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>
        </div>
      )}

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
