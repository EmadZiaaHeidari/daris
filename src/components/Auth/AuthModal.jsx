'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthModal() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState('register');
  const buttonRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(authType === 'login' ? 'ورود با:' : 'ثبت‌نام با:', data);
    setTimeout(() => {
      setShowModal(false);
      reset();
    }, 1000);
  };

  const getButtonPosition = () => {
    if (!buttonRef.current) return { top: '50%', left: '50%' };
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      top: rect.top + rect.height / 2,
      left: rect.left + rect.width / 2,
    };
  };

  const buttonPosition = getButtonPosition();

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={() => setShowModal(true)}
        className="bg-white/20 backdrop-blur-md cursor-pointer text-white px-2 sm:px-5  py-2.5 rounded-xl hover:bg-white hover:text-orange-600 transition-colors duration-300 font-semibold border-2 border-white/40 hover:border-white shadow-lg hover:shadow-2xl"
        whileHover={{
          y: -5,
          x: [0, -4, 4, -4, 4, -2, 2, 0],
          transition: {
            y: { duration: 0.2 },
            x: {
              duration: 0.5,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 1]
            }
          }
        }}
        whileTap={{ scale: 0.95 }}
      >
        ورود / ثبت‌نام
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{
                opacity: 0,
                scale: 0.5,
                x: buttonPosition.left - window.innerWidth / 2,
                y: buttonPosition.top - window.innerHeight / 2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                x: buttonPosition.left - window.innerWidth / 2,
                y: buttonPosition.top - window.innerHeight / 2,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative z-50">

                <button
                  onClick={() => setShowModal(false)}
                  className="absolute cursor-pointer top-4 left-6 text-gray-600 hover:text-red-600 transition text-3xl font-light"
                >
                  &times;
                </button>

                <div className="flex items-center justify-center mb-6">
                  <span
                    className={`text-lg ml-1 cursor-pointer transition-colors ${authType === 'register'
                      ? 'text-orange-600 font-bold'
                      : 'text-gray-700 hover:text-gray-900'
                      }`}
                    onClick={() => setAuthType('register')}
                  >
                    ثبت نام
                  </span>

                  <div
                    className={`relative w-12 h-6 mx-2 rounded-full transition-colors duration-300 cursor-pointer ${authType === 'login' ? 'bg-orange-500' : 'bg-gray-400'
                      }`}
                    onClick={() => setAuthType(authType === 'login' ? 'register' : 'login')}
                  >
                    <motion.div
                      className="absolute w-5 h-5 bg-white rounded-full shadow-md top-0.5 left-0.5"
                      layout
                      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                      animate={{ x: authType === 'login' ? 24 : 0 }}
                    />
                  </div>

                  <span
                    className={`text-lg mr-1 cursor-pointer transition-colors ${authType === 'login'
                      ? 'text-orange-600 font-bold'
                      : 'text-gray-700 hover:text-gray-900'
                      }`}
                    onClick={() => setAuthType('login')}
                  >
                    ورود
                  </span>
                </div>

                <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
                  {authType === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری'}
                </h2>

                {/* فرم */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {authType === 'register' && (
                    <>
                      <input
                        {...register('fullName', { required: 'نام کامل الزامی است' })}
                        placeholder="نام کامل"
                        className="w-full border-2 text-gray-800 border-gray-300 px-4 py-3 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                                 placeholder:text-gray-500 transition-colors"
                      />
                      {errors.fullName && (
                        <p className="text-red-600 text-sm mt-1 font-medium">{errors.fullName.message}</p>
                      )}

                      <input
                        {...register('phoneNumber', {
                          required: 'شماره تلفن الزامی است',
                          pattern: {
                            value: /^09[0-9]{9}$/,
                            message: 'شماره تلفن معتبر نیست',
                          },
                        })}
                        placeholder="شماره تلفن"
                        className="w-full border-2 text-gray-800 border-gray-300 px-4 py-3 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                                 placeholder:text-gray-500 transition-colors"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1 font-medium">{errors.phoneNumber.message}</p>
                      )}
                    </>
                  )}

                  {authType === 'login' && (
                    <>
                      <input
                        {...register('phoneNumber', {
                          required: 'شماره تلفن الزامی است',
                          pattern: {
                            value: /^09[0-9]{9}$/,
                            message: 'شماره تلفن معتبر نیست',
                          },
                        })}
                        placeholder="شماره تلفن"
                        className="w-full border-2 text-gray-800 border-gray-300 px-4 py-3 rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                                 placeholder:text-gray-500 transition-colors"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1 font-medium">{errors.phoneNumber.message}</p>
                      )}
                    </>
                  )}

                  <input
                    {...register('password', { required: 'رمز عبور الزامی است' })}
                    type="password"
                    placeholder="رمز عبور"
                    className="w-full border-2 text-gray-800 border-gray-300 px-4 py-3 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                             placeholder:text-gray-500 transition-colors"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 
                             transition font-medium shadow-sm hover:shadow-md"
                  >
                    {authType === 'login' ? 'ورود' : 'ثبت نام'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}