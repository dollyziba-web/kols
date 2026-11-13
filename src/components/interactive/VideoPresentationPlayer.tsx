"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Maximize2, Minimize2, Pause, Play, SlidersHorizontal } from "lucide-react";

interface WalkthroughSequence {
  id: string;
  number: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  specs: string;
  startProgress: number;
  endProgress: number;
}

const WALKTHROUGH_SEQUENCES: WalkthroughSequence[] = [
  {
    id: "seq-01",
    number: "01",
    title: "Exterior Approach — Reflecting Court & Cantilevered Colonnade",
    category: "Exterior Architectural Flythrough",
    duration: "00:45",
    description:
      "Smooth low-angle camera dolly across the travertine reflecting court, gliding beneath the cantilevered limestone soffit and anodized bronze vertical louver screen.",
    specs: "60 FPS Real-Time Cinema Walkthrough · Physical Sun & Sky",
    startProgress: 0,
    endProgress: 25,
  },
  {
    id: "seq-02",
    number: "02",
    title: "Threshold Passage — Double-Height Glazed Gallery & Stair Atrium",
    category: "Interior Architectural Walkthrough",
    duration: "00:38",
    description:
      "Continuous camera glide through the frameless glass threshold into the double-height living gallery, highlighting warm interior grazing illumination and sculptural stair geometry.",
    specs: "60 FPS Real-Time Cinema Walkthrough · Interior Cove Lighting",
    startProgress: 25,
    endProgress: 50,
  },
  {
    id: "seq-03",
    number: "03",
    title: "Culinary & Sanctuary Wing — Monolithic Stone & Timber Detailing",
    category: "Interior & Material Visualization",
    duration: "00:52",
    description:
      "Close-range architectural camera traverse inspecting the monolithic stone island proportions, custom dark oak joinery reveals, and indirect ceiling coffers.",
    specs: "60 FPS Real-Time Cinema Walkthrough · Physically Based Shaders",
    startProgress: 50,
    endProgress: 75,
  },
  {
    id: "seq-04",
    number: "04",
    title: "Twilight Aerial Orbit — Volumetric Massing & Nocturnal Illumination",
    category: "Architectural Masterplan Flythrough",
    duration: "00:40",
    description:
      "Elevated crane sweep around the illuminated architectural volumes at dusk, demonstrating indoor-outdoor spatial continuity and site integration.",
    specs: "60 FPS Real-Time Cinema Walkthrough · Dusk Global Illumination",
    startProgress: 75,
    endProgress: 100,
  },
];

export default function VideoPresentationPlayer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(8);
  const [compareMode, setCompareMode] = useState(false);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const progressRef = useRef(8);
  const isPlayingRef = useRef(true);
  const compareModeRef = useRef(false);
  const splitPercentRef = useRef(50);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    compareModeRef.current = compareMode;
  }, [compareMode]);

  useEffect(() => {
    splitPercentRef.current = splitPercent;
  }, [splitPercent]);

  // Determine active sequence from timeline progress
  const activeSequence =
    WALKTHROUGH_SEQUENCES.find(
      (s) => progress >= s.startProgress && progress < s.endProgress
    ) || WALKTHROUGH_SEQUENCES[WALKTHROUGH_SEQUENCES.length - 1];

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const width = mount.clientWidth || 1280;
    const height = mount.clientHeight || 720;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    // 1. Primary Photorealistic Walkthrough Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#111417");
    scene.fog = new THREE.FogExp2("#111417", 0.018);

    // 2. Secondary 2D/3D Technical CAD Blueprint Scene (for Split Comparison)
    const cadScene = new THREE.Scene();
    cadScene.background = new THREE.Color("#15181B");

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 160);

    // Materials for Photorealistic Scene
    const limestoneMat = new THREE.MeshStandardMaterial({
      color: 0xf1ede4,
      roughness: 0.55,
      metalness: 0.05,
    });
    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x222528,
      roughness: 0.65,
      metalness: 0.12,
    });
    const smokedOakMat = new THREE.MeshStandardMaterial({
      color: 0x3b2b20,
      roughness: 0.48,
      metalness: 0.08,
    });
    const anodizedBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xa58b62,
      roughness: 0.3,
      metalness: 0.82,
    });
    const waterSurfaceMat = new THREE.MeshStandardMaterial({
      color: 0x162932,
      roughness: 0.08,
      metalness: 0.78,
    });
    const glassCurtainMat = new THREE.MeshPhysicalMaterial({
      color: 0xdce6ed,
      transparent: true,
      opacity: 0.32,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.65,
    });
    const coveLightGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffe0b2,
    });

    // Build Complete Multi-Space Architectural Residence & Gallery Complex
    const residenceGroup = new THREE.Group();

    // Ground Landscape & Stepping Plinths
    const siteBase = new THREE.Mesh(
      new THREE.BoxGeometry(44, 0.4, 34),
      darkStoneMat
    );
    siteBase.position.set(0, -0.2, 0);
    siteBase.receiveShadow = true;
    residenceGroup.add(siteBase);

    // Reflecting Water Court & Stepping Pavers
    const waterCourt = new THREE.Mesh(
      new THREE.BoxGeometry(16, 0.08, 12),
      waterSurfaceMat
    );
    waterCourt.position.set(-4, 0.04, 7.5);
    residenceGroup.add(waterCourt);

    for (let i = 0; i < 5; i++) {
      const paver = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.14, 1.1),
        limestoneMat
      );
      paver.position.set(-1.5, 0.08, 12.2 - i * 1.6);
      paver.receiveShadow = true;
      residenceGroup.add(paver);
    }

    // Main Ground Floor Travertine Platform
    const mainDeck = new THREE.Mesh(
      new THREE.BoxGeometry(22, 0.35, 16),
      limestoneMat
    );
    mainDeck.position.set(2, 0.175, -2);
    mainDeck.receiveShadow = true;
    residenceGroup.add(mainDeck);

    // Double-Height Atrium Rear & West Limestone Walls
    const northWall = new THREE.Mesh(
      new THREE.BoxGeometry(20, 6.4, 0.45),
      limestoneMat
    );
    northWall.position.set(2, 3.35, -9.2);
    northWall.castShadow = true;
    northWall.receiveShadow = true;
    residenceGroup.add(northWall);

    const westWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 6.4, 14),
      limestoneMat
    );
    westWall.position.set(-7.8, 3.35, -2.4);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    residenceGroup.add(westWall);

    // Interior Feature Fluted Timber Partition & Hearth
    const hearthMonolith = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 6.2, 1.1),
      darkStoneMat
    );
    hearthMonolith.position.set(-2.5, 3.25, -4.5);
    hearthMonolith.castShadow = true;
    residenceGroup.add(hearthMonolith);

    // Interior Culinary Monolith Island & Smoked Oak Tall Joinery (East Wing)
    const kitchenCabinetWall = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 3.2, 0.8),
      smokedOakMat
    );
    kitchenCabinetWall.position.set(6.5, 1.95, -7.8);
    kitchenCabinetWall.castShadow = true;
    residenceGroup.add(kitchenCabinetWall);

    const marbleIsland = new THREE.Mesh(
      new THREE.BoxGeometry(4.4, 0.98, 1.35),
      limestoneMat
    );
    marbleIsland.position.set(6.5, 0.84, -4.8);
    marbleIsland.castShadow = true;
    marbleIsland.receiveShadow = true;
    residenceGroup.add(marbleIsland);

    // Sculptural Floating Staircase in Atrium
    for (let s = 0; s < 12; s++) {
      const tread = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.08, 0.36),
        smokedOakMat
      );
      tread.position.set(-5.8, 0.55 + s * 0.28, 1.5 - s * 0.42);
      tread.castShadow = true;
      residenceGroup.add(tread);
    }

    // Mezzanine Upper Floor Slab & Cantilevered Roof Wing
    const mezzanineSlab = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.35, 8.5),
      limestoneMat
    );
    mezzanineSlab.position.set(4.5, 3.65, -4.8);
    mezzanineSlab.castShadow = true;
    mezzanineSlab.receiveShadow = true;
    residenceGroup.add(mezzanineSlab);

    const roofCantilever = new THREE.Mesh(
      new THREE.BoxGeometry(24, 0.48, 18),
      limestoneMat
    );
    roofCantilever.position.set(1.5, 6.65, -1.2);
    roofCantilever.castShadow = true;
    roofCantilever.receiveShadow = true;
    residenceGroup.add(roofCantilever);

    // Bronze Roof Fascia & Linear Cove Strips
    const roofFascia = new THREE.Mesh(
      new THREE.BoxGeometry(24.2, 0.22, 18.2),
      anodizedBronzeMat
    );
    roofFascia.position.set(1.5, 6.82, -1.2);
    residenceGroup.add(roofFascia);

    const coveStrip1 = new THREE.Mesh(
      new THREE.BoxGeometry(18, 0.06, 0.15),
      coveLightGlowMat
    );
    coveStrip1.position.set(1.5, 6.38, 4.5);
    residenceGroup.add(coveStrip1);

    const coveStrip2 = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.06, 0.15),
      coveLightGlowMat
    );
    coveStrip2.position.set(4.5, 3.45, -0.8);
    residenceGroup.add(coveStrip2);

    // Slender Bronze Structural Colonnade
    const colonnadeCoords = [
      [-6.5, 3.4, 5.8],
      [-1.0, 3.4, 5.8],
      [4.5, 3.4, 5.8],
      [10.5, 3.4, 5.8],
      [10.5, 3.4, -1.5],
      [10.5, 3.4, -7.5],
    ];
    colonnadeCoords.forEach(([x, y, z]) => {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 6.4, 20),
        anodizedBronzeMat
      );
      col.position.set(x, y, z);
      col.castShadow = true;
      residenceGroup.add(col);
    });

    // Upper Facade Vertical Bronze Louver Screen
    for (let l = 0; l < 24; l++) {
      const louver = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 2.6, 0.24),
        anodizedBronzeMat
      );
      louver.position.set(-1.5 + l * 0.48, 5.15, 3.2);
      louver.castShadow = true;
      residenceGroup.add(louver);
    }

    // Frameless Curtain Glazing Enclosures
    const frontGlass = new THREE.Mesh(
      new THREE.BoxGeometry(16.5, 6.1, 0.08),
      glassCurtainMat
    );
    frontGlass.position.set(1.8, 3.3, 2.2);
    residenceGroup.add(frontGlass);

    scene.add(residenceGroup);

    // Build CAD Wireframe Counterpart in cadScene for 2D/3D Split Comparison
    const cadGrid = new THREE.GridHelper(48, 48, 0xa58b62, 0x2a3036);
    cadScene.add(cadGrid);

    residenceGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.geometry) {
        const edges = new THREE.EdgesGeometry(obj.geometry);
        const lineSeg = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: 0xa58b62,
            transparent: true,
            opacity: 0.85,
          })
        );
        lineSeg.position.copy(obj.position);
        lineSeg.rotation.copy(obj.rotation);
        cadScene.add(lineSeg);
      }
    });

    // Lighting Setup
    const ambient = new THREE.AmbientLight(0xdce2e8, 0.55);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffe9c8, 2.1);
    sun.position.set(18, 24, 16);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    const atriumWarmLight = new THREE.PointLight(0xffb76b, 3.4, 18);
    atriumWarmLight.position.set(-1.5, 3.8, -2.5);
    scene.add(atriumWarmLight);

    const kitchenWarmLight = new THREE.PointLight(0xffcb8e, 3.0, 14);
    kitchenWarmLight.position.set(6.5, 3.0, -5.2);
    scene.add(kitchenWarmLight);

    const poolReflectionLight = new THREE.PointLight(0x6ec3d4, 1.4, 15);
    poolReflectionLight.position.set(-3.5, 0.8, 7.5);
    scene.add(poolReflectionLight);

    // Smooth Catmull-Rom Spline Camera Path for Continuous Architectural Walkthrough
    const cameraPath = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-12.5, 2.1, 16.5), // Seq 01 Start: Exterior Water Court Approach
        new THREE.Vector3(-3.2, 1.9, 11.2),  // Seq 01 Mid: Stepping Pavers & Colonnade
        new THREE.Vector3(-0.8, 2.0, 5.2),   // Seq 02 Start: Gliding Through Glazed Threshold
        new THREE.Vector3(-2.2, 2.3, -1.2),  // Seq 02 Mid: Inside Double-Height Atrium
        new THREE.Vector3(3.4, 2.0, -2.4),   // Seq 03 Start: Entering Culinary Atelier Wing
        new THREE.Vector3(8.5, 2.2, -3.5),   // Seq 03 Mid: Inspecting Monolith Marble Island
        new THREE.Vector3(14.5, 5.8, 8.5),   // Seq 04 Start: Ascending to Twilight Aerial Orbit
        new THREE.Vector3(2.5, 8.2, 18.0),   // Seq 04 End: Masterplan Panorama
      ],
      true
    );

    const targetPath = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(1.0, 2.8, 0.0),
        new THREE.Vector3(0.5, 2.6, -2.0),
        new THREE.Vector3(-2.5, 2.8, -4.5),
        new THREE.Vector3(3.0, 2.4, -6.0),
        new THREE.Vector3(6.5, 1.6, -6.2),
        new THREE.Vector3(5.0, 1.8, -5.5),
        new THREE.Vector3(1.5, 2.8, -2.0),
        new THREE.Vector3(1.0, 2.5, -1.0),
      ],
      true
    );

    let animId: number;
    let lastTick = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTick) / 1000, 0.1);
      lastTick = now;

      if (isPlayingRef.current) {
        const nextProg = (progressRef.current + dt * 2.1) % 100;
        progressRef.current = nextProg;
        setProgress(nextProg);
      }

      const t = Math.max(0, Math.min(0.999, progressRef.current / 100));
      const camPos = cameraPath.getPointAt(t);
      const lookPos = targetPath.getPointAt(t);

      camera.position.copy(camPos);
      camera.lookAt(lookPos);

      const w = mount.clientWidth || 1280;
      const h = mount.clientHeight || 720;

      if (compareModeRef.current) {
        renderer.setScissorTest(true);
        const splitX = Math.floor((splitPercentRef.current / 100) * w);

        // Left side: 2D/3D Technical CAD Blueprint Wireframe
        renderer.setViewport(0, 0, w, h);
        renderer.setScissor(0, 0, splitX, h);
        renderer.render(cadScene, camera);

        // Right side: Photorealistic 3D Walkthrough
        renderer.setViewport(0, 0, w, h);
        renderer.setScissor(splitX, 0, w - splitX, h);
        renderer.render(scene, camera);

        renderer.setScissorTest(false);
      } else {
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, w, h);
        renderer.render(scene, camera);
      }
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 1280;
      const h = mount.clientHeight || 720;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="border border-ivory/15 bg-charcoal text-ivory shadow-2xl"
    >
      {/* Main Cinema Walkthrough Viewport */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal-dark select-none">
        {/* Live 3D Architectural Walkthrough Canvas */}
        <div
          ref={canvasMountRef}
          className="absolute inset-0 h-full w-full"
          aria-label="KOLS ARCHITECTS Real-Time 3D Architectural Walkthrough Video"
        />

        {/* Split Divider Line when Compare Mode is Active */}
        {compareMode && (
          <div
            className="pointer-events-none absolute inset-y-0 z-10 border-r-2 border-bronze"
            style={{ left: `${splitPercent}%` }}
          >
            <div className="absolute left-3 top-16 whitespace-nowrap bg-charcoal/90 border border-bronze/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ivory">
              3D PHOTOREALISTIC WALKTHROUGH
            </div>
            <div className="absolute right-3 top-16 whitespace-nowrap bg-charcoal/90 border border-bronze/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-bronze">
              2D / 3D CAD WIREFRAME
            </div>
          </div>
        )}

        {/* Top Telemetry Bar */}
        <div className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-b from-charcoal/90 to-transparent p-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 border border-bronze/60 bg-charcoal/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
              <span
                className={`h-2 w-2 rounded-full ${
                  isPlaying ? "bg-bronze animate-ping" : "bg-concrete"
                }`}
              />
              {isPlaying
                ? "ARCHITECTURAL WALKTHROUGH PLAYING"
                : "WALKTHROUGH PAUSED"}
            </span>
            <span className="hidden md:inline font-mono text-[11px] text-ivory/80">
              {activeSequence.specs}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCompareMode((prev) => !prev)}
            className={`inline-flex items-center gap-2 border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
              compareMode
                ? "border-bronze bg-bronze text-charcoal font-semibold"
                : "border-ivory/30 bg-charcoal/75 text-ivory hover:border-bronze"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>
              {compareMode
                ? "Hide 2D/3D Before & After"
                : "Compare 2D CAD vs 3D Render"}
            </span>
          </button>
        </div>

        {/* Interactive Split Slider Control when in Compare Mode */}
        {compareMode && (
          <div className="absolute inset-x-8 bottom-24 z-20 flex items-center gap-4 bg-charcoal/85 backdrop-blur-md border border-ivory/15 px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-bronze">
              CAD WIREFRAME
            </span>
            <input
              type="range"
              min={10}
              max={90}
              value={splitPercent}
              onChange={(e) => setSplitPercent(Number(e.target.value))}
              aria-label="Before and after 2D CAD to 3D render comparison slider"
              className="w-full accent-bronze cursor-ew-resize"
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-ivory">
              3D WALKTHROUGH
            </span>
          </div>
        )}

        {/* Center Custom Play/Pause Button Overlay */}
        <button
          type="button"
          onClick={() => setIsPlaying((prev) => !prev)}
          aria-label={
            isPlaying
              ? "Pause walkthrough presentation"
              : "Play walkthrough presentation"
          }
          className="group absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-bronze/80 bg-charcoal/70 text-ivory backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-bronze hover:text-charcoal"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 sm:h-7 sm:w-7" />
          ) : (
            <Play className="h-6 w-6 sm:h-7 sm:w-7 translate-x-0.5" />
          )}
        </button>

        {/* Bottom Player Controls & Caption */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-charcoal via-charcoal/90 to-transparent p-5 sm:px-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bronze">
                  SEQUENCE {activeSequence.number} · {activeSequence.category}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-ivory">
                  {activeSequence.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="inline-flex items-center gap-2 border border-ivory/25 bg-charcoal/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory hover:border-bronze hover:text-bronze transition"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Toggle fullscreen presentation"
                  className="inline-flex h-9 w-9 items-center justify-center border border-ivory/25 bg-charcoal/80 text-ivory hover:border-bronze hover:text-bronze transition"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Timeline Scrub Bar */}
            <div className="flex items-center gap-4">
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.max(
                    0,
                    Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
                  );
                  progressRef.current = pct;
                  setProgress(pct);
                }}
                className="relative h-1.5 flex-1 cursor-pointer bg-ivory/15"
              >
                <div
                  className="h-full bg-bronze transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-concrete">
                {activeSequence.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Walkthrough Sequence Selector Grid */}
      <div className="grid grid-cols-1 divide-y divide-ivory/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x border-t border-ivory/15">
        {WALKTHROUGH_SEQUENCES.map((seq) => {
          const isCurrent = seq.id === activeSequence.id;
          return (
            <button
              key={seq.id}
              type="button"
              onClick={() => {
                progressRef.current = seq.startProgress + 1;
                setProgress(seq.startProgress + 1);
                setIsPlaying(true);
              }}
              className={`flex flex-col justify-between p-5 text-left transition ${
                isCurrent
                  ? "bg-ivory/10 border-t-2 border-t-bronze"
                  : "hover:bg-ivory/5"
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-bronze mb-2">
                  <span>SEQ {seq.number}</span>
                  <span>{seq.duration}</span>
                </div>
                <h4 className="font-serif text-base text-ivory line-clamp-1">
                  {seq.title}
                </h4>
                <p className="mt-1.5 text-xs text-concrete line-clamp-2">
                  {seq.description}
                </p>
              </div>
              <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/75">
                {isCurrent ? "● Active Camera Path" : "Jump to Sequence →"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
