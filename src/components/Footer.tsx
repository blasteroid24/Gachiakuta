import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t-8 border-double border-outline-variant bg-surface-container-lowest px-gutter py-margin">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      <div
        aria-hidden
        className="footer-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-headline-xl uppercase text-primary-container/10 !text-[22vw] pointer-events-none select-none"
      >
        GACHIAKUTA
      </div>
      <div className="container-max relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <span className="font-headline-md font-black uppercase text-on-surface">Join the Rebellion</span>
          <p className="font-body-md text-sm text-on-surface-variant">Clean the world. Value what others throw away.</p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
          <div className="flex gap-6 font-label-bold text-xs uppercase">
            <Link to="/#divide" className="hover:text-primary transition-colors">World</Link>
            <Link to="/#watchman" className="hover:text-primary transition-colors">Watchman</Link>
            <Link to="/characters" className="hover:text-primary transition-colors">Characters</Link>
          </div>
          <p className="font-label-bold text-xs uppercase text-primary text-center md:text-right">
            © {new Date().getFullYear()} Fan site · Gachiakuta © Kei Urana / Kodansha
          </p>
        </div>
      </div>
    </footer>
  )
}
