import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef } from 'react'

function Globe() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#C47354"
            distort={0.2}
            speed={2}
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={0.15}
            wireframe
          />
        </Sphere>
      </mesh>
      <mesh>
        <Sphere args={[1.95, 64, 64]}>
          <meshStandardMaterial
            color="#E8D5C4"
            roughness={0.5}
            metalness={0.1}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </mesh>
      {/* Location pins */}
      {[
        { lat: 40.7, lng: -74, color: '#D4A853', label: 'New York' },
        { lat: 48.9, lng: 2.3, color: '#C47354', label: 'Paris' },
        { lat: 35.7, lng: 139.7, color: '#8FA88F', label: 'Tokyo' },
      ].map((pin, i) => {
        const phi = (90 - pin.lat) * (Math.PI / 180)
        const theta = (pin.lng + 180) * (Math.PI / 180)
        const r = 2.05
        const x = -r * Math.sin(phi) * Math.cos(theta)
        const y = r * Math.cos(phi)
        const z = r * Math.sin(phi) * Math.sin(theta)

        return (
          <Float key={i} speed={3} rotationIntensity={0} floatIntensity={0.05}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color={pin.color} emissive={pin.color} emissiveIntensity={1} />
            </mesh>
          </Float>
        )
      })}
    </Float>
  )
}

export default function GlobeMap() {
  return (
    <div className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/90">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Globe />
      </Canvas>
      <div className="relative -mt-10 text-center">
        <span className="text-xs text-cream/30 tracking-widest uppercase">Global Presence</span>
      </div>
    </div>
  )
}
