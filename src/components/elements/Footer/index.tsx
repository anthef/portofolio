import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { CONTACTS, CV_URL } from '@constants'
import { Arrow, Button } from '../Button'
import { Section, SectionHeader } from '../Section'

export const Footer: React.FC = () => {
  const email = CONTACTS.find((contact) => contact.name === 'Email')

  return (
    <footer id="contact" className="relative">
      <Section innerClassName="frame-pad py-24 md:py-32">
        <div aria-hidden className="graph-paper fade-y pointer-events-none absolute inset-0" />
        <SectionHeader
          className="relative"
          align="center"
          cell={10}
          code={`anthony.contact(topic="your next project")`}
          title={
            <>
              Let&apos;s build
              <br />
              something together.
            </>
          }
          description="Open to conversations about data science, machine learning, and full-stack product work."
        >
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            {email && (
              <Button href={email.url}>
                Email me <Arrow />
              </Button>
            )}
            <Button href={CV_URL} target="_blank" rel="noreferrer" variant="secondary">
              <FiDownload size={15} />
              Download resume
            </Button>
          </div>
        </SectionHeader>
      </Section>

      <div className="frame border-t border-line">
        <ul className="cell-grid grid-cols-2 border-y-0 sm:grid-cols-3 lg:grid-cols-6">
          {CONTACTS.map((contact, index) => {
            const Icon = contact.icon
            return (
              <li key={contact.name}>
                <a
                  href={contact.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col gap-4 px-5 py-5 transition-colors hover:bg-well md:px-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-faint">[{index}]</span>
                    <Icon size={16} className="text-muted transition-colors group-hover:text-accent" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-[14px] text-ink">
                      {contact.name}
                      <span className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    </span>
                    <span className="truncate font-mono text-[11.5px] text-faint">{contact.handle}</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="frame border-t border-line">
        <div className="frame-pad flex flex-col gap-2 py-6 font-mono text-[11.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Anthony Edbert Feriyanto</span>
          <span>
            <span className="text-accent">[*]</span> end of notebook — thanks for scrolling
          </span>
        </div>
      </div>
    </footer>
  )
}
