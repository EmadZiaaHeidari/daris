'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronUp, Home, Map, Plane, BookOpen, Info, Phone, Sparkles } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { label: 'صفحه اصلی', link: '/', icon: Home },
  { label: 'تور', link: '/alltours', icon: Map },
  {
    label: 'سفر',
    link: '/#',
    icon: Plane,
    subItems: [
      { label: 'تور ها', link: '/alltours', icon: Map },
      { label: 'بلاگ ها', link: '/blog', icon: BookOpen },
    ],
  },
  { label: 'بلاگ', link: '/blog', icon: BookOpen },
  { label: 'درباره ما', link: '/about-us', icon: Info },
  { label: 'تماس با ما', link: '/contact-us', icon: Phone },
]

const containerVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
}

const subMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.3, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
  },
}

const subItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  return (
    <div className="xl:hidden relative z-50">
        <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          text-white flex items-center space-x-2 p-1.5 md:mr-3 cursor-pointer bg-gray-200/30 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 
          transition-all duration-300
          ${isOpen ? 'fixed top-4 left-4 z-60' : 'relative'}
        `}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsOpen(false)
                setShopOpen(false)
              }}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[70%] md:w-[50%] bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 flex flex-col overflow-y-auto text-right rounded-l-3xl"
            >

              <div className="bg-gradient-to-l from-orange-500 to-orange-600 p-6 rounded-tl-3xl">
                <div className="flex items-center justify-between">
                  <Sparkles className="text-white/80" size={24} />
                  <h2 className="text-2xl font-bold text-white">منوی اصلی</h2>
                </div>
              </div>

              <div className="p-6 space-y-2">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon
                  
                  if (item.subItems) {
                    return (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="mb-2"
                      >
                        <div
                          onClick={() => setShopOpen(!shopOpen)}
                          className="flex justify-between items-center cursor-pointer select-none p-4 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={22} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
                            <p className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                              {item.label}
                            </p>
                          </div>
                          {shopOpen ? (
                            <ChevronUp size={20} className="text-orange-600" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                          )}
                        </div>

                        <AnimatePresence>
                          {shopOpen && (
                            <motion.div
                              variants={subMenuVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="mt-2 overflow-hidden space-y-1 mr-4"
                            >
                              {item.subItems.map((sub, subIdx) => {
                                const SubIcon = sub.icon
                                return (
                                  <motion.div
                                    key={subIdx}
                                    variants={subItemVariants}
                                  >
                                    <Link href={sub.link}>
                                      <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50/50 hover:bg-orange-100 cursor-pointer transition-all duration-300 group">
                                        <SubIcon size={18} className="text-orange-400 group-hover:text-orange-600 transition-colors" />
                                        <p className="text-base font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                                          {sub.label}
                                        </p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  }

                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                    >
                      <Link href={item.link}>
                        <div className="flex items-center gap-3 p-4 rounded-xl hover:bg-orange-50 cursor-pointer transition-all duration-300 group">
                          <Icon size={22} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
                          <p className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                            {item.label}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-auto p-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Sparkles size={16} />
                  <p className="text-sm">تجربه سفری متفاوت</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}