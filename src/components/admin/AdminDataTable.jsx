"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function AdminDataTable({
  columns = [],
  data = [],
  pageSize = 10,
  initialSort,
  onRowClick,
}) {
  const firstKey = columns[0]?.key ?? null;
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState(initialSort || (firstKey ? { key: firstKey, dir: "asc" } : null));

  const toStr = (v) => {
    if (v == null) return "";
    if (typeof v === "object") {
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    }
    return String(v);
  };

  const filtered = useMemo(() => {
    if (!q) return data;
    const needle = q.toLowerCase();
    return data.filter((row) =>
      columns.some((c) => toStr(row?.[c.key]).toLowerCase().includes(needle))
    );
  }, [q, data, columns]);

  const defaultCompare = (a, b) => {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    const da = Date.parse(a);
    const db = Date.parse(b);
    if (!Number.isNaN(da) && !Number.isNaN(db)) return da - db;
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return String(a).localeCompare(String(b));
  };

  const sorted = useMemo(() => {
    if (!sort?.key) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    const cmp = col?.sortFn || defaultCompare;
    const out = [...filtered].sort((ra, rb) => cmp(ra?.[sort.key], rb?.[sort.key], ra, rb));
    return sort.dir === "asc" ? out : out.reverse();
  }, [filtered, sort, columns]);

  useEffect(() => {
    const total = Math.max(1, Math.ceil(sorted.length / pageSize));
    setPage((p) => Math.min(p, total - 1));
  }, [sorted, pageSize]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice(page * pageSize, page * pageSize + pageSize);

  function toggleSort(key) {
    setPage(0);
    setSort((s) =>
      s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  }

  const rowKey = (row, idx) => row?.id ?? row?.key ?? idx;

  return (
    <div className="rounded-2xl border border-slate-600 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(0);
          }}
          placeholder="Search..."
          className="w-64 rounded-xl border text-black border-slate-600 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Search table"
          type="search"
          inputMode="search"
        />
        <div className="text-xs text-slate-800">{sorted.length} results</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-600 text-slate-800">
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className="px-3 py-2 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    className="inline-flex items-center gap-1 text-slate-800"
                    aria-label={`Sort by ${col.header}`}
                  >
                    {col.header}
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
              ))}
              <th className="px-3 py-2" />
            </tr>
          </thead>

          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={rowKey(row, idx)}
                onClick={() => onRowClick?.(row)}
                className="group border-b last:border-none hover:bg-orange-100"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 text-slate-900">
                    {col.render ? col.render(row) : toStr(row?.[col.key])}
                  </td>
                ))}
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="invisible rounded-lg border border-slate-600 px-2 py-1 text-xs text-slate-800 hover:bg-slate-100 group-hover:visible"
                    aria-label="Row actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}

            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-3 py-8 text-center text-slate-800"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-800">
          Page {page + 1} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-xl border border-slate-600 bg-white px-2 py-1 text-sm text-slate-800 disabled:opacity-60"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-xl border border-slate-600 bg-white px-2 py-1 text-sm text-slate-800 disabled:opacity-60"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
