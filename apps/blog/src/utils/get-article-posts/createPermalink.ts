export const createPermalink = (filename: string, dataType: string, locale = 'en') => {
  const filenameNoExtension = filename.replace('.mdx', '')
  const permalink = `${locale !== 'en' ? `/${locale}` : ''}/${dataType}/${filenameNoExtension}`

  return permalink
}
