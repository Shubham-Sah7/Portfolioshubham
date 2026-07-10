import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    // Read the image file from local public directory using fetch with import.meta.url
    const imageBuffer = await fetch(
      new URL('../../../public/images/shubham-sah.jpg', import.meta.url)
    ).then((res) => res.arrayBuffer())
    const base64Image = `data:image/jpeg;base64,${Buffer.from(imageBuffer).toString('base64')}`

    // Fetch the Garamond font
    const garamondData = await fetch(
      new URL('../../../public/fonts/garamond/Garamond_Condensed_Light_Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
            padding: '80px 100px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Left Text Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '560px',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: '44px',
                fontFamily: 'Garamond, Georgia, serif',
                color: '#1f2937',
                lineHeight: '1.2',
                marginBottom: '24px',
                display: 'flex',
              }}
            >
              Started on my mom's phone - just curiosity, sketches, and exploring apps.
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '18px',
                color: '#6b7280',
                lineHeight: '1.6',
                fontWeight: '300',
                marginBottom: '40px',
                display: 'flex',
              }}
            >
              That curiosity turned into product design, and today I build products used by real users, work with startups including fast-growing and venture-backed companies, and explore how AI can transform product experiences.
            </div>

            {/* Footer */}
            <div
              style={{
                fontSize: '12px',
                color: '#9ca3af',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: '600',
                display: 'flex',
              }}
            >
              Shubham Sah - Senior Product Designer
            </div>
          </div>

          {/* Right Image Column */}
          <div
            style={{
              display: 'flex',
              width: '380px',
              height: '380px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={base64Image}
              alt="Shubham Sah"
              width={380}
              height={380}
              style={{
                width: '380px',
                height: '380px',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Garamond',
            data: garamondData,
            style: 'normal',
            weight: 400,
          },
        ],
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    // Fallback: return a simple text-based image response if assets failed to load
    return new ImageResponse(
      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#0A0A0A',
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '16px' }}>Shubham Sah</div>
          <div style={{ fontSize: '28px', color: '#a1a1aa' }}>Senior Product Designer</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
