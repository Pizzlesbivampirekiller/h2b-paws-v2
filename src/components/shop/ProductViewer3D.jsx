import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei'

function ProductShape({ color = '#C47354', hovered }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.2}>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={hovered ? 0.4 : 0.2}
          speed={2}
          roughness={0.15}
          metalness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0]} scale={0.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>
    </Float>
  )
}

export default function ProductViewer3D({ productColor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-sand/30 to-cream cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#D4A853" />
        <ProductShape color={productColor || '#C47354'} hovered={hovered} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} />
        <Environment preset="studio" />
      </Canvas>
      <div className="relative -mt-12 text-center">
        <span className="text-xs text-charcoal/30 tracking-widest uppercase">Drag to rotate</span>
      </div>
    </div>
  )
}
