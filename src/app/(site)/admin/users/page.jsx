// src/app/admin/users/page.js
"use client";
import { useEffect, useState } from "react";
import AdminDataTable from "@/components/admin/AdminDataTable";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  return (
    <div>
      <h2 className="mb-4 text-lg text-gray-900 font-semibold">Users</h2>
      <AdminDataTable columns={columns} data={users} />
    </div>
  );
}
