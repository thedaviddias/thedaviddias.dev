import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'

import { CustomLink } from '@/components/CustomLink'

import { RoutesResponse } from '@/config/routes'

type AuthorProps = {
  name: string
  routes: RoutesResponse
}

export const Author: React.FC<AuthorProps> = ({ name, routes }) => {
  const { t } = useTranslation('about')

  return (
    <div className="flex items-center justify-center font-sans">
      <div className="group block flex-shrink-0">
        <CustomLink href={routes(t).about.path}>
          <div className="flex items-center">
            <div>
              <Image
                className="inline-block h-auto max-w-xl rounded-full"
                src="/images/david-dias-round.png"
                width={40}
                height={40}
                alt="Profile avatar of David Dias"
                aria-hidden="true"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="ml-3 text-left">
              <p className="text-base font-medium text-gray-700 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-400">
                {name}
              </p>
            </div>
          </div>
        </CustomLink>
      </div>
    </div>
  )
}
