import React, { useState } from "react";
import "./dynamic-table.scss";

type RowData = {
  [key: string]: any; // hỗ trợ nhiều trường tùy ý
};

type ColumnConfig = {
  key: string; // key trong dữ liệu
  label: string; // tên hiển thị
  sortable?: boolean; // có sắp xếp hay không
  width?: string; // optional width
};

type DynamicTableProps = {
  columns: ColumnConfig[];
  data: RowData[];
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="dynamic-table">
      <div className="table-head">
        {columns.map((col) => (
          <span
            key={col.key}
            style={{ width: col.width }}
            onClick={() => col.sortable && requestSort(col.key)}
            className={col.sortable ? "sortable" : ""}
          >
            {col.label}
            {sortConfig?.key === col.key
              ? sortConfig.direction === "asc"
                ? " ▲"
                : " ▼"
              : null}
          </span>
        ))}
        <span>Hành động</span>
      </div>

      {sortedData.map((row, index) => (
        <div className="table-row" key={index}>
          {columns.map((col) => (
            <span key={col.key} style={{ width: col.width }}>
              {row[col.key]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
