import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
export default function QRCodeCanvas({ value }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!canvasRef.current)
            return;
        // Tạo QR code bằng API online
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(value)}`;
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx)
                ctx.drawImage(img, 0, 0, 128, 128);
        };
    }, [value]);
    return _jsx("canvas", { ref: canvasRef, width: 128, height: 128 });
}
