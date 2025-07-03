import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Brick() {
  const brickRef = useRef();
  const particlesRef = useRef([]);
  const { scene } = useGLTF("/assets/white_mesh.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#D3D3D3", 
        roughness: 0.7,   
        metalness: 0.1,   
      });
    }
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (brickRef.current) {
      brickRef.current.rotation.y = t * 0.3;
      brickRef.current.position.y = Math.sin(t * 1.5) * 0.1;
    }

    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;

      const angle = t * 0.5 + i;
      const radius = 2.2 + Math.sin(t + i) * 0.3;
      particle.position.x = Math.cos(angle) * radius;
      particle.position.z = Math.sin(angle) * radius;
      particle.position.y = Math.sin(t * 2 + i) * 0.3;

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
        <meshBasicMaterial color="#cccccc" transparent opacity={0.3} />
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Float floatIntensity={1.5} speed={2}>
            <Brick />
          </Float>
        </Suspense>
        
      </Canvas>
    </div>
  );
}

export default EnergyModel;
