import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BookingStatus } from "../../../ENUM/BookingStatus.enum";
import "./scss/BookingAutoCheckin.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";
const initialBookings = [
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
    const [bookings, setBookings] = useState(initialBookings);
    const [scannedBooking, setScannedBooking] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [cameraPermission, setCameraPermission] = useState("prompt");
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef(null);
    const codeReaderRef = useRef(null);
    const streamRef = useRef(null);
    // Hàm phát âm thanh feedback
    const playSound = (type) => {
        try {
            // Kiểm tra hỗ trợ Web Audio API
            const AudioContext = window.AudioContext || window.webkitAudioContext;
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
            }
            else {
                // Âm thanh lỗi
                oscillator.frequency.setValueAtTime(300, context.currentTime);
                gainNode.gain.setValueAtTime(0.3, context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
                oscillator.start(context.currentTime);
                oscillator.stop(context.currentTime + 0.5);
            }
        }
        catch (error) {
            console.warn('Không thể phát âm thanh:', error);
            // Fallback: thử dùng Audio element
            try {
                const audio = new Audio();
                if (type === 'success') {
                    // Có thể thêm file âm thanh thực tế ở đây
                    console.log('✅ Check-in thành công!');
                }
                else {
                    console.log('❌ Lỗi check-in!');
                }
            }
            catch (fallbackError) {
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
        }
        catch (error) {
            console.error("Camera permission error:", error);
            setCameraPermission("denied");
            if (error.name === "NotAllowedError") {
                setErrorMsg("❌ Vui lòng cho phép truy cập camera trong cài đặt trình duyệt!");
            }
            else if (error.name === "NotFoundError") {
                setErrorMsg("❌ Không tìm thấy camera trên thiết bị!");
            }
            else {
                setErrorMsg("❌ Lỗi khi truy cập camera: " + error.message);
            }
            return false;
        }
    };
    // Bắt đầu quét
    const startScanning = async () => {
        if (!videoRef.current)
            return;
        const hasPermission = await requestCameraPermission();
        if (!hasPermission)
            return;
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
            await codeReader.decodeFromVideoElement(videoRef.current, (result, err) => {
                if (result) {
                    try {
                        const data = result.getText();
                        console.log("QR scanned:", data);
                        if (!data || data.trim() === '') {
                            setErrorMsg("❌ Mã QR trống hoặc không hợp lệ!");
                            playSound("error");
                            return;
                        }
                        const found = bookings.find((b) => b.booking_code.toLowerCase() === data.toLowerCase());
                        if (found) {
                            // Kiểm tra trạng thái hiện tại
                            if (found.status === BookingStatus.USED) {
                                setErrorMsg("⚠️ Booking đã check-in trước đó!");
                                setScannedBooking(found);
                                playSound("error");
                                return;
                            }
                            // Chỉ cho phép check-in booking đã thanh toán
                            if (found.status !== BookingStatus.PAID) {
                                setErrorMsg("⚠️ Chỉ có thể check-in booking đã thanh toán!");
                                setScannedBooking(found);
                                playSound("error");
                                return;
                            }
                            // Cập nhật booking thành USED
                            setBookings((prev) => prev.map((b) => b.id === found.id
                                ? {
                                    ...b,
                                    status: BookingStatus.USED,
                                    checked_in_at: new Date().toISOString(),
                                    checked_in_by: undefined, // Có thể thêm ID của nhân viên check-in sau
                                }
                                : b));
                            setScannedBooking(found);
                            setErrorMsg("");
                            // Phát âm thanh thành công
                            playSound("success");
                            // Tự động dừng quét sau 3 giây
                            setTimeout(() => {
                                stopScanning();
                            }, 3000);
                        }
                        else {
                            setScannedBooking(null);
                            setErrorMsg("❌ Mã booking không tồn tại!");
                            playSound("error");
                        }
                    }
                    catch (processingError) {
                        console.error("Error processing QR result:", processingError);
                        setErrorMsg("❌ Lỗi xử lý mã QR!");
                        playSound("error");
                    }
                }
                else if (err && err.name !== "NotFoundException") {
                    console.error("QR scan error:", err);
                    // Không hiển thị lỗi cho người dùng vì đây là lỗi thường xuyên khi không tìm thấy QR
                }
            });
        }
        catch (error) {
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
    // Cleanup khi component unmount hoặc khi dependencies thay đổi
    useEffect(() => {
        const cleanup = () => {
            if (codeReaderRef.current) {
                try {
                    // BrowserMultiFormatReader không có method reset, chỉ cần set null
                    codeReaderRef.current = null;
                }
                catch (error) {
                    console.warn("Error cleaning up code reader:", error);
                }
            }
            stopScanning();
        };
        return cleanup;
    }, []);
    return (_jsxs("div", { className: "checkin-page", children: [_jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý đặt vé", path: "/admin/bookings" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Checkin Auto" },
                ], action: _jsx("button", { className: "btn-add", onClick: () => {
                        setBookings(initialBookings);
                        setScannedBooking(null);
                        setErrorMsg("");
                    }, children: "\uD83D\uDD04 Reset Test Data" }) }), _jsxs("div", { className: "checkin-header", children: [_jsx("h1", { children: "\uD83D\uDCF1 Check-in t\u1EF1 \u0111\u1ED9ng b\u1EB1ng QR" }), _jsx("p", { children: "Qu\u00E9t m\u00E3 QR tr\u00EAn v\u00E9 \u0111\u1EC3 check-in nhanh ch\u00F3ng" })] }), _jsxs("div", { className: "qr-reader-section", children: [_jsxs("div", { className: "qr-reader-container", children: [_jsx("video", { ref: videoRef, autoPlay: true, muted: true, playsInline: true, className: "qr-video" }), !isScanning && (_jsxs("div", { className: "qr-overlay", children: [_jsx("div", { className: "qr-frame" }), _jsx("p", { children: "Camera ch\u01B0a \u0111\u01B0\u1EE3c b\u1EADt" })] }))] }), _jsx("div", { className: "scanner-controls", children: !isScanning ? (_jsx("button", { className: "btn-start", onClick: startScanning, children: "\uD83C\uDFA5 B\u1EADt Camera & Qu\u00E9t QR" })) : (_jsx("button", { className: "btn-stop", onClick: stopScanning, children: "\u23F9\uFE0F D\u1EEBng Qu\u00E9t" })) })] }), errorMsg && (_jsxs("div", { className: "error-message", children: [_jsx("p", { children: errorMsg }), cameraPermission === "denied" && (_jsx("button", { className: "btn-retry", onClick: requestCameraPermission, children: "\uD83D\uDD04 Th\u1EED l\u1EA1i" }))] })), scannedBooking && (_jsxs("div", { className: "booking-info", children: [_jsxs("div", { className: "booking-header", children: [_jsx("h2", { children: "\u2705 Th\u00F4ng tin Booking" }), _jsx("span", { className: `status-badge ${scannedBooking.status}`, children: scannedBooking.status })] }), _jsxs("div", { className: "booking-details", children: [_jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "label", children: "M\u00E3 Booking:" }), _jsx("span", { className: "value", children: scannedBooking.booking_code })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "label", children: "Kh\u00E1ch h\u00E0ng:" }), _jsx("span", { className: "value", children: scannedBooking.customer_name })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "label", children: "Email:" }), _jsx("span", { className: "value", children: scannedBooking.customer_email })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "label", children: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i:" }), _jsx("span", { className: "value", children: scannedBooking.customer_phone })] }), _jsxs("div", { className: "detail-row highlight", children: [_jsx("span", { className: "label", children: "T\u1ED5ng ti\u1EC1n:" }), _jsxs("span", { className: "value", children: [scannedBooking.total_amount.toLocaleString("vi-VN"), " \u20AB"] })] }), scannedBooking.checked_in_at && (_jsxs("div", { className: "detail-row success", children: [_jsx("span", { className: "label", children: "Check-in l\u00FAc:" }), _jsx("span", { className: "value", children: new Date(scannedBooking.checked_in_at).toLocaleString("vi-VN") })] }))] })] })), cameraPermission === "denied" && (_jsxs("div", { className: "permission-guide", children: [_jsx("h3", { children: "\uD83D\uDCCB H\u01B0\u1EDBng d\u1EABn c\u1EA5p quy\u1EC1n camera:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Chrome:" }), " Nh\u1EA5p v\u00E0o bi\u1EC3u t\u01B0\u1EE3ng \uD83D\uDD12 tr\u00EAn thanh \u0111\u1ECBa ch\u1EC9 \u2192 Quy\u1EC1n \u2192 Camera \u2192 Cho ph\u00E9p"] }), _jsxs("li", { children: [_jsx("strong", { children: "Firefox:" }), " Nh\u1EA5p v\u00E0o bi\u1EC3u t\u01B0\u1EE3ng \uD83D\uDD12 \u2192 Quy\u1EC1n \u2192 Camera \u2192 Cho ph\u00E9p"] }), _jsxs("li", { children: [_jsx("strong", { children: "Safari:" }), " Safari \u2192 Settings \u2192 Websites \u2192 Camera \u2192 Cho ph\u00E9p"] })] })] }))] }));
}
