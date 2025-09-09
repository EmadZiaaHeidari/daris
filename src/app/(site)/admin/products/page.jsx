// src/app/admin/products/page.js
"use client";
import { useEffect, useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Product" },
    { key: "price", header: "Price" },
  ];

  return (
    <div>
      <h2 className="mb-4 text-lg text-gray-900 font-semibold">Products</h2>
      <AdminDataTable columns={columns} data={products} />
    </div>
  );
}
