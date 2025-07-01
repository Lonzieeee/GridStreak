import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

function Brick() {
  const brickRef = useRef();
  const materialRef = useRef();
  const particlesRef = useRef([]);
  const { scene } = useGLTF("/assets/white_mesh.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      const material = new THREE.MeshStandardMaterial({
        color: "#444", 
        emissive: "#00ff99", 
        emissiveIntensity: 0.1,
        roughness: 0.5,
        metalness: 0.4,
      });
      child.material = material;
      materialRef.current = material;
    }
  });

  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();


    brickRef.current.rotation.y = t * 0.6;
    brickRef.current.position.y = Math.sin(t * 1.5) * 0.15;

    
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.2;
    }

   
    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;

      const angle = t * 0.5 + i;
      const radius = 2.2 + Math.sin(t + i) * 0.3;
      particle.position.x = Math.cos(angle) * radius;
      particle.position.z = Math.sin(angle) * radius;
      particle.position.y = Math.sin(t * 2 + i) * 0.4;

      
      const distance = particle.position.distanceTo(brickRef.current.position);
      if (distance < 1.5) {
        particle.material.opacity = Math.max(0, particle.material.opacity - 0.015);
        if (particle.material.opacity <= 0) {
          particle.visible = false;
        }
      }
    });
  });

  const plasticParticles = [...Array(25)].map((_, i) => (
    <mesh
      key={i}
      ref={(el) => (particlesRef.current[i] = el)}
      position={[
        Math.random() * 5 - 2.5,
        Math.random() * 2 - 1,
        Math.random() * 5 - 2.5,
      ]}
    >
      <sphereGeometry args={[0.035, 6, 6]} />
      <meshStandardMaterial
        color={["#D3D3D3", "#A9A9A9", "#ADD8E6", "#CCCCCC"][i % 4]}
        transparent
        opacity={0.6}
      />
    </mesh>
  ));

  return (
    <group>
  {/* bottom ring */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.8, 64]} />
        <meshBasicMaterial color="#00ff99" transparent opacity={0.4} />
      </mesh>

      <primitive object={scene} ref={brickRef} scale={2} />

  
      {plasticParticles}
    </group>
  );
}

function EnergyModel() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Float floatIntensity={1.5} speed={2}>
            <Brick />
          </Float>
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default EnergyModel;
