
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CeilingFanModelProps {
  rotate?: boolean;
  fanColor?: string;
  bladeColor?: string;
  ledLightOn?: boolean;
}

// Create a basic ceiling fan model since we don't have an actual GLTF model
export const CeilingFanModel = ({ 
  rotate = true, 
  fanColor = "dark", 
  bladeColor = "dark",
  ledLightOn = false 
}: CeilingFanModelProps) => {
  const fanRef = useRef<THREE.Group>(null);
  const motorRef = useRef<THREE.Mesh>(null);
  const rotationSpeed = 0.01;

  // Map the color values to actual hex colors
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
      <mesh ref={motorRef} position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Center cap */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Rod */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Ceiling mount */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color={getColorValue(fanColor)} metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* LED Light - made larger and emissive when turned on */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 32]} />
        <meshStandardMaterial 
          color="white" 
          emissive={ledLightOn ? "#ffffff" : "#333333"}
          emissiveIntensity={ledLightOn ? 2.0 : 0.1} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Fan blades group */}
      <group ref={fanRef}>
        {/* Fan blade 1 */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
        
        {/* Fan blade 2 */}
        <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
        
        {/* Fan blade 3 */}
        <mesh position={[0, 0, 1]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
        
        {/* Fan blade 4 */}
        <mesh position={[0, 0, -1]} rotation={[0, Math.PI / 2, Math.PI]}>
          <boxGeometry args={[1.5, 0.05, 0.3]} />
          <meshStandardMaterial color={getColorValue(bladeColor)} roughness={0.8} />
        </mesh>
      </group>
      
      <OrbitControls 
        enableZoom={true}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
    </group>
  );
};

export default CeilingFanModel;
