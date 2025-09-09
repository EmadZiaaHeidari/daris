'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

const images = [
  '/assets/img/baner.png',
  '/assets/img/baner7.jpeg',
  '/assets/img/baner6.jpeg',
]

function Baner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel)
    },
  })


  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next()
    }, 4000)
    return () => clearInterval(interval)
  }, [slider])

  return (
    <div className=' mt-8'>
      <div
        ref={sliderRef}
        className='keen-slider h-[400px] relative overflow-hidden rounded-lg'
      >
        {images.map((img, index) => (
          <div key={index} className='keen-slider__slide relative w-full h-full'>
            <Image
              fill
              alt={`banner-${index}`}
              src={img}
              className='object-cover brightness-50'
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white '>
              <h1 className='text-4xl font-bold whitespace-nowrap text-center'>
                با ما به همه جای دنیا سفر کنید
              </h1>
              <div className='flex gap-4 mt-8'>
                <Link href='/#'>
                  <button className='p-2 border-2 border-white rounded-lg text-xl hover:bg-white hover:text-black cursor-pointer'>
                    مشاوره رایگان
                  </button>
                </Link>
                <Link href='/#'>
                  <button className='py-2 px-3 border-2 border-white rounded-lg text-xl hover:bg-white hover:text-black cursor-pointer'>
                    بیشتر بدانید
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Baner
