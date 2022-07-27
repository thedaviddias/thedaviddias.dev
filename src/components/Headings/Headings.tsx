import clsx from 'clsx'
import * as React from 'react'

type TitleProps = {
  variant?: 'primary' | 'secondary'
  as?: React.ElementType
  className?: string
  id?: string
} & (
  | { children: React.ReactNode }
  | {
      dangerouslySetInnerHTML: {
        __html: string
      }
    }
)

const fontSize = {
  h1: 'leading-tight text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'leading-tight text-3xl md:text-4xl font-medium tracking-tight',
  h3: 'text-2xl md:text-2xl font-normal tracking-tight',
  h4: 'text-xl md:text-2xl',
  h5: 'text-lg font-extralight md:text-xl',
  h6: 'text-lg',
}

const titleColors = {
  primary: 'text-black dark:text-white',
  secondary: 'text-gray-400 dark:text-blueGray-500',
}

function Title({
  variant = 'primary',
  size,
  as,
  className,
  ...rest
}: TitleProps & { size: keyof typeof fontSize }) {
  const Tag = as ?? size
  return <Tag className={clsx(fontSize[size], titleColors[variant], className)} {...rest} />
}

function H1(props: TitleProps) {
  return <Title {...props} size="h1" />
}

function H2(props: TitleProps) {
  return <Title {...props} size="h2" />
}

function H3(props: TitleProps) {
  return <Title {...props} size="h3" />
}

function H4(props: TitleProps) {
  return <Title {...props} size="h4" />
}

function H5(props: TitleProps) {
  return <Title {...props} size="h5" />
}

function H6(props: TitleProps) {
  return <Title {...props} size="h6" />
}

export { H1, H2, H3, H4, H5, H6 }