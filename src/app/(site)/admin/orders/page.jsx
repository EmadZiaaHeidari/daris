// src/app/admin/orders/page.js
"use client";
import { useEffect, useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders);
  }, []);

  const columns = [
    { key: "id", header: "ID" },
    { key: "customer", header: "Customer" },
    { key: "total", header: "Total" },
    { key: "status", header: "Status" },
  ];

  return (
    <div>
      <h2 className="mb-4 text-lg text-gray-900 font-semibold">Orders</h2>
      <AdminDataTable columns={columns} data={orders} />
    </div>
  );
}
