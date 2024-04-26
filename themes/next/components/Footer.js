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
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
  }

  const copyrightDate = parseInt(since) < currentYear ? `${since}-${currentYear}` : `${currentYear}`

  return (
        <footer className='flex flex-col items-center justify-center w-full p-4 bg-white text-sm leading-6 dark:bg-gray-800 dark:text-gray-400'>
            <DarkModeButton />
            <span className='flex items-center justify-center'>
                <i className='fas fa-clock'></i> 运行时间: {formatTime(timeRunning)}
            </span>
            <span className='flex items-center justify-center animate-pulse'>
                <i className='fas fa-heart'></i>
            </span>
            <a href={siteConfig('LINK')} className='underline font-bold'>{siteConfig('AUTHOR')}</a>
            <br />
            {siteConfig('BEI_AN') && (
                <a href='https://beian.miit.gov.cn/' className='flex items-center justify-center'>
                    <i className='fas fa-shield-alt'></i> {siteConfig('BEI_AN')}
                </a>
            )}
            <h1 className='text-center'>{title}</h1>
        </footer>
  )
}

export default Footer
