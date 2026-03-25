import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AddMoviePage.tsx
import { useState } from "react";
import "./scss/add-movie.scss";
import PageHeader from "../../../UI/PageHearder/PageHeader";
export default function AddMoviePage() {
    const [form, setForm] = useState({
        title: "",
        original_title: "",
        slug: "",
        description: "",
        duration_minutes: "",
        age_rating: "P",
        release_date: "",
        end_date: "",
        release_year: "",
        country: "",
        producer: "",
        distributor: "",
        poster_url: "",
        banner_url: "",
        trailer_url: "",
        imdb_rating: "",
        status: "coming_soon",
        is_featured: false,
        is_special: false,
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
    });
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? e.target.checked : value,
        }));
    };
    const generateSlug = () => {
        const slug = form.title
            .toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
            .replace(/[èéẹẻẽêềếệểễ]/g, "e")
            .replace(/[ìíịỉĩ]/g, "i")
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
            .replace(/[ùúụủũưừứựửữ]/g, "u")
            .replace(/[ỳýỵỷỹ]/g, "y")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        setForm((prev) => ({ ...prev, slug }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Movie data:", form);
        alert("Thêm phim thành công!");
    };
    return (_jsxs("div", { className: "add-movie-page", children: [_jsx(PageHeader, { showBack: true, breadcrumbs: [
                    { label: "Trang chủ", path: "/admin/dashboard" },
                    { label: "Quản lý phim", path: "/admin/movies" },
                    { label: "Thêm mới" },
                ] }), _jsxs("form", { className: "movie-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "T\u00EAn phim *" }), _jsx("input", { name: "title", value: form.title, onChange: handleChange, placeholder: "Avatar: The Way of Water", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "T\u00EAn g\u1ED1c" }), _jsx("input", { name: "original_title", value: form.original_title, onChange: handleChange, placeholder: "Original title" })] })] }), _jsxs("div", { className: "form-group slug-group", children: [_jsx("label", { children: "Slug *" }), _jsxs("div", { className: "slug-wrapper", children: [_jsx("input", { name: "slug", value: form.slug, onChange: handleChange, placeholder: "avatar-the-way-of-water", required: true }), _jsx("button", { type: "button", onClick: generateSlug, children: "\uD83D\uDD04 Auto" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "M\u00F4 t\u1EA3" }), _jsx("textarea", { name: "description", value: form.description, onChange: handleChange, rows: 3, placeholder: "M\u00F4 t\u1EA3 ng\u1EAFn g\u1ECDn v\u1EC1 phim..." })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Th\u1EDDi l\u01B0\u1EE3ng (ph\u00FAt) *" }), _jsx("input", { type: "number", name: "duration_minutes", value: form.duration_minutes, onChange: handleChange, placeholder: "120", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ph\u00E2n lo\u1EA1i *" }), _jsxs("select", { name: "age_rating", value: form.age_rating, onChange: handleChange, children: [_jsx("option", { value: "P", children: "P \u2013 Ph\u1ED5 bi\u1EBFn" }), _jsx("option", { value: "K", children: "K \u2013 Tr\u1EBB em" }), _jsx("option", { value: "T13", children: "T13 \u2013 13+" }), _jsx("option", { value: "T16", children: "T16 \u2013 16+" }), _jsx("option", { value: "T18", children: "T18 \u2013 18+" }), _jsx("option", { value: "C", children: "C \u2013 C\u1EA5m chi\u1EBFu" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "IMDb" }), _jsx("input", { type: "number", step: "0.1", name: "imdb_rating", value: form.imdb_rating, onChange: handleChange, placeholder: "8.5" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Tr\u1EA1ng th\u00E1i *" }), _jsxs("select", { name: "status", value: form.status, onChange: handleChange, children: [_jsx("option", { value: "coming_soon", children: "S\u1EAFp chi\u1EBFu" }), _jsx("option", { value: "now_showing", children: "\u0110ang chi\u1EBFu" }), _jsx("option", { value: "ended", children: "\u0110\u00E3 k\u1EBFt th\u00FAc" })] })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ng\u00E0y kh\u1EDFi chi\u1EBFu *" }), _jsx("input", { type: "date", name: "release_date", value: form.release_date, onChange: handleChange, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ng\u00E0y k\u1EBFt th\u00FAc" }), _jsx("input", { type: "date", name: "end_date", value: form.end_date, onChange: handleChange })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "N\u0103m ph\u00E1t h\u00E0nh" }), _jsx("input", { type: "number", name: "release_year", value: form.release_year, onChange: handleChange, placeholder: "2024" })] })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Qu\u1ED1c gia" }), _jsx("input", { name: "country", value: form.country, onChange: handleChange, placeholder: "USA, Vi\u1EC7t Nam" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Nh\u00E0 s\u1EA3n xu\u1EA5t" }), _jsx("input", { name: "producer", value: form.producer, onChange: handleChange, placeholder: "Warner Bros" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Nh\u00E0 ph\u00E1t h\u00E0nh" }), _jsx("input", { name: "distributor", value: form.distributor, onChange: handleChange, placeholder: "CGV, Galaxy" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Poster URL" }), _jsx("input", { type: "url", name: "poster_url", value: form.poster_url, onChange: handleChange, placeholder: "https://example.com/poster.jpg" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Banner URL" }), _jsx("input", { type: "url", name: "banner_url", value: form.banner_url, onChange: handleChange, placeholder: "https://example.com/banner.jpg" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Trailer URL" }), _jsx("input", { type: "url", name: "trailer_url", value: form.trailer_url, onChange: handleChange, placeholder: "https://youtube.com/watch?v=..." })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "SEO Title" }), _jsx("input", { name: "seo_title", value: form.seo_title, onChange: handleChange, placeholder: "T\u00EAn phim - Xem phim online" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "SEO Description" }), _jsx("textarea", { name: "seo_description", value: form.seo_description, onChange: handleChange, rows: 2, placeholder: "M\u00F4 t\u1EA3 cho SEO..." })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "SEO Keywords" }), _jsx("input", { name: "seo_keywords", value: form.seo_keywords, onChange: handleChange, placeholder: "phim, h\u00E0nh \u0111\u1ED9ng, 2024" })] }), _jsxs("div", { className: "form-checkboxes", children: [_jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "is_featured", checked: form.is_featured, onChange: handleChange }), _jsx("span", { children: "\uD83C\uDF1F Phim n\u1ED5i b\u1EADt" })] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox", name: "is_special", checked: form.is_special, onChange: handleChange }), _jsx("span", { children: "\uD83D\uDC8E Phim \u0111\u1EB7c bi\u1EC7t" })] })] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "submit", className: "btn-save", children: "\uD83D\uDCBE L\u01B0u phim" }), _jsx("button", { type: "button", className: "btn-cancel", children: "\u274C H\u1EE7y" })] })] })] }));
}
