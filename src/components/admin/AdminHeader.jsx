'use client'
import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full pr-10 pl-4 py-2 text-gray-900 border rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 mr-2 sm:mr-0 text-gray-900 s hover:bg-gray-200 rounded-lg"
            >
              <Bell size={20} />
              <span className="absolute  top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute border-orange-600  left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border">
                <div className="p-4 flex items-center justify-center border-orange-600 border-b">
                  <h3 className="font-semibold text-gray-700">اعلان‌ها</h3>
                </div>
                <div className="max-h-96 flex items-center justify-center overflow-y-auto">
                  <div className="p-4  hover:bg-gray-200 cursor-pointer border-b">
                    <p className="text-sm text-gray-700 font-medium">سفارش جدید</p>
                    <p className="text-xs text-gray-800 mt-1">5 دقیقه پیش</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 hover:bg-gray-200 rounded-lg p-2"
            >
              <div className="text-left">
                <p className="text-sm text-gray-700 font-medium">مدیر سیستم</p>
                <p className="text-xs text-gray-800">admin@example.com</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <User size={20} className="text-orange-600" />
              </div>
              <ChevronDown size={16} className="text-gray-800" />
            </button>

            {showProfile && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                <Link href="/admin/profile" className="block text-gray-900 px-4 py-2 hover:bg-gray-200">پروفایل</Link>
                <Link href="/admin/settings" className="block text-gray-900 px-4 py-2 hover:bg-gray-200">تنظیمات</Link>
                <hr className="my-1" />
                <Link href="/" className="block px-4 py-2 hover:bg-gray-200 text-red-600">
                  خروج
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
