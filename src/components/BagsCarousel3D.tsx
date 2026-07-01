import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import toteBagAsset from "@/assets/models/jute-tote-bag.glb.asset.json";
import wm604Asset from "@/assets/models/wm604-tote-bag.glb.asset.json";
import wm110Asset from "@/assets/models/wm110-drawstring-bag.glb.asset.json";
import wm101Asset from "@/assets/models/wm101-canvas-tote.glb.asset.json";
import wm880Asset from "@/assets/models/wm880-beige-backpack.glb.asset.json";
import wm552Asset from "@/assets/models/wm552-beige-zippered-pouches.glb.asset.json";
import bgRoom from "@/assets/backgrounds/bar-a-custom-room.png.asset.json";


const TOTE_BAG_URL = toteBagAsset.url;
const WM604_URL = wm604Asset.url;
const WM110_URL = wm110Asset.url;
const WM101_URL = wm101Asset.url;
const WM880_URL = wm880Asset.url;
const WM552_URL = wm552Asset.url;
useGLTF.preload(TOTE_BAG_URL);
useGLTF.preload(WM604_URL);
useGLTF.preload(WM110_URL);
useGLTF.preload(WM101_URL);
useGLTF.preload(WM880_URL);
useGLTF.preload(WM552_URL);

type ItemKey = "tote" | "trousse" | "sac" | "canvas" | "backpack" | "pouches";

const ITEMS: { key: ItemKey; title: string; desc: string }[] = [
  { key: "tote", title: "Tote bag", desc: "Toile écrue, peinte ou brodée à la main." },
  { key: "trousse", title: "Sac à cordon WM110", desc: "Compact et pratique, idéal pour s'initier au custom." },
  { key: "sac", title: "Sac cabas WM604", desc: "Un modèle généreux en toile naturelle, prêt à recevoir vos créations." },
  { key: "canvas", title: "Tote bag WM101", desc: "Toile canvas robuste, parfaite pour vos illustrations." },
  { key: "backpack", title: "Sac à dos WM880", desc: "Sac à dos beige en toile, une grande surface pour laisser libre cours à ta créativité." },
  { key: "pouches", title: "Pochettes WM552", desc: "Trio de pochettes zippées en toile beige, parfait pour organiser vos petits essentiels." },
];


/* ============== Placeholder GLB-like meshes ============== */

function ToteBag() {
  const { scene } = useGLTF(TOTE_BAG_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    // Center + normalize scale to ~1.5 units tall
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function Trousse() {
  const { scene } = useGLTF(WM110_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function SacADos() {
  const { scene } = useGLTF(WM604_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function CanvasTote() {
  const { scene } = useGLTF(WM101_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function Backpack() {
  const { scene } = useGLTF(WM880_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function ZipperedPouches() {
  const { scene } = useGLTF(WM552_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    const target = 1.5;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);
  return <primitive object={cloned} />;
}

function Model({ kind }: { kind: ItemKey }) {
  if (kind === "tote") return <ToteBag />;
  if (kind === "trousse") return <Trousse />;
  if (kind === "canvas") return <CanvasTote />;
  if (kind === "backpack") return <Backpack />;
  if (kind === "pouches") return <ZipperedPouches />;
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
          height: isMobile ? 520 : 460,
        }}
      >
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgRoom.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {mounted && (
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.5, isMobile ? 5.8 : 5.2], fov: isMobile ? 42 : 38 }}
            gl={{ antialias: true, alpha: true }}
            style={{ position: "relative", background: "transparent" }}
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
