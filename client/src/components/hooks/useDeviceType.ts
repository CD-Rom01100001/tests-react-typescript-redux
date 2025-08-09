import { useState } from "react"

export const useDeviceType = () => {
  const [isMobile] = useState<'PC' | 'mobile'>(() => {

    if (typeof navigator === "undefined") return 'PC'// SSR защита
    // Определяем устройство один раз
    const userAgent = navigator.userAgent.toLowerCase()

    const mobileCheck = /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i.test(userAgent)

    return mobileCheck ? 'mobile' : 'PC'
  })

  return isMobile
}
