import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
export default function ClientLayout() {
    return (_jsxs(_Fragment, { children: [_jsx("header", { children: "Client Header" }), _jsx(Outlet, {}), _jsx("footer", { children: "Client Footer" })] }));
}
