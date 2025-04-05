
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LuxuryFanModelProps {
  rotate?: boolean;
  fanColor?: string;
  bladeColor?: string;
  ledLightOn?: boolean;
}

export const LuxuryFanModel = ({ 
  rotate = true, 
  fanColor = "dark",
  bladeColor = "dark", 
  ledLightOn = false 
}: LuxuryFanModelProps) => {
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
      {/* Luxury dome-shaped motor housing */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Decorative ring around motor */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.42, 0.03, 16, 32]} />
        <meshStandardMaterial 
          color={fanColor === "silver" || fanColor === "white" ? "#d4af37" : "#a67c00"} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Premium sleek rod */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Luxury ceiling mount with decorative elements */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.2, 0.15, 0.1, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Luxury light fixture - crystal-like */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 0.1, 32]} />
        <meshStandardMaterial 
          color="white" 
          emissive="#ffffff"
          emissiveIntensity={ledLightOn ? 1.8 : 0} 
          transparent 
          opacity={0.9}
          metalness={0.2}
          roughness={0}
        />
      </mesh>
      
      {/* Decorative crystal light elements */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.25;
        const z = Math.sin(angle) * 0.25;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <coneGeometry args={[0.03, 0.08, 16]} />
            <meshStandardMaterial 
              color="white" 
              transparent 
              opacity={0.9}
              metalness={0.1}
              roughness={0}
              emissive="#ffffff"
              emissiveIntensity={ledLightOn ? 1.5 : 0} 
            />
          </mesh>
        );
      })}
      
      {/* Fan blades - 4 luxury blades */}
      <group ref={fanRef}>
        {/* Fan blade 1 */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.4} />
        </mesh>
        
        {/* Fan blade 2 */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI/2, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.4} />
        </mesh>
        
        {/* Fan blade 3 */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.4} />
        </mesh>
        
        {/* Fan blade 4 */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI * 3/2, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.4} />
        </mesh>
        
        {/* Decorative gold trim on blades */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, 0, 0]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.05, 0.03, 0.01]} />
              <meshStandardMaterial 
                color={fanColor === "silver" || fanColor === "white" ? "#d4af37" : "#a67c00"}
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export default LuxuryFanModel;
