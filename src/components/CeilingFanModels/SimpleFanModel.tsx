
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SimpleFanModelProps {
  rotate?: boolean;
  fanColor?: string;
  bladeColor?: string;
  ledLightOn?: boolean;
}

export const SimpleFanModel = ({ 
  rotate = true, 
  fanColor = "dark",
  bladeColor = "dark", 
  ledLightOn = false 
}: SimpleFanModelProps) => {
  const fanRef = useRef<THREE.Group>(null);
  const rotationSpeed = 0.01;

  const getColorValue = (colorName: string) => {
    switch(colorName) {
      case "black": return "#000000";
      case "dark": return "#3a2618";
      case "silver": return "#a0a0a0";
      case "white": return "#ffffff";
      default: return "#3a2618";
    }
  };
  
  useFrame((state, delta) => {
    if (rotate && fanRef.current) {
      fanRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={[0, 0, 0]} scale={1.5}>
      {/* Motor housing */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.25, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Rod */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Ceiling mount */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Light */}
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 24]} />
        <meshStandardMaterial 
          color="white" 
          emissive="#ffffff"
          emissiveIntensity={ledLightOn ? 2 : 0} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Fan blades - 3 blades similar to original */}
      <group ref={fanRef}>
        {/* Fan blade 1 */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
        
        {/* Fan blade 2 */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI * 2/3, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
        
        {/* Fan blade 3 */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI * 4/3, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
};

export default SimpleFanModel;
