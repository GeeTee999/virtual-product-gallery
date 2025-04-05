
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import CeilingFanModel from "./CeilingFanModel";

interface ThreeSceneProps {
  fanColor: string;
  bladeColor: string;
  ledLightOn: boolean;
}

const ThreeScene = ({ fanColor, bladeColor, ledLightOn }: ThreeSceneProps) => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <CeilingFanModel 
            fanColor={fanColor} 
            bladeColor={bladeColor}
            ledLightOn={ledLightOn}
          />
          <Environment preset="apartment" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2.5} 
            far={4} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
