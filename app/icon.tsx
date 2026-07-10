import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 64,
  height: 64,
}
export const contentType = 'image/png'

export default async function Icon() {
  // Load Satish-sans font from public directory
  const satishSans = await fetch(
    new URL('../public/fonts/satish-font/Satish-sans.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 38,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'SatishSans',
          fontWeight: 'bold',
          // Multi-directional text outline so the white text is visible on light browser tabs
          textShadow: '-2px -2px 0 #18181b, 2px -2px 0 #18181b, -2px 2px 0 #18181b, 2px 2px 0 #18181b',
        }}
      >
        SS7
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'SatishSans',
          data: satishSans,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
