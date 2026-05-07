import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between z-50 bg-transparent relative">
      <div className="flex items-center gap-2 z-50">
        <Link to="/" className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">Requiem</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center bg-white/60 backdrop-blur-md rounded-full px-6 py-2.5 shadow-sm border border-white/50">
        <ul className="flex items-center gap-8">
          <li><Link to="/" className="text-sm font-medium text-slate-800 hover:text-black transition-colors">Home</Link></li>
          <li><Link to="/about" className="text-sm font-medium text-slate-800 hover:text-black transition-colors">About</Link></li>
          <li><Link to="/" className="text-sm font-medium text-slate-800 hover:text-black transition-colors">Explore</Link></li>
          <li><Link to="/about" className="text-sm font-medium text-slate-800 hover:text-black transition-colors">Contact Us</Link></li>
          <li><Link to="/" className="text-sm font-medium text-slate-800 hover:text-black transition-colors">Discover</Link></li>
        </ul>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button className="text-sm font-medium text-slate-700 hover:text-black transition-colors px-4 py-2">
          Log in
        </button>
        <button className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md shadow-slate-300 transition-all hover:shadow-lg hover:-translate-y-0.5">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden z-50 p-2 text-slate-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between items-center">
          <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-full bg-current transition duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </div>
      </button>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center gap-8 text-xl font-medium text-slate-800 mb-12">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Discover</Link>
        </nav>
        <div className="flex flex-col w-full max-w-xs gap-4 px-6">
          <button className="w-full py-3 text-slate-700 font-medium border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
            Log in
          </button>
          <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-3 rounded-full font-medium shadow-md">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
