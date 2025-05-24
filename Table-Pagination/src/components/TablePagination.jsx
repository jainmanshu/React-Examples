import React, { useState, useMemo } from "react";

const sampleData = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 23 },
  { id: 3, name: "Charlie", age: 35 },
  { id: 4, name: "David", age: 30 },
  { id: 5, name: "Eva", age: 27 },
  { id: 6, name: "Frank", age: 40 },
  { id: 7, name: "Grace", age: 32 },
  { id: 8, name: "Henry", age: 25 },
];

const ITEMS_PER_PAGE = 4;

function TableWithPagination() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredData = useMemo(() => {
    let data = [...sampleData];

    if (searchQuery) {
      data = data.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        return sortConfig.direction === "asc"
          ? aVal > bVal
            ? 1
            : -1
          : aVal < bVal
          ? 1
          : -1;
      });
    }

    return data;
  }, [searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        style={{ marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />

      <table width="100%" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            {["id", "name", "age"].map((col) => (
              <th
                key={col}
                onClick={() => handleSort(col)}
                style={{ cursor: "pointer", background: "#f0f0f0" }}
              >
                {col}{" "}
                {sortConfig.key === col
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" align="center">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
        }}
      >
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TableWithPagination;