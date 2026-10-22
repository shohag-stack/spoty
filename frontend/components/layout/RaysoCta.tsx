'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TEMPLATE_URL = "https://www.rayso.studio/templates/spoty-tennis-club-and-sports-academy-template"

const slides = [
  {
    bg: 'https://ik.imagekit.io/tl6thf5xd/coverjpg.jpg',
    type: 'logo',
  },
  {
    bg: 'https://ik.imagekit.io/tl6thf5xd/coverjpg.jpg',
    type: 'text',
    text: 'Premium Next.js Templates',
  },
]

export function RaysoCta() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed right-8 bottom-8 z-40 gap-4 flex flex-col">
      
      {/* Slider */}
      <div className="relative aspect-3/1.5 overflow-hidden rounded-2xl">

        <div
          className="absolute inset-0 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${index * 100}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative w-full h-full flex justify-center items-center"
              style={{ top: `${i * 100}%`, position: 'absolute' }}
            >
              {/* BG */}
              <Image
                src={slide.bg}
                alt=""
                fill
                unoptimized
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-blue-950/60 z-10" />

              {/* Content */}
              <div className="relative z-11 text-white text-center flex justify-center items-center">
                {slide.type === 'logo' ? (
                  <Image
                    src="https://ik.imagekit.io/tl6thf5xd/rayso-logo.png"
                    width={170}
                    height={49}
                    unoptimized
                    alt="rayso-logo"
                    className='w-2/3'
                  />
                ) : (
                  <h3 className="text-[20px] font-bold px-4 leading-none">
                    {slide.text}
                  </h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={TEMPLATE_URL}
        className="group relative flex justify-center items-center text-[14px] px-4 py-2 rounded-full font-bold text-neutral-900 bg-lime-400"
      >
        <div className='h-[1.7em] overflow-hidden'>
            <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
            <span className='flex items-center justify-center'>Get this Template</span>
            <span className='flex items-center justify-center'>Get this Template</span>
        </div>
        </div>
      </Link>
    </div>
  )
}