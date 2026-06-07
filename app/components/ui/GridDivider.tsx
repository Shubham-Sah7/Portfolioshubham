/**
 * GridDivider — 1px horizontal rule with + marks centred exactly on the
 * vertical guide lines (calc(50% ± 512px)).
 * + marks are only rendered at xl (1280px+) where the vertical lines are visible.
 */
const GridDivider = () => (
  <div className="relative w-full overflow-visible" style={{ height: '1px', backgroundColor: '#e5e7eb' }}>
    {/* Left + mark */}
    <span
      className="absolute select-none pointer-events-none hidden xl:block"
      style={{
        left: 'calc(50% - 512px)',
        top: 0,
        transform: 'translate(-50%, -50%)',
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: 1,
        color: '#9ca3af',
      }}
    >
      +
    </span>
    {/* Right + mark */}
    <span
      className="absolute select-none pointer-events-none hidden xl:block"
      style={{
        right: 'calc(50% - 512px)',
        top: 0,
        transform: 'translate(50%, -50%)',
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: 1,
        color: '#9ca3af',
      }}
    >
      +
    </span>
  </div>
);

export default GridDivider;
