import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface BaseProps {
  variant?: Variant
  size?: Size
  // Keyboard hint rendered as a key cap, e.g. "/".
  kbd?: string
  className?: string
  children: React.ReactNode
}

type AnchorProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }
type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }

export type ButtonProps = AnchorProps | NativeButtonProps

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-inverse text-on-inverse hover:bg-accent hover:text-on-inverse',
  secondary: 'card-shadow bg-surface text-ink hover:text-accent',
  ghost: 'text-ink underline-offset-[5px] hover:underline decoration-line-strong',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 rounded-full px-4 text-[14px]',
  md: 'h-12 rounded-full px-6 text-[15px]',
}

export const buttonClassName = (variant: Variant = 'primary', size: Size = 'md', className = '') =>
  `group inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-colors duration-200 ease-out ${VARIANTS[variant]} ${SIZES[size]} ${variant === 'ghost' ? '!px-1' : ''} ${className}`

const Kbd: React.FC<{ children: string; inverse: boolean }> = ({ children, inverse }) => (
  <kbd
    className={`ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 font-mono text-[11px] leading-none ${
      inverse ? 'opacity-70' : 'border-line-strong text-faint'
    }`}
    style={inverse ? { borderColor: 'color-mix(in srgb, currentColor 35%, transparent)' } : undefined}
  >
    {children}
  </kbd>
)

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', size = 'md', kbd, className = '', children } = props
  const classes = buttonClassName(variant, size, className)
  const content = (
    <>
      {children}
      {kbd && <Kbd inverse={variant === 'primary'}>{kbd}</Kbd>}
    </>
  )

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, kbd: _k, className: _c, children: _ch, ...rest } = props
    return (
      <a {...rest} className={classes}>
        {content}
      </a>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, kbd: _k, className: _c, children: _ch, href: _h, ...rest } = props
  return (
    <button type="button" {...rest} className={classes}>
      {content}
    </button>
  )
}

export const Arrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span aria-hidden className={`inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 ${className}`}>
    →
  </span>
)
