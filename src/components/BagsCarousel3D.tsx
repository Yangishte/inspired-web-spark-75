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
import wm540Asset from "@/assets/models/cream-fabric-pouches.glb.asset.json";
import bgRoom from "@/assets/backgrounds/bar-a-custom-room.png.asset.json";


const TOTE_BAG_URL = toteBagAsset.url;
const WM604_URL = wm604Asset.url;
const WM110_URL = wm110Asset.url;
const WM101_URL = wm101Asset.url;
const WM880_URL = wm880Asset.url;
const WM552_URL = wm552Asset.url;
const WM540_URL = wm540Asset.url;
useGLTF.preload(TOTE_BAG_URL);
useGLTF.preload(WM604_URL);
useGLTF.preload(WM110_URL);
useGLTF.preload(WM101_URL);
useGLTF.preload(WM880_URL);
useGLTF.preload(WM552_URL);
useGLTF.preload(WM540_URL);

type ItemKey = "tote" | "trousse" | "sac" | "canvas" | "backpack" | "pouches" | "lotpochettes";

const ITEMS: { key: ItemKey; title: string; desc: string }[] = [
  { key: "tote", title: "Petit sac", desc: "Toile de jute 100% coton. Capacité 6L." },
  { key: "trousse", title: "Sac à cordon", desc: "Le fameux sac de gym : compact et pratique, idéal pour s'initier au custom." },
  { key: "sac", title: "Sac cabas", desc: "Un modèle généreux 100% coton aux 2 poches avant. Capacité de 23L." },
  { key: "canvas", title: "Tote bag", desc: "Parfait pour un pique nique!\nTote bag 100% coton.\nCapacité 10L." },
  { key: "backpack", title: "Sac à dos", desc: "Sac à dos beige en toile, une grande surface pour laisser libre cours à ta créativité." },
  { key: "pouches", title: "Pochettes", desc: "Trio de pochettes zippées en toile beige, parfait pour organiser vos petits essentiels." },
  { key: "lotpochettes", title: "Lot pochettes", desc: "Pochettes multi-usages en 100% coton." },
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

function LotPochettes() {
  const { scene } = useGLTF(WM540_URL);
  const cloned = useMemo(() => {
    const s = scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    s.position.sub(center);
    // légèrement plus grand pour bien remplir la vignette
    const target = 1.65;
    const scale = target / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    // orienter le lot face à la caméra, légèrement incliné pour la perspective
    s.rotation.set(0.05, -0.15, 0);
    s.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (mat && (mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const standardMat = mat as THREE.MeshStandardMaterial;
          // tissu coton clair et chaud
          standardMat.roughness = Math.max(0.35, standardMat.roughness * 0.45);
          standardMat.metalness = Math.min(0.05, standardMat.metalness * 0.25);
          standardMat.color = new THREE.Color("#f5efe3");
          standardMat.emissive = new THREE.Color("#fff4e0");
          standardMat.emissiveIntensity = 0.12;
        }
      }
    });

    return s;
  }, [scene]);
  return (
    <>
      <primitive object={cloned} />
      {/* lumières complémentaires pour illuminer le lot de pochettes */}
      <pointLight position={[0, 1.6, 2.0]} intensity={4.5} color="#fff7e6" distance={6} decay={2} />
      <pointLight position={[-1.4, 1.0, 1.6]} intensity={2.4} color="#ffffff" distance={5} decay={2} />
      <pointLight position={[1.4, 0.6, 1.6]} intensity={2.0} color="#fff0d6" distance={5} decay={2} />
    </>
  );
}

function Model({ kind }: { kind: ItemKey }) {
  if (kind === "tote") return <ToteBag />;
  if (kind === "trousse") return <Trousse />;
  if (kind === "canvas") return <CanvasTote />;
  if (kind === "backpack") return <Backpack />;
  if (kind === "pouches") return <ZipperedPouches />;
  if (kind === "lotpochettes") return <LotPochettes />;
  return <SacADos />;
}



/* ============== Slot wrapper with smooth lerp ============== */

type SlotPosition = "left" | "center" | "right";

const TARGETS: Record<SlotPosition, { pos: [number, number, number]; rot: [number, number, number]; scale: number }> = {
  left: { pos: [-2.6, 0, -0.4], rot: [0, 1.57, 0], scale: 0.75 },
  center: { pos: [0, 0, 0], rot: [0, 0, 0], scale: 1.15 },
  right: { pos: [2.6, 0, -0.4], rot: [0, -1.57, 0], scale: 0.75 },
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
  // reusable temp objects to avoid per-frame allocations
  const tmpVec = useRef(new THREE.Vector3());
  const tmpEuler = useRef(new THREE.Euler());
  const tmpQuat = useRef(new THREE.Quaternion());

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = Math.min(delta, 0.05); // clamp big frame gaps
    const k = 1 - Math.exp(-d / 0.12);
    tmpVec.current.set(target.pos[0], target.pos[1], target.pos[2]);
    group.current.position.lerp(tmpVec.current, k);
    if (isCenter) {
      spinRef.current += d * 0.35;
      tmpEuler.current.set(0, spinRef.current, 0);
      tmpQuat.current.setFromEuler(tmpEuler.current);
      group.current.quaternion.slerp(tmpQuat.current, k);
    } else {
      tmpEuler.current.set(target.rot[0], target.rot[1], target.rot[2]);
      tmpQuat.current.setFromEuler(tmpEuler.current);
      group.current.quaternion.slerp(tmpQuat.current, k);
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

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const current = useMemo(() => ITEMS[active], [active]);

  return (
    <div className="w-full">
      <div
        className="relative mx-auto w-full overflow-hidden rounded-3xl border-2"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          borderColor: "var(--cocoa)",
          background: "linear-gradient(180deg, #f6ecd9 0%, #ede0c4 100%)",
          height: isMobile ? 520 : 460,
          touchAction: "pan-y",
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
            shadows={!isMobile}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            camera={{ position: [0, 0.5, isMobile ? 5.8 : 5.2], fov: isMobile ? 42 : 38 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ position: "relative", background: "transparent" }}
          >
            <Suspense fallback={null}>
              <Scene activeIndex={active} />
            </Suspense>
          </Canvas>
        )}


      </div>

      {/* libellé courant détaché sous le carousel */}
      <div
        className="mx-auto flex min-h-[6.5rem] w-full flex-col items-center justify-center rounded-b-3xl border-x-2 border-b-2 px-6 py-5 text-center md:min-h-28 md:py-6"
        style={{
          background: "rgba(255, 253, 247, 0.82)",
          backdropFilter: "blur(4px)",
          borderColor: "var(--cocoa)",
        }}
      >
        <h3 className="font-display text-2xl md:text-3xl" style={{ color: "var(--cocoa)" }}>
          {current.title}
        </h3>
        <p className="mx-auto mt-2 max-w-md whitespace-pre-wrap text-sm leading-relaxed md:mt-3 md:text-base" style={{ color: "var(--cocoa)" }}>
          {current.desc}
        </p>
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
    </div>
  );
}
