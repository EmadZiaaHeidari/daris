'use client'
import React, { useState } from 'react'
import { Phone, Mail, MapPin, Twitter, Instagram, Send, ExternalLink } from 'lucide-react'
import Image from 'next/image'

const ContactUs = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', message: '' })
  const [errors, setErrors] = useState({ firstName: '', lastName: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateField = (name, value) => {
    let error = ''
    if (!value.trim()) {
      switch (name) {
        case 'firstName': error = 'نام الزامی است'; break
        case 'lastName': error = 'نام خانوادگی الزامی است'; break
        case 'message': error = 'متن پیام الزامی است'; break
      }
    }
    return error
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    newErrors.firstName = validateField('firstName', formData.firstName)
    newErrors.lastName = validateField('lastName', formData.lastName)
    newErrors.message = validateField('message', formData.message)
    setErrors(newErrors)
    const hasErrors = Object.values(newErrors).some(error => error !== '')
    if (hasErrors) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', message: '' })
      setErrors({ firstName: '', lastName: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  const TelegramIcon = () => (
    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
            <span className="animate-gradient-text">تماس</span> با ما
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            ما همیشه آماده پاسخگویی به سوالات و پیشنهادات شما هستیم
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow">
              <h2 className="text-xl font-bold text-slate-900 mb-6">اطلاعات تماس</h2>

              <div className="space-y-4">
                {[{
                  icon: <Phone className="w-6 h-6" />, title: 'تلفن پشتیبانی', value: '021-88776655'
                }, {
                  icon: <Mail className="w-6 h-6" />, title: 'پست الکترونیکی', value: 'info@company.com'
                }, {
                  icon: <MapPin className="w-6 h-6" />, title: 'آدرس شرکت', value: 'تهران، خیابان ولیعصر، پلاک 123'
                }].map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-colors"
                  >
                    <div className="rounded-full p-3 bg-orange-600 text-white shadow-sm">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-700 mt-1 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">شبکه‌های اجتماعی</h3>
                    <div className="flex gap-2">
                      {[
                        { El: Twitter, label: 'Twitter' },
                        { El: Instagram, label: 'Instagram' },
                      ].map(({ El, label }) => (
                        <a
                          key={label}
                          href="#"
                          aria-label={label}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-400 transition-colors"
                        >
                          <El className="w-5 h-5 text-orange-600" />
                        </a>
                      ))}
                      <a
                        href="#"
                        aria-label="Telegram"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-orange-200 bg-white hover:bg-orange-50 hover:border-orange-400 transition-colors"
                      >
                        <TelegramIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-slate-900 mb-6">ارسال پیام</h2>

            {submitted && (
              <div className="mb-6 p-4 rounded-lg border border-green-500/40 bg-green-50 text-green-800">
                پیام شما با موفقیت ارسال شد!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-800 mb-1">
                    نام
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${
                      errors.firstName ? 'border-red-500 focus:ring-red-500/70' : 'border-slate-300 focus:ring-orange-600'
                    }`}
                    placeholder="نام خود را وارد کنید"
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-800 mb-1">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow ${
                      errors.lastName ? 'border-red-500 focus:ring-red-500/70' : 'border-slate-300 focus:ring-orange-600'
                    }`}
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-800 mb-1">
                  متن پیام
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-shadow resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-500/70' : 'border-slate-300 focus:ring-orange-600'
                  }`}
                  placeholder="پیام خود را اینجا بنویسید..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 rounded-full border-2 border-white border-b-transparent animate-spin" />
                    <span>در حال ارسال...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="mr-1">ارسال پیام</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <section className="mt-14">
          <h3 className="text-2xl lg:text-3xl font-black text-slate-900">
            <span className="text-orange-600">ما کجای نقشه</span> هستیم
          </h3>

          <div className="relative mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="relative h-[380px] w-full">
              <Image
                src="/assets/img/Contact/map.png"
                alt="نقشه موقعیت شرکت"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/10" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping" />
                  <span className="relative block h-4 w-4 rounded-full bg-orange-600 shadow ring-4 ring-white/80" />
                </div>
              </div>

              <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-[360px] rounded-xl bg-white/95 backdrop-blur border border-orange-200 p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg p-2 bg-orange-600 text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">تهران، خیابان ولیعصر، پلاک 123</p>
                    <p className="text-sm text-slate-600 mt-1">دفتر مرکزی شرکت</p>
                    <div className="mt-3 flex gap-2">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 rounded-md border border-orange-300 text-orange-700 bg-white px-3 py-2 text-sm font-medium hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                      >
                        مشاهده در نقشه
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href="tel:02188776655"
                        className="inline-flex items-center gap-1 rounded-md bg-orange-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                      >
                        تماس سریع
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactUs