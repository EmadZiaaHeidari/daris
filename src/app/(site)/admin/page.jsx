// src/app/admin/page.js
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import { Users, Package, ShoppingBag } from "lucide-react";

export default function AdminHome() {
  return (
    <div className="grid gap-4 text-gray-600 sm:grid-cols-3">
      <AdminStatsCard icon={Users} label="Users" value="1,240" delta="+12%" deltaType="increase" />
      <AdminStatsCard icon={Package} label="Products" value="340" delta="-3%" deltaType="decrease" />
      <AdminStatsCard icon={ShoppingBag} label="Orders" value="560" delta="0%" deltaType="flat" />
    </div>
  );
}
