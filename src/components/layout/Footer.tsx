import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="w-full bg-[#f8f9fa] pt-10 pb-12 relative flex flex-col items-center border-t border-slate-200/50 mt-10">

      {/* Background with overflow watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black text-slate-200/40 uppercase tracking-tighter select-none">
          REQUIEM
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-20 text-center lg:text-left">

          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tighter mb-2 sm:mb-4 uppercase">Requiem</div>
            <p className="text-slate-500 text-sm font-medium">Begin The Journey</p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">About</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Features</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Pricing</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Contact</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Blog</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Documentation</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">FAQ</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">Support</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">X (Twitter)</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">LinkedIn</Link>
              <Link to="#" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">YouTube</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200/60">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-sm font-semibold text-slate-700">All systems operational</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <span>&copy; {new Date().getFullYear()} Requiem. All rights reserved</span>
            <Link to="#" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-800 transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
