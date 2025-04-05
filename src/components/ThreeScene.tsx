
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import CeilingFanModel from "./CeilingFanModel";
import { useIsMobile } from "@/hooks/use-mobile";

interface ThreeSceneProps {
  fanColor: string;
  bladeColor: string;
  ledLightOn: boolean;
}

const ThreeScene = ({ fanColor, bladeColor, ledLightOn }: ThreeSceneProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full ${isMobile ? 'h-[450px]' : 'h-[550px]'} mx-auto`}>
      <Canvas 
        shadows 
        camera={{ 
          position: [0, 0, isMobile ? 4.5 : 5], 
          fov: isMobile ? 65 : 50 
        }}
        dpr={[1, 2]} // Optimize for mobile performance
      >
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
          <OrbitControls 
            enableZoom={true}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
            enableDamping={true}
            dampingFactor={0.05}
            enablePan={false}
            rotateSpeed={0.8}
            minDistance={3}
            maxDistance={7}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
