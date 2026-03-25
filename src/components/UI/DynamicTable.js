import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import "./dynamic-table.scss";
const DynamicTable = ({ columns, data }) => {
    const [sortConfig, setSortConfig] = useState(null);
    const sortedData = React.useMemo(() => {
        if (!sortConfig)
            return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal)
                return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal)
                return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };
    return (_jsxs("div", { className: "dynamic-table", children: [_jsxs("div", { className: "table-head", children: [columns.map((col) => (_jsxs("span", { style: { width: col.width }, onClick: () => col.sortable && requestSort(col.key), className: col.sortable ? "sortable" : "", children: [col.label, sortConfig?.key === col.key
                                ? sortConfig.direction === "asc"
                                    ? " ▲"
                                    : " ▼"
                                : null] }, col.key))), _jsx("span", { children: "H\u00E0nh \u0111\u1ED9ng" })] }), sortedData.map((row, index) => (_jsx("div", { className: "table-row", children: columns.map((col) => (_jsx("span", { style: { width: col.width }, children: row[col.key] }, col.key))) }, index)))] }));
};
export default DynamicTable;
