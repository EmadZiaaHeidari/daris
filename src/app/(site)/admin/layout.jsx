// src/app/admin/layout.js
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div className=" container  my-2">
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader title="Admin Panel" />
        <main className="flex-1  bg-slate-50 p-4">{children}</main>
      </div>
    </div>
    </div>
  );
}
