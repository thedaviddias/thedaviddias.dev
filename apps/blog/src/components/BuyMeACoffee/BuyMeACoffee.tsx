import Image from 'next/image'
import React from 'react'

import { CustomLink } from '../CustomLink'

export const BuyMeACoffee = () => {
  return (
    <div className="mb-10 mt-10 border-b border-t border-gray-200 pb-8 pt-8 text-center dark:border-gray-600">
      <div className="text-2xl">Has this been helpful to you?</div>
      <div className="text-lg">
        You can support my work by sharing this article with others,
        <br />
        <CustomLink href="/supporters" className="plausible-event-name=supporters underline">
          sponsoring me on Github
        </CustomLink>{' '}
        or perhaps buy me a cup of coffee 😊
        <div>
          <a
            href="https://ko-fi.com/thedaviddias"
            rel="noopener noreferrer"
            target="_blank"
            className="external-link plausible-event-name=kofi"
            aria-label="Buy me a coffee on Ko-fi"
          >
            <Image
              className="inline-block h-auto w-auto max-w-xl pt-2"
              src="/images/kofi.png"
              width={40}
              height={40}
              alt="Buy me a coffee on Ko-fi"
              aria-hidden="true"
              priority={true}
            />
          </a>
        </div>
      </div>
    </div>
  )
}
