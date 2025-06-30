import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Trail } from "@react-three/drei";
import * as THREE from "three";

function Brick() {
  const ref = useRef();
  const materialRef = useRef();
  const { scene } = useGLTF("/assets/white_mesh.glb");


  scene.traverse((child) => {
    if (child.isMesh) {
      const material = new THREE.MeshStandardMaterial({
        color: "#B0F222", 
        emissive: "#ffffff",
        emissiveIntensity: 0,
        roughness: 0.4,
        metalness: 0.3,
      });
      child.material = material;
      materialRef.current = material;
    }
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Rotation
    ref.current.rotation.y = t * 0.6;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.3;

    // Floating
    ref.current.position.y = Math.sin(t * 2) * 0.1;

  
    if (materialRef.current) {
      const flicker = Math.sin(t * 10) * 0.2 + Math.random() * 0.05;
      materialRef.current.emissiveIntensity = Math.min(t / 3, 1.3) + flicker;

    
      const progress = Math.min(t / 10, 1);
      const cold = new THREE.Color("#0D0D0D");
      const ember = new THREE.Color("#8B0000");
      const flame = new THREE.Color("#FFD700");
      const hot = new THREE.Color("#0D0D0D");

      if (progress < 0.33) {
        materialRef.current.color = cold.lerp(ember, progress / 0.33);
      } else if (progress < 0.66) {
        materialRef.current.color = ember.lerp(flame, (progress - 0.33) / 0.33);
      } else {
        materialRef.current.color = flame.lerp(hot, (progress - 0.66) / 0.34);
      }
    }
  });

  return (
    <group>
      {/*  ring underneath */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.6, 64]} />
        <meshBasicMaterial color="#B0F222" transparent opacity={0.5} />
      </mesh>

      
      {/* Brick itself */}
      <primitive object={scene} ref={ref} scale={2} />
    </group>
  );
}

function EnergyModel() {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Brick />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default EnergyModel;
