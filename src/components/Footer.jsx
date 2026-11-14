import { Link } from 'react-router-dom'
import { useLanguage } from '../context/useLanguage.js'

function Footer() {
  const { messages } = useLanguage()
  function scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ block: 'start' })
  }

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-white/10 bg-[#153e56] text-white">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-12 lg:px-8">
        <div>
          <p className="font-semibold">Bible Heritage <span className="font-normal text-sky-100/75">· {messages.footerBrandDescriptor}</span></p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-sky-100/75">{messages.footerSummary}</p>
          <a className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-white/25 px-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://github.com/PhonePyaeKyaw-359/adventist-beliefs-timeline" target="_blank" rel="noreferrer">
            {messages.repository} <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>

        <address className="not-italic">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">{messages.contact}</h2>
          <p className="mt-3 text-sm font-semibold">{messages.knowledgeHolder}</p>
          <p className="mt-1 text-sm text-sky-100/80"><span lang="en">Pastor Adolpho Alex Bittencourt</span></p>
          <p className="text-sm text-sky-100/70">{messages.pastorRole}</p>
          <p className="mt-3 text-xs leading-5 text-sky-100/65">{messages.contactByArrangement}</p>
        </address>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">{messages.campusChurch}</h2>
          <p className="mt-3 text-sm leading-6 text-sky-100/80">{messages.universityName}<br />{messages.campusAddress}</p>
          <a className="mt-2 inline-flex min-h-10 items-center rounded-lg text-sm font-medium text-white underline decoration-sky-300 underline-offset-4 hover:text-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="tel:+6636720777">
            {messages.phone}
          </a>
          <a className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ccebf6] px-4 py-2.5 text-center text-sm font-bold text-[#12394d] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://www.google.com/maps/search/?api=1&query=Asia-Pacific%20International%20University%20Church%2C%20Muak%20Lek%2C%20Saraburi" target="_blank" rel="noreferrer">
            <span aria-hidden="true">⌖</span> {messages.openMap} <span aria-hidden="true">↗</span>
          </a>
          <a className="mt-2 inline-flex min-h-10 items-center text-xs text-sky-100/70 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200" href="https://www.apiu.edu/aiu-church/" target="_blank" rel="noreferrer">
            {messages.officialChurch} ↗
          </a>
        </div>

        <nav aria-label={messages.footerNavLabel} className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-sm text-sky-50 lg:col-span-3">
          <Link className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" to="/">{messages.exploreBeliefs}</Link>
          <Link className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" to="/about">{messages.aboutProject}</Link>
          <button className="rounded py-1 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200" type="button" onClick={scrollToContact}>{messages.contactNav}</button>
          <span className="w-full text-xs text-sky-100/55 sm:ml-auto sm:w-auto">{messages.universityCourse}</span>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
