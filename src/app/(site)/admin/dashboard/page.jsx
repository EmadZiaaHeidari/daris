// src/app/admin/dashboard/page.js
import AdminChart from "@/components/admin/AdminChart";

const fakeData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 600 },
  { name: "Mar", value: 800 },
  { name: "Apr", value: 500 },
  { name: "May", value: 750 },
];

export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-4 text-gray-900 text-lg font-semibold">Monthly Overview</h2>
      <AdminChart data={fakeData} />
    </div>
  );
}
