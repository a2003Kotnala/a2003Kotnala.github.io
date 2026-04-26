import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { techStackImages } from "../data/portfolioContent";

const textureLoader = new THREE.TextureLoader();
const textures = techStackImages.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);

const spheres = [...Array(34)].map((_, index) => ({
  scale: [0.82, 0.9, 0.98, 1.06, 1.14][index % 5],
  materialIndex: index % techStackImages.length,
  position: [
    (index % 7 - 3) * 2.05,
    Math.floor(index / 7) * 2.05 - 8.4,
    (index % 5 - 2) * 0.95,
  ] as [number, number, number],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  materialIndex: number;
  position: [number, number, number];
  materials: THREE.MeshPhysicalMaterial[];
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  materialIndex,
  position,
  materials,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -28 * delta * scale,
          -64 * delta * scale,
          -28 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.35}
      friction={0.2}
      position={position}
      ref={api}
      colliders="ball"
    >
      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={materials[materialIndex]}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.6]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const isActive = isHovered || isInView;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;

        return new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.35,
          roughness: 0.5,
          clearcoat: 0.25,
          clearcoatRoughness: 0.35,
        });
      }
    );
  }, []);

  return (
    <div
      className="techstack"
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <h2> AI & Backend Stack</h2>

      <Canvas
        frameloop={isActive ? "always" : "demand"}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          stencil: false,
          depth: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 24], fov: 34, near: 1, far: 80 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.35;
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={false}
        />
        <directionalLight position={[0, 5, -4]} intensity={2.4} />
        <Physics gravity={[0, 0, 0]} interpolate={false}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              materials={materials}
              isActive={isActive}
            />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
};

export default TechStack;
