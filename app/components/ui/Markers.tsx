export const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className="absolute select-none pointer-events-none"
    style={{
      [h]: 0,
      [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)

export const PlusAt = ({ x, v = 'bottom', desktop = false }: { x: string; v?: 'top' | 'bottom'; desktop?: boolean }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    className={`absolute select-none pointer-events-none${desktop ? ' hidden md:block' : ''}`}
    style={{
      left: x,
      [v]: 0,
      transform: `translate(-50%, ${v === 'top' ? '-50%' : '50%'})`,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >
    <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
  </svg>
)
