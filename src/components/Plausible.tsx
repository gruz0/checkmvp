import Script from 'next/script'
import { env } from '@/lib/env'

const Plausible = () => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  return (
    <Script
      defer
      data-domain={env.DOMAIN}
      src="https://plausible.io/js/script.js"
    />
  )
}

export default Plausible
