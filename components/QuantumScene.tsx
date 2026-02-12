/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Cloud, Float } from '@react-three/drei';

export const CalmBackground: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
        <ambientLight intensity={0.8} />
        <fog attach="fog" args={['#F2EFE9', 5, 20]} />
        
        {/* Subtle floating particles representing dust in light */}
        <Sparkles 
          count={150} 
          scale={12} 
          size={2} 
          speed={0.2} 
          opacity={0.4}
          color="#A88B7D" 
        />
        
        {/* Second layer of deeper particles */}
        <Sparkles 
          count={50} 
          scale={10} 
          size={5} 
          speed={0.1} 
          opacity={0.2}
          color="#B8A47E" 
        />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Cloud 
            opacity={0.15} 
            speed={0.1} // Rotation speed
            bounds={[10, 2, 1.5]} // Replaces deprecated width/depth
            segments={10} // Number of particles
            color="#F9F8F6"
            position={[0, -2, -5]}
          />
        </Float>
      </Canvas>
    </div>
  );
};

// Keeping these empty exports if other files import them, to prevent build errors during transition
export const HeroScene = () => null;
export const QuantumComputerScene = () => null;