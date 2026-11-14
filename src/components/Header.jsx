import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LanguageSwitch from './LanguageSwitch.jsx'
import { useLanguage } from '../context/useLanguage.js'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { messages } = useLanguage()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-30 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        {messages.skipToContent}
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-800"
        >
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-2xl bg-[#174e6b] text-sm font-bold text-[#d9f2fb]">B</span>
          <span className="leading-tight">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Bible Heritage</span>
            <span className="text-sm sm:text-base">{messages.brandTagline}</span>
          </span>
        </Link>
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-base">{menuOpen ? '×' : '☰'}</span>
          {menuOpen ? messages.close : messages.menu}
        </button>
        <nav
          id="primary-navigation"
          aria-label={messages.navLabel}
          className={`${menuOpen ? 'flex' : 'hidden'} order-3 w-full flex-col gap-1 border-t border-slate-100 pt-2 text-sm font-medium sm:order-none sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-1 sm:border-0 sm:pt-0`}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4"
          >
            {messages.home}
          </NavLink>
          <NavLink
            to="/glossary"
            onClick={closeMenu}
            className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4"
          >
            {messages.glossary}
          </NavLink>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className="rounded-xl px-3 py-2.5 text-slate-700 transition hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 sm:px-4"
          >
            {messages.about}
          </NavLink>
        </nav>
        <div className={`${menuOpen ? 'flex' : 'hidden'} order-4 w-full justify-end border-t border-slate-100 pt-2 sm:order-none sm:flex sm:w-auto sm:border-0 sm:pt-0`}>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
