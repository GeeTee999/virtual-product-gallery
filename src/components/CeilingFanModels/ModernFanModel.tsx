
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModernFanModelProps {
  rotate?: boolean;
  fanColor?: string;
  bladeColor?: string;
  ledLightOn?: boolean;
}

export const ModernFanModel = ({ 
  rotate = true, 
  fanColor = "dark",
  bladeColor = "dark", 
  ledLightOn = false 
}: ModernFanModelProps) => {
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
      {/* Modern sleek motor housing */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.2, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Thin rod */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.3, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Ceiling mount - flat disk */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.8} roughness={0.1} />
      </mesh>
      
      {/* Modern integrated LED panel */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
        <meshStandardMaterial 
          color="white" 
          emissive="#ffffff"
          emissiveIntensity={ledLightOn ? 1.5 : 0} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
      
      {/* Fan blades group - 5 blades similar to original */}
      <group ref={fanRef}>
        {/* 5 blades */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh 
              key={i} 
              position={[0, 0, 0]} 
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[1.5, 0.04, 0.25]} />
              <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export default ModernFanModel;
