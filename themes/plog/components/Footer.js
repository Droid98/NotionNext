import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isMobile } from '@/lib/utils'

/**
 * 网站底部
 * @param {*} props
 * @returns
 */
const Footer = props => {
  const router = useRouter()
  return (
    <footer className='relative w-full bg-gray-900 text-gray-400 border-t border-gray-700 mt-20 p-8'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm'>
        <div className='flex items-center space-x-2 text-center md:text-left mb-4 md:mb-0'>
          <span>
            © {siteConfig('SINCE')}{' '}
            <a href={siteConfig('LINK')} className='text-white hover:text-gray-300 transition-colors'>
              {siteConfig('AUTHOR')}
            </a>
          </span>
          <span className='hidden md:inline-block'>•</span>
          <a
            href='https://beian.miit.gov.cn/'
            target='_blank'
            rel='noreferrer'
            className='hover:text-white transition-colors'>
            {siteConfig('BEI_AN')}
          </a>
        </div>

        <div className='text-center md:text-right'>
          <a href={siteConfig('LINK')}>{siteConfig('TITLE')}</a>
          <p className='text-xs mt-1'>
            Powered by Notion + Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer