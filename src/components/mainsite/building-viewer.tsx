import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

type FloorProps = {
  textureUrl: string
  positionY: number
}

function Floor({ textureUrl, positionY }: FloorProps) {
  const texture = useLoader(TextureLoader, textureUrl)
  return (
    <mesh position={[0, positionY, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial map={texture} transparent={false} />
    </mesh>
  )
}

function CameraRig({ currentY }: { currentY: number }) {
  useFrame(({ camera }) => {
    camera.position.y += (currentY - camera.position.y) * 0.05 // イージング
  })
  return null
}

export default function BuildingViewer() {
  const [floorIndex, setFloorIndex] = useState(0)

  // 5秒ごとに階層を1つずつ上昇
  useEffect(() => {
    const interval = setInterval(() => {
      setFloorIndex((prev) => (prev < 6 ? prev + 1 : 0))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // 画像パス：4階以降はfloor_4.pngを再利用
  const floorTextures = [
    '/floors/floor_1.png',
    '/floors/floor_2.png',
    '/floors/floor_3.png',
    '/floors/floor_4.png',
    '/floors/floor_4.png',
    '/floors/floor_4.png',
    '/floors/floor_4.png',
  ]

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight />
      <CameraRig currentY={floorIndex * 5.2} />
      <OrbitControls enableZoom={true} enablePan={false} />
      {floorTextures.map((url, i) => (
        <Floor key={i} textureUrl={url} positionY={i * 5.2} />
      ))}
    </Canvas>
  )
}
