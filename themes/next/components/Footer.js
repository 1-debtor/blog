import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import DarkModeButton from '@/components/DarkModeButton'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig('SINCE')
  const startDate = new Date('2024-01-14')
  const [timeRunning, setTimeRunning] = useState((Date.now() - startDate) / 1000) // Initial time in seconds

  const updateTimer = () => {
    setTimeRunning((Date.now() - startDate) / 1000)
  }

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000) // Update every second
    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [])

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${hours}小时 ${minutes}分钟 ${seconds}秒`
  }

  const copyrightDate = parseInt(since) < currentYear ? `${since}-${currentYear}` : `${currentYear}`

  return (
        <footer
            className='relative z-10 dark:bg-gray-800 flex-shrink-0 justify-center text-center m-auto w-full leading-6 text-sm p-6 bg-white dark:text-gray-400'
        >
            <span>
                <DarkModeButton />
                <i className='fas fa-clock' /> 运行时间: {formatTime(timeRunning)}<br />

                <i className='fas fa-copyright' /> {`${copyrightDate}`} <span className='mx-1 animate-pulse'><i className='fas fa-heart' /></span> <a href={siteConfig('LINK')} className='underline font-bold'>{siteConfig('AUTHOR')}</a>.<br />

                {siteConfig('BEI_AN') && <><i className='fas fa-shield-alt' /> <a href='https://beian.miit.gov.cn/' className='mr-2'>{siteConfig('BEI_AN')}</a><br /></>}

                <span className='hidden busuanzi_container_site_pv'>
                    <i className='fas fa-eye' /><span className='px-1 busuanzi_value_site_pv'> </span> </span>
                <span className='pl-2 hidden busuanzi_container_site_uv'>
                    <i className='fas fa-users' /> <span className='px-1 busuanzi_value_site_uv'> </span> </span>
                <br />
                <h1>{title}</h1>
            </span>
        </footer>
  )
}

export default Footer
