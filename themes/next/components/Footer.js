import { useState, useEffect } from 'react'

const Footer = () => {
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

  return (
    <footer className='flex flex-col items-center justify-center w-full p-4 bg-white text-sm leading-6 dark:bg-gray-800 dark:text-gray-400'>
      <span className='flex items-center justify-center'>
        运行时间: {formatTime(timeRunning)} By DEBTOR SINCE@2024
      </span>
    </footer>
  )
}

export default Footer
