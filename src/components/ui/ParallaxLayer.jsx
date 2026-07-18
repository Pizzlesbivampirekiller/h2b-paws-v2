import useMousePosition from '../../hooks/useMousePosition'
import useMediaQuery from '../../hooks/useMediaQuery'

export default function ParallaxLayer({ children, speed = 0.05, className = '' }) {
  const { x, y } = useMousePosition()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) return <div className={className}>{children}</div>

  const offsetX = ((x - window.innerWidth / 2) * speed)
  const offsetY = ((y - window.innerHeight / 2) * speed)

  return (
    <div
      className={className}
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  )
}
