
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface IndustrialFanModelProps {
  rotate?: boolean;
  fanColor?: string;
  bladeColor?: string;
  ledLightOn?: boolean;
}

export const IndustrialFanModel = ({ 
  rotate = true, 
  fanColor = "dark",
  bladeColor = "dark", 
  ledLightOn = false 
}: IndustrialFanModelProps) => {
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
      {/* Industrial-style housing with cooling fins */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.35, 24]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.85} roughness={0.3} />
      </mesh>
      
      {/* Cooling fins around motor */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.4;
        const z = Math.sin(angle) * 0.4;
        
        return (
          <mesh key={i} position={[x, 0.2, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.1, 0.3, 0.02]} />
            <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.85} roughness={0.3} />
          </mesh>
        );
      })}
      
      {/* Heavy-duty hanging rod */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.1, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.85} roughness={0.3} />
      </mesh>
      
      {/* Industrial ceiling mount */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.85} roughness={0.3} />
      </mesh>
      
      {/* Industrial light fixture */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
        <meshStandardMaterial 
          color={ledLightOn ? "white" : "#555555"}
          emissive={ledLightOn ? "#ffffff" : "#000000"}
          emissiveIntensity={ledLightOn ? 2 : 0} 
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Light cage */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 0.3;
        const z = Math.sin(angle) * 0.3;
        
        return (
          <mesh key={i} position={[x, -0.05, z]}>
            <boxGeometry args={[0.02, 0.1, 0.02]} />
            <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.85} roughness={0.3} />
          </mesh>
        );
      })}
      
      {/* Fan blades group - 3 wide industrial blades */}
      <group ref={fanRef}>
        {/* Fan blade 1 */}
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1, 0.08, 0.4]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.6} />
        </mesh>
        
        {/* Fan blade 2 */}
        <mesh position={[-0.4, 0, 0.7]} rotation={[0, Math.PI * 2/3, 0]}>
          <boxGeometry args={[1, 0.08, 0.4]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.6} />
        </mesh>
        
        {/* Fan blade 3 */}
        <mesh position={[-0.4, 0, -0.7]} rotation={[0, -Math.PI * 2/3, 0]}>
          <boxGeometry args={[1, 0.08, 0.4]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

export default IndustrialFanModel;
