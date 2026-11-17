/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeMode } from '../theme';

function FixedCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(3.25, 5.15, 6.95);
    camera.lookAt(0.1, -0.08, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

const readVar = (name, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const channels = value.split(/\s+/).map(Number);
  return channels.length === 3 && channels.every(Number.isFinite)
    ? `rgb(${channels.join(', ')})`
    : fallback;
};

function createLogoTexture(skill) {
  const canvas = document.createElement('canvas');
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, size, size);
  context.fillStyle = '#ffffff';
  context.shadowColor = 'rgba(0, 0, 0, 0.35)';
  context.shadowBlur = 4;
  context.shadowOffsetY = 2;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  if (skill.logo?.path && window.Path2D) {
    const path = new window.Path2D(skill.logo.path);
    context.save();
    context.translate(34, 34);
    context.scale(7.85, 7.85);
    context.fill(path);
    context.restore();
  } else {
    context.font = '900 78px "Geist Variable", Arial, sans-serif';
    context.fillText(skill.shortName, size / 2, size / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function SkillKey3D({ skill, position, rowOffset, index, total, visible, onActivate }) {
  const groupRef = useRef();
  const materialRef = useRef();
  const logoMaterialRef = useRef();
  const [shown, setShown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const keyColor = useMemo(() => new THREE.Color(skill.color), [skill.color]);
  const logoTexture = useMemo(() => createLogoTexture(skill), [skill]);
  const showDelay = index * 55;
  const hideDelay = (total - index - 1) * 38;

  useEffect(() => {
    const timer = window.setTimeout(() => setShown(visible), visible ? showDelay : hideDelay);
    return () => window.clearTimeout(timer);
  }, [hideDelay, showDelay, visible]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = shown && hovered ? -0.26 : 0;
    const targetScale = shown ? 1 : 0.001;
    const targetOpacity = shown ? 1 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.18);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, hovered ? -0.018 : 0, 0.16);
    groupRef.current.scale.x = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.16);
    groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, 0.16);
    groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, 0.16);
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.18);
    }
    if (logoMaterialRef.current) {
      logoMaterialRef.current.opacity = THREE.MathUtils.lerp(logoMaterialRef.current.opacity, targetOpacity, 0.18);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[position[0] + rowOffset, 0, position[1]]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
        onActivate(skill);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(event) => {
        event.stopPropagation();
        onActivate(skill);
      }}
    >
      <RoundedBox args={[1.08, 0.52, 1.08]} radius={0.095} smoothness={8} position={[0, 0.26, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={materialRef}
          color={keyColor}
          roughness={0.62}
          metalness={0}
          clearcoat={0.05}
          clearcoatRoughness={0.85}
          transparent
          opacity={0}
        />
      </RoundedBox>
      <mesh
        position={[0, 0.526, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.68, 0.68]} />
        <meshBasicMaterial ref={logoMaterialRef} map={logoTexture} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function KeyboardScene({ skills, visible, onActivate, canvasColor, groundColor }) {
  const layout = [];
  const rowSizes = [6, 6, 6];
  const rowOffsets = [0, 0.42, 0.84];
  let skillIndex = 0;

  rowSizes.forEach((rowSize, row) => {
    for (let column = 0; column < rowSize && skillIndex < skills.length; column += 1) {
      layout.push({
        skill: skills[skillIndex],
        rowOffset: rowOffsets[row],
        position: [(column - (rowSize - 1) / 2) * 1.02, (row - 1) * 1.03],
      });
      skillIndex += 1;
    }
  });

  return (
    <>
      <FixedCamera />
      <color attach="background" args={[canvasColor]} />
      <ambientLight intensity={1.05} />
      <hemisphereLight args={['#ffffff', groundColor, 0.9]} />
      <directionalLight position={[3.8, 7.4, 5.6]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      <spotLight position={[-4.8, 5.6, 3.4]} angle={0.42} penumbra={0.9} intensity={0.45} color="#ffffff" />
      <pointLight position={[4.2, 2.9, -3.5]} intensity={0.16} color="#ffffff" />
      <group rotation={[0, -0.12, -0.08]} position={[0, -0.72, 0]} scale={0.98}>
        {layout.map(({ skill, position, rowOffset }) => (
          <SkillKey3D
            key={skill.name}
            skill={skill}
            position={position}
            rowOffset={rowOffset}
            index={skills.findIndex((item) => item.name === skill.name)}
            total={skills.length}
            visible={visible}
            onActivate={onActivate}
          />
        ))}
      </group>
      <ContactShadows position={[0, -0.82, 0]} opacity={0.22} scale={8.8} blur={2.45} far={4.6} color="#171717" />
    </>
  );
}

export default function SkillKeyboardScene({ skills, visible, onActivate }) {
  useThemeMode();
  const canvasColor = readVar('--canvas', 'rgb(255, 255, 255)');
  const groundColor = readVar('--n300', 'rgb(212, 212, 212)');

  return (
    <div className="h-[360px] overflow-hidden bg-canvas sm:h-[500px] md:h-[640px]">
      <Canvas shadows camera={{ position: [4.05, 5.35, 6.65], fov: 44 }} dpr={[1, 1.75]}>
        <KeyboardScene
          skills={skills}
          visible={visible}
          onActivate={onActivate}
          canvasColor={canvasColor}
          groundColor={groundColor}
        />
      </Canvas>
    </div>
  );
}
