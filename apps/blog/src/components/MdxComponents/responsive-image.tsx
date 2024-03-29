import Image, { ImageProps } from 'next/image'

import { extractLinks } from '@/utils/extract-links'

import { CustomLink } from '../CustomLink'

export const ResponsiveImage: React.FC<ImageProps> = ({ src, title, alt = '', height, width }) => {
  const updatedFigcaption = title && extractLinks(title)

  return (
    <div className="my-3 block">
      <CustomLink href={src as string} aria-label="Click to enlarge the image">
        <Image
          alt={alt}
          className="rounded-lg"
          loading="lazy"
          quality={80}
          src={src}
          height={height}
          width={width}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </CustomLink>
      {title && (
        <figcaption className="z-10 !mt-0 text-center text-sm italic text-gray-600 dark:text-gray-300">
          <span dangerouslySetInnerHTML={{ __html: updatedFigcaption ?? title }} />
        </figcaption>
      )}
    </div>
  )
}
