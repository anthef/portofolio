import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { CONTACTS, CV_URL } from '@constants'
import { Arrow, Button } from '../Button'
import { Blob, Section, SectionHeader } from '../Section'

export const Footer: React.FC = () => {
  const email = CONTACTS.find((contact) => contact.name === 'Email')

  return (
    <footer id="contact" className="relative overflow-hidden">
      <Section
        innerClassName="pb-14 pt-24 md:pt-32"
        backdrop={
          <>
            <Blob className="-bottom-24 left-[12%] h-72 w-72" />
            <Blob className="-bottom-32 right-[14%] h-80 w-80" color="var(--series-2)" />
            <Blob className="bottom-10 left-1/2 h-56 w-56 -translate-x-1/2" color="var(--series-3)" />
          </>
        }
      >
        <SectionHeader
          cell={9}
          code={`anthony.contact(topic="your next project")`}
          title={
            <>
              Let&apos;s build
              <br />
              something together.
            </>
          }
          description="Open to conversations about AI/LLM engineering, data science, and full-stack product work."
        >
          <div className="mt-3 flex flex-wrap items-center gap-3">
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

          <ul className="mt-10 flex flex-wrap gap-2">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon
              return (
                <li key={contact.name}>
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-shadow group flex h-11 items-center gap-2.5 rounded-full bg-surface pl-2 pr-4 transition-transform duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-well text-muted transition-colors group-hover:bg-accent-soft group-hover:text-accent">
                      <Icon size={14} />
                    </span>
                    <span className="text-[14px] text-ink">{contact.name}</span>
                    <span className="hidden font-mono text-[11.5px] text-faint md:inline">{contact.handle}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </SectionHeader>

        <div className="mt-20 flex flex-col gap-2 font-mono text-[11.5px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Anthony Edbert Feriyanto</span>
          <span>
            <span className="text-accent">[*]</span> end of notebook — thanks for scrolling
          </span>
        </div>
      </Section>
    </footer>
  )
}
