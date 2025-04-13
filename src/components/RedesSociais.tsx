'use client'

export default function RedesSociais() {
  return (
    <div className="flex space-x-4 text-2xl text-[#5d5ba4]">
      <a
        href="https://www.instagram.com/livrosganhamvida"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 transform hover:scale-125 hover:text-white"
      >
        <i className="ri-instagram-line" />
      </a>
      <a
        href="https://www.tiktok.com/@livrosganhamvida"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 transform hover:scale-125 hover:text-white"
      >
        <i className="ri-tiktok-line" />
      </a>
      <a
        href="https://www.youtube.com/@livrosganhamvida"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 transform hover:scale-125 hover:text-white"
      >
        <i className="ri-youtube-line" />
      </a>
    </div>
  )
}
