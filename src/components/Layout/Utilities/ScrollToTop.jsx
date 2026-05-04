import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 text-neutral-400 hover:text-primary-400 hover:border-primary-500/30 shadow-lg shadow-black/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-4 h-4" />
    </button>
  )
}

export default ScrollToTop
