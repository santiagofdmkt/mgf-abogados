import { ImageResponse } from 'next/og'
import { IconoMGF } from '@/lib/marca'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <IconoMGF size={180} radio={0} />
      </div>
    ),
    { ...size }
  )
}