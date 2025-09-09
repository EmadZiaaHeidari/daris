'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { href: '/admin/dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/users', label: 'کاربران', icon: Users },
  { href: '/admin/products', label: 'محصولات', icon: Package },
  { href: '/admin/orders', label: 'سفارشات', icon: ShoppingCart },
  { href: '/admin/reports', label: 'گزارشات', icon: BarChart3 },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`
        fixed lg:static inset-y-0 right-0 z-40
        w-64 bg-white shadow-lg transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-600">پنل مدیریت</h1>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive 
                    ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-600' 
                    : 'text-gray-900 hover:bg-gray-200'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <Link 
            href="/"
            className="flex items-center gap-3 text-gray-900 hover:bg-gray-200 w-full px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>بازگشت به سایت</span>
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
