import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ItemKey = "tote" | "trousse" | "sac";

const ITEMS: { key: ItemKey; title: string; desc: string }[] = [
  { key: "tote", title: "Tote bag", desc: "Toile écrue, peinte ou brodée à la main." },
  { key: "trousse", title: "Trousse", desc: "Format compact, parfaite pour s'initier au custom." },
  { key: "sac", title: "Sac à dos", desc: "Une toile généreuse pour les pièces ambitieuses." },
];

/* ============== Placeholder GLB-like meshes ============== */

function ToteBag() {
  return (
    <group>
      {/* corps */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.3, 0.35]} />
        <meshStandardMaterial color="#d9c7a8" roughness={0.95} metalness={0} />
      </mesh>
      {/* anses */}
      <mesh position={[-0.4, 0.95, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.3, 0.04, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#9a7a55" roughness={0.9} />
      </mesh>
      <mesh position={[0.4, 0.95, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.3, 0.04, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#9a7a55" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Trousse() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.35, 1.1, 8, 24]} />
        <meshStandardMaterial color="#c89f7b" roughness={0.9} />
      </mesh>
      {/* zip */}
      <mesh position={[0, 0.36, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 1.05, 12]} />
        <meshStandardMaterial color="#6b4a2e" roughness={0.6} metalness={0.3} />
      </mesh>
    </group>
  );
}

function SacADos() {
  return (
    <group>
      {/* corps */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.5, 0.55]} />
        <meshStandardMaterial color="#b89373" roughness={0.95} />
      </mesh>
      {/* poche avant */}
      <mesh position={[0, -0.25, 0.3]}>
        <boxGeometry args={[0.8, 0.6, 0.12]} />
        <meshStandardMaterial color="#a07e60" roughness={0.95} />
      </mesh>
      {/* bretelles */}
      <mesh position={[-0.35, 0.4, -0.32]}>
        <boxGeometry args={[0.12, 0.9, 0.06]} />
        <meshStandardMaterial color="#7a5a3e" roughness={0.9} />
      </mesh>
      <mesh position={[0.35, 0.4, -0.32]}>
        <boxGeometry args={[0.12, 0.9, 0.06]} />
        <meshStandardMaterial color="#7a5a3e" roughness={0.9} />
      </mesh>
      {/* poignée */}
      <mesh position={[0, 0.85, -0.2]}>
        <torusGeometry args={[0.12, 0.03, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#7a5a3e" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Model({ kind }: { kind: ItemKey }) {
  if (kind === "tote") return <ToteBag />;
  if (kind === "trousse") return <Trousse />;
  return <SacADos />;
}

/* ============== Slot wrapper with smooth lerp ============== */

type SlotPosition = "left" | "center" | "right";

const TARGETS: Record<SlotPosition, { pos: [number, number, number]; rot: [number, number, number]; scale: number }> = {
  left: { pos: [-2.6, 0, -0.4], rot: [0, 0.44, 0], scale: 0.75 },
  center: { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.15 },
  right: { pos: [2.6, 0, -0.4], rot: [0, -0.44, 0], scale: 0.75 },
};

function CarouselItem({
  kind,
  slot,
  isCenter,
}: {
  kind: ItemKey;
  slot: SlotPosition;
  isCenter: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const target = TARGETS[slot];
  const spinRef = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    // smooth lerp ~0.6s
    const k = 1 - Math.exp(-delta / 0.12);
    group.current.position.lerp(new THREE.Vector3(...target.pos), k);
    const targetEuler = new THREE.Euler(...target.rot);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetEuler);
    if (isCenter) {
      spinRef.current += delta * 0.35;
      const spinQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, spinRef.current, 0));
      group.current.quaternion.slerp(spinQuat, k);
    } else {
      group.current.quaternion.slerp(targetQuat, k);
      spinRef.current = 0;
    }
    const s = THREE.MathUtils.lerp(group.current.scale.x, target.scale, k);
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <Model kind={kind} />
    </group>
  );
}

function Scene({ activeIndex }: { activeIndex: number }) {
  const left = (activeIndex - 1 + ITEMS.length) % ITEMS.length;
  const right = (activeIndex + 1) % ITEMS.length;

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#d8c6a8", 0.5]} />
      <spotLight
        position={[0, 6, 4]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.4}
        castShadow
        color="#fff7e6"
      />
      <directionalLight position={[-4, 3, 4]} intensity={0.3} />

      <CarouselItem kind={ITEMS[left].key} slot="left" isCenter={false} />
      <CarouselItem kind={ITEMS[activeIndex].key} slot="center" isCenter />
      <CarouselItem kind={ITEMS[right].key} slot="right" isCenter={false} />

      {/* sol discret */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color="#f0e6d2" roughness={1} />
      </mesh>
    </>
  );
}

export default function BagsCarousel3D() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prev = () => setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
  const next = () => setActive((i) => (i + 1) % ITEMS.length);

  const current = useMemo(() => ITEMS[active], [active]);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto w-full overflow-hidden rounded-3xl border-2"
        style={{
          borderColor: "var(--cocoa)",
          background: "linear-gradient(180deg, #f6ecd9 0%, #ede0c4 100%)",
          height: 460,
        }}
      >
        {mounted && (
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.6, 5.2], fov: 38 }}
            gl={{ antialias: true }}
          >
            <Suspense fallback={null}>
              <Scene activeIndex={active} />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* contrôles */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          aria-label="Précédent"
          className="grid h-12 w-12 place-items-center rounded-full border-2 font-display text-2xl transition-transform hover:-translate-x-0.5"
          style={{ borderColor: "var(--cocoa)", color: "var(--cocoa)", background: "var(--cream)" }}
        >
          ‹
        </button>

        <div className="flex items-center gap-3">
          {ITEMS.map((it, i) => (
            <button
              key={it.key}
              onClick={() => setActive(i)}
              aria-label={`Aller à ${it.title}`}
              className="h-3 w-3 rounded-full border-2 transition-all"
              style={{
                borderColor: "var(--cocoa)",
                background: i === active ? "var(--cocoa)" : "transparent",
                transform: i === active ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Suivant"
          className="grid h-12 w-12 place-items-center rounded-full border-2 font-display text-2xl transition-transform hover:translate-x-0.5"
          style={{ borderColor: "var(--cocoa)", color: "var(--cocoa)", background: "var(--cream)" }}
        >
          ›
        </button>
      </div>

      {/* libellé courant */}
      <div className="mt-8 text-center">
        <h3 className="font-display text-3xl" style={{ color: "var(--cocoa)" }}>
          {current.title}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: "var(--cocoa)" }}>
          {current.desc}
        </p>
      </div>
    </div>
  );
}
