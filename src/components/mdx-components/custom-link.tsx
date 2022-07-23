import Link from 'next/link'

export const CustomLink = ({ href, children }) => {
  const external = !href.startsWith('/')
  if (external) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }
  return (
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  )
}
