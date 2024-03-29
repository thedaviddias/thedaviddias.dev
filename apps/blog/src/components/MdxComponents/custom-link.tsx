import { LinkProps } from 'next/link'

type CustomLinkProps = LinkProps & {
  href: string
  children: React.ReactNode
}

export const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <span className="not-prose">
        <a href={href} rel="noopener noreferrer" target="_blank" className="external-link">
          {children}
        </a>
      </span>
    )
  }
  return <CustomLink href={href}>{children}</CustomLink>
}
