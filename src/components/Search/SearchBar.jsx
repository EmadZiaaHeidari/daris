'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim() !== '') {
      // وقتی سرچ انجام شد برو به صفحهٔ نتایج
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto flex flex-col items-center">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="cursor-pointer bg-gray-200/30 backdrop-blur-sm rounded-md p-2 z-10 hover:bg-white hover:text-orange-500"
        aria-label="باز کردن جستجو"
      >
        <Search size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-2 z-10 absolute top-[62px]"
          >
            <div className="flex items-center border border-orange-300 rounded-lg shadow bg-white px-2 py-1 w-[300px] h-16">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="جستجو..."
                className="flex-grow outline-none text-gray-800 placeholder-gray-500 bg-transparent"
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="bg-orange-600 rounded-full cursor-pointer text-white p-2.5 ml-1"
                aria-label="اجرای جستجو"
              >
                <Search size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
