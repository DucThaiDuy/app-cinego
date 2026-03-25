import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CINEMA_STATUS } from "../../../ENUM/CinemaStatus.enum";
import TimeField from "../../../UI/TimeField";
import InputField from "../../../UI/InputField";
import "./scss/add-cinema.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";
// type CinemaStatus = "active" | "inactive" | "maintenance";
// type AddCinemaForm = {
//   name: string;
//   address: string;
//   ward: string;
//   district: string;
//   city: string;
//   phone: string;
//   email: string;
//   opening_time: string;
//   closing_time: string;
//   description: string;
//   status: CinemaStatus;
// };
export default function AddCinema() {
    const [form, setForm] = useState({
        name: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        phone: "",
        email: "",
        opening_time: "",
        closing_time: "",
        description: "",
        status: CINEMA_STATUS.ACTIVE,
    });
    const [touched, setTouched] = useState({
        closing_time: false,
        opening_time: false,
        name: false,
    });
    const [error, setError] = useState("");
    /* ===== HANDLE CHANGE ===== */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    /* ===== SUBMIT ===== */
    const handleSubmit = (e) => {
        setError("");
        const payload = {
            ...form,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        console.log("ADD CINEMA PAYLOAD 👉", payload);
        alert("Thêm rạp thành công (mock)");
    };
    return (_jsxs("div", { className: "add-cinema-page", children: [_jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý rạp phim", path: "/admin/cinemas" },
                    // { label: "Lịch chiếu", path: "/admin/showtimes" },
                    { label: "Thêm mới" },
                ] }), _jsxs("form", { className: "cinema-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-grid", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "T\u00EAn r\u1EA1p *" }), _jsx(InputField, { value: form.name ?? "", placeholder: "Nh\u1EADp t\u00EAn phim", required: true, error: touched.name && !form.name
                                            ? "Tên phim không được để trống"
                                            : undefined, onChange: (e) => setForm({ ...form, name: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Th\u00E0nh ph\u1ED1 *" }), _jsx("input", { name: "city", value: form.city, onChange: handleChange, placeholder: "H\u1ED3 Ch\u00ED Minh" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "\u0110\u1ECBa ch\u1EC9 *" }), _jsx("input", { name: "address", value: form.address, onChange: handleChange, placeholder: "S\u1ED1 nh\u00E0, \u0111\u01B0\u1EDDng..." })] }), _jsxs("div", { className: "form-grid", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ph\u01B0\u1EDDng" }), _jsx("input", { name: "ward", value: form.ward, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Qu\u1EADn / Huy\u1EC7n" }), _jsx("input", { name: "district", value: form.district, onChange: handleChange })] })] }), _jsxs("div", { className: "form-grid", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i" }), _jsx("input", { name: "phone", value: form.phone, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Email" }), _jsx("input", { name: "email", type: "email", value: form.email, onChange: handleChange })] })] }), _jsxs("div", { className: "form-grid", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Gi\u1EDD m\u1EDF c\u1EEDa" }), _jsx(TimeField, { value: form.opening_time ?? "", required: true, error: touched.opening_time && !form.opening_time
                                            ? "Vui lòng chọn giờ đóng cửa"
                                            : undefined, onChange: (e) => setForm({ ...form, opening_time: e.target.value }) })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Gi\u1EDD \u0111\u00F3ng c\u1EEDa" }), _jsx(TimeField, { value: form.closing_time ?? "", required: true, error: touched.closing_time && !form.closing_time
                                            ? "Vui lòng chọn giờ đóng cửa"
                                            : undefined, onChange: (e) => setForm({ ...form, closing_time: e.target.value }) })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "M\u00F4 t\u1EA3" }), _jsx("textarea", { name: "description", value: form.description, onChange: handleChange, rows: 4 })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Tr\u1EA1ng th\u00E1i" }), _jsxs("select", { name: "status", value: form.status, onChange: handleChange, children: [_jsx("option", { value: "active", children: "Ho\u1EA1t \u0111\u1ED9ng" }), _jsx("option", { value: "inactive", children: "Ng\u01B0ng ho\u1EA1t \u0111\u1ED9ng" }), _jsx("option", { value: "maintenance", children: "B\u1EA3o tr\u00EC" })] })] }), error && _jsx("p", { className: "error", children: error }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn-primary", children: "L\u01B0u r\u1EA1p" }), _jsx("button", { type: "button", className: "btn-outline", children: "H\u1EE7y" })] })] })] }));
}
