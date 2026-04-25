'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '../Search/SearchBar'
import AuthModal from '../Auth/AuthModal'
import MegaMenu from './MegaMenu'
import { RiAdminLine } from 'react-icons/ri'
import { FaSuitcaseRolling } from 'react-icons/fa'
import { Plane, BookOpen } from "lucide-react"

function Navbar() {
  const navItems = ['صفحه اصلی', 'تور', 'سفر', 'بلاگ', 'درباره ما', 'تماس با ما']
  const [activeTab, setActiveTab] = useState('صفحه اصلی')
  const [hoveredTab, setHoveredTab] = useState(null)
  const [shopHover, setShopHover] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getHref = (label) => ({
    'صفحه اصلی': '/',
    'تور': '/alltours',
    'بلاگ': '/blog',
    'درباره ما': '/about-us',
    'تماس با ما': '/contact-us',
  }[label])

  if (!mounted) {
    return (
      <div className="md:flex relative items-center mt-12 md:h-[100px] h-[120px] rounded-lg bg-orange-600">
        <div className='flex justify-center items-center'>
          <h1 className='font-bold md:mr-8 text-white text-4xl'>داریس</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="md:flex relative items-center mt-12 md:h-[100px] h-[120px] rounded-lg bg-orange-600">
      <div className='flex justify-center items-center'>
        <h1 className='font-bold md:mr-8 text-white text-4xl'>داریس</h1>
      </div>

      <div className='hidden lg:flex justify-center items-center space-x-1 space-x-reverse'>
        {navItems.map((item, index) => {
          const isShop = item === 'سفر'

          if (isShop) {
            return (
              <div
                key={item}
                className="relative px-3"
                onMouseEnter={() => {
                  setHoveredTab(item)
                  setShopHover(true)
                }}
                onMouseLeave={() => {
                  setHoveredTab(null)
                  setShopHover(false)
                }}
              >
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setActiveTab(item)}
                >
                  <p
                    className={`text-white text-md mt-2 flex items-center gap-1 ${activeTab === item ? 'text-white' : 'text-white/80'
                      }`}
                  >
                    {item}
                    <motion.span
                      animate={{ rotate: shopHover ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </p>

                  <AnimatePresence mode="wait">
                    {(hoveredTab === item || activeTab === item) && (
                      <motion.div
                        key="underline-shop"
                        className="absolute -top-1 w-6 h-[1px] bg-white rounded-full"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '30px' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {shopHover && (
                    <motion.div
                      className="absolute top-12 right-0 w-52 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-orange-200/50 z-50 flex flex-col overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link href="/alltours" className="group relative">
                        <p className="relative flex items-center gap-2 py-3 pl-4 pr-5 text-slate-800 cursor-pointer transition-all duration-300 ease-out hover:bg-orange-50/70">
                          <span className="pointer-events-none absolute right-0 top-0 h-full w-0 bg-orange-500/90 transition-all duration-300 group-hover:w-1" />
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md ring-1 ring-orange-200 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white">
                            <Plane className="w-4 h-4" />
                          </span>
                          <span className="transition-colors duration-300 group-hover:text-slate-900 group-hover:font-semibold">
                            تورها
                          </span>
                        </p>
                      </Link>

                      <Link href="/blog" className="group relative">
                        <p className="relative flex items-center gap-2 py-3 pl-4 pr-5 text-slate-800 cursor-pointer transition-all duration-300 ease-out hover:bg-orange-50/70">
                          <span className="pointer-events-none absolute right-0 top-0 h-full w-0 bg-orange-500/90 transition-all duration-300 group-hover:w-1" />
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md ring-1 ring-orange-200 text-orange-600 transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white">
                            <BookOpen className="w-4 h-4" />
                          </span>
                          <span className="transition-colors duration-300 group-hover:text-slate-900 group-hover:font-semibold">
                            بلاگ‌ها
                          </span>
                        </p>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          }

          return (
            <div
              key={item}
              className="relative flex flex-col items-center cursor-pointer px-3"
              onClick={() => setActiveTab(item)}
              onMouseEnter={() => setHoveredTab(item)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <Link href={getHref(item) || '#'}>
                <p
                  className={`text-white text-md mt-2 ${activeTab === item ? 'text-white' : 'text-white/80'
                    }`}
                >
                  {item}
                </p>
              </Link>

              <AnimatePresence mode="wait">
                {(hoveredTab === item || activeTab === item) && (
                  <motion.div
                    key={`underline-${item}`}
                    className="absolute -top-1 w-6 h-[1px] bg-white rounded-full"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '30px' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      <div className='hidden md:flex lg:hidden'>
        <MegaMenu />
      </div>

      <div className='md:flex hidden absolute lg:left-1/6 md:left-2/9 items-center space-x-2 space-x'>
        <Link href="/alltours" className='cursor-pointer bg-gray-200/30 backdrop-blur-sm rounded-md p-2 hover:bg-white hover:text-orange-500'>
          <FaSuitcaseRolling className='w-6 h-6' />
        </Link>

        <Link
          href="/admin"
          className="group relative inline-flex items-center rounded-md bg-gray-200/30 backdrop-blur-sm px-2 py-2 text-white hover:bg-white hover:text-orange-500 transition text-sm"
        >
          <RiAdminLine className="h-6 w-6" />
          <span className="sr-only">پنل ادمین</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            پنل ادمین
          </span>
        </Link>

        <div>
          <SearchBar />
        </div>
      </div>

      <div className='absolute hidden md:flex md:left-7'>
        <AuthModal />
      </div>

      <div className="md:hidden mt-4 w-full  flex  pb-7 justify-center items-center sm:gap-18 gap-3 px-4">
        <div className="shrink-0">
          <MegaMenu />
        </div>

        <Link href="/alltours" className='cursor-pointer bg-gray-200/30 backdrop-blur-sm rounded-md p-2 hover:bg-white hover:text-orange-500'>
          <FaSuitcaseRolling className='w-6 h-6' />
        </Link>

        <Link
          href="/admin"
          className="group relative inline-flex items-center rounded-md bg-gray-200/30 backdrop-blur-sm px-2 py-2 text-white hover:bg-white hover:text-orange-500 transition text-sm"
        >
          <RiAdminLine className="h-6 w-6" />
          <span className="sr-only">پنل ادمین</span>
          <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            پنل ادمین
          </span>
        </Link>

        <div className="shrink-0">
          <SearchBar />
        </div>
        <div className="shrink-0">
          <AuthModal />
        </div>
      </div>
    </div>
  )
}

export default Navbar