"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Box, Eye, Layers, RotateCcw, Sun } from "lucide-react";

type ViewPreset = "perspective" | "plan" | "elevation" | "courtyard";
type RenderStyle = "shaded" | "wireframe" | "dusk";

export default function Architectural3DViewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [viewPreset, setViewPreset] = useState<ViewPreset>("perspective");
  const [renderStyle, setRenderStyle] = useState<RenderStyle>("shaded");
  const [autoRotate, setAutoRotate] = useState(true);

  const cameraTargetRef = useRef({
    theta: 0.72,
    phi: 1.15,
    radius: 17,
    lookAtY: 1.5,
  });
  const styleRef = useRef<RenderStyle>("shaded");
  const autoRotateRef = useRef(true);

  useEffect(() => {
    styleRef.current = renderStyle;
  }, [renderStyle]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (viewPreset === "perspective") {
      cameraTargetRef.current = { theta: 0.72, phi: 1.15, radius: 17, lookAtY: 1.5 };
    } else if (viewPreset === "plan") {
      cameraTargetRef.current = { theta: 0.01, phi: 0.18, radius: 21, lookAtY: 0 };
    } else if (viewPreset === "elevation") {
      cameraTargetRef.current = { theta: 0, phi: 1.48, radius: 16, lookAtY: 1.8 };
    } else if (viewPreset === "courtyard") {
      cameraTargetRef.current = { theta: -0.65, phi: 1.28, radius: 12.5, lookAtY: 1.4 };
    }
  }, [viewPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#17191B");

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 120);

    // Architectural Grid Helper
    const grid = new THREE.GridHelper(28, 28, 0xa58b62, 0x2a2d30);
    grid.position.y = -0.02;
    scene.add(grid);

    // Materials
    const travertineMat = new THREE.MeshStandardMaterial({
      color: 0xf3f0e9,
      roughness: 0.65,
      metalness: 0.05,
    });
    const charcoalConcreteMat = new THREE.MeshStandardMaterial({
      color: 0x26292c,
      roughness: 0.75,
      metalness: 0.1,
    });
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xa58b62,
      roughness: 0.35,
      metalness: 0.75,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbe4eb,
      transparent: true,
      opacity: 0.42,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.5,
    });
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1e3238,
      roughness: 0.15,
      metalness: 0.6,
    });
    const warmCoreGlowMat = new THREE.MeshBasicMaterial({
      color: 0xffd28e,
      transparent: true,
      opacity: 0.35,
    });

    const allStandardMaterials = [
      travertineMat,
      charcoalConcreteMat,
      bronzeMat,
      waterMat,
    ];

    // Building Group
    const building = new THREE.Group();

    // 1. Base Plinth
    const plinthGeo = new THREE.BoxGeometry(13.5, 0.35, 9.5);
    const plinth = new THREE.Mesh(plinthGeo, charcoalConcreteMat);
    plinth.position.set(0, 0.175, 0);
    plinth.receiveShadow = true;
    building.add(plinth);

    // 2. Reflecting Pool
    const poolGeo = new THREE.BoxGeometry(5.6, 0.08, 4.2);
    const pool = new THREE.Mesh(poolGeo, waterMat);
    pool.position.set(3.2, 0.37, 2.1);
    building.add(pool);

    // 3. Ground Floor Travertine Core Wall
    const coreWallGeo = new THREE.BoxGeometry(4.2, 2.6, 6.2);
    const coreWall = new THREE.Mesh(coreWallGeo, travertineMat);
    coreWall.position.set(-3.4, 1.65, -0.6);
    coreWall.castShadow = true;
    coreWall.receiveShadow = true;
    building.add(coreWall);

    // 4. Ground Floor Glazed Living Volume
    const glassVolGeo = new THREE.BoxGeometry(6.2, 2.4, 4.6);
    const glassVol = new THREE.Mesh(glassVolGeo, glassMat);
    glassVol.position.set(1.6, 1.55, -1.2);
    building.add(glassVol);

    // Warm interior volume inside glass
    const innerWarmGeo = new THREE.BoxGeometry(5.4, 2.1, 3.8);
    const innerWarm = new THREE.Mesh(innerWarmGeo, warmCoreGlowMat);
    innerWarm.position.set(1.6, 1.55, -1.2);
    building.add(innerWarm);

    // 5. Upper Cantilevered Limestone Volume
    const upperSlabGeo = new THREE.BoxGeometry(10.8, 2.1, 5.4);
    const upperSlab = new THREE.Mesh(upperSlabGeo, travertineMat);
    upperSlab.position.set(0.5, 3.85, -0.8);
    upperSlab.castShadow = true;
    upperSlab.receiveShadow = true;
    building.add(upperSlab);

    // 6. Upper Overhang Soffit Fascia (Bronze Trim)
    const fasciaGeo = new THREE.BoxGeometry(11.0, 0.18, 5.6);
    const fascia = new THREE.Mesh(fasciaGeo, bronzeMat);
    fascia.position.set(0.5, 4.95, -0.8);
    building.add(fascia);

    // 7. Vertical Bronze Louver Screen on Upper Volume
    for (let i = 0; i < 14; i++) {
      const louverGeo = new THREE.BoxGeometry(0.06, 1.9, 0.22);
      const louver = new THREE.Mesh(louverGeo, bronzeMat);
      louver.position.set(-2.2 + i * 0.35, 3.85, 1.92);
      louver.castShadow = true;
      building.add(louver);
    }

    // 8. Slender Structural Columns Supporting Cantilever
    const colPositions = [
      [4.8, 1.6, 1.4],
      [4.8, 1.6, -3.0],
      [-0.8, 1.6, 1.4],
    ];
    colPositions.forEach(([x, y, z]) => {
      const colGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.5, 16);
      const col = new THREE.Mesh(colGeo, bronzeMat);
      col.position.set(x, y, z);
      col.castShadow = true;
      building.add(col);
    });

    // Wireframe overlay edges for CAD precision
    const edgeGroup = new THREE.Group();
    building.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const edges = new THREE.EdgesGeometry(child.geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: 0xa58b62,
            transparent: true,
            opacity: 0.45,
          })
        );
        line.position.copy(child.position);
        line.rotation.copy(child.rotation);
        edgeGroup.add(line);
      }
    });
    building.add(edgeGroup);

    scene.add(building);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xf3f0e9, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 1.8);
    sunLight.position.set(14, 20, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const warmInteriorPoint = new THREE.PointLight(0xffb86c, 2.2, 14);
    warmInteriorPoint.position.set(1.6, 2.0, -0.5);
    scene.add(warmInteriorPoint);

    // Pointer Drag Orbit Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const currentCam = {
      theta: 0.72,
      phi: 1.15,
      radius: 17,
      lookAtY: 1.5,
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      setAutoRotate(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      cameraTargetRef.current.theta -= dx * 0.008;
      cameraTargetRef.current.phi = Math.max(
        0.2,
        Math.min(1.52, cameraTargetRef.current.phi - dy * 0.006)
      );
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotateRef.current && !isDragging && !prefersReducedMotion) {
        cameraTargetRef.current.theta += 0.0022;
      }

      // Smooth interpolation
      currentCam.theta += (cameraTargetRef.current.theta - currentCam.theta) * 0.08;
      currentCam.phi += (cameraTargetRef.current.phi - currentCam.phi) * 0.08;
      currentCam.radius +=
        (cameraTargetRef.current.radius - currentCam.radius) * 0.08;
      currentCam.lookAtY +=
        (cameraTargetRef.current.lookAtY - currentCam.lookAtY) * 0.08;

      const x =
        currentCam.radius *
        Math.sin(currentCam.phi) *
        Math.sin(currentCam.theta);
      const y = currentCam.radius * Math.cos(currentCam.phi);
      const z =
        currentCam.radius *
        Math.sin(currentCam.phi) *
        Math.cos(currentCam.theta);

      camera.position.set(x, Math.max(0.6, y), z);
      camera.lookAt(0, currentCam.lookAtY, 0);

      // Update style dynamically
      const currentStyle = styleRef.current;
      allStandardMaterials.forEach((mat) => {
        mat.wireframe = currentStyle === "wireframe";
      });

      if (currentStyle === "dusk") {
        scene.background = new THREE.Color("#0E1114");
        ambientLight.intensity = 0.28;
        sunLight.intensity = 0.45;
        warmInteriorPoint.intensity = 4.2;
        warmCoreGlowMat.opacity = 0.72;
      } else if (currentStyle === "wireframe") {
        scene.background = new THREE.Color("#141618");
        ambientLight.intensity = 0.9;
        sunLight.intensity = 0.8;
        warmInteriorPoint.intensity = 1.0;
        warmCoreGlowMat.opacity = 0.15;
      } else {
        scene.background = new THREE.Color("#17191B");
        ambientLight.intensity = 0.85;
        sunLight.intensity = 1.85;
        warmInteriorPoint.intensity = 1.8;
        warmCoreGlowMat.opacity = 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="border border-ivory/15 bg-charcoal text-ivory">
      {/* Top Technical Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 px-6 py-4">
        <div className="flex items-center gap-3">
          <Box className="h-4 w-4 text-bronze" />
          <div>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-bronze block">
              INTERACTIVE 3D SPATIAL MASSING STUDY
            </span>
            <h3 className="font-serif text-lg tracking-wider text-ivory">
              The Aurelia Pavilion — Volumetric &amp; Solar Model (Drag to Orbit)
            </h3>
          </div>
        </div>

        {/* Render Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRenderStyle("shaded")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition ${
              renderStyle === "shaded"
                ? "border-bronze bg-bronze text-charcoal font-semibold"
                : "border-ivory/20 text-ivory/80 hover:border-bronze"
            }`}
          >
            <Eye className="h-3 w-3" />
            <span>Architectural Shaded</span>
          </button>

          <button
            type="button"
            onClick={() => setRenderStyle("wireframe")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition ${
              renderStyle === "wireframe"
                ? "border-bronze bg-bronze text-charcoal font-semibold"
                : "border-ivory/20 text-ivory/80 hover:border-bronze"
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>CAD Wireframe</span>
          </button>

          <button
            type="button"
            onClick={() => setRenderStyle("dusk")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition ${
              renderStyle === "dusk"
                ? "border-bronze bg-bronze text-charcoal font-semibold"
                : "border-ivory/20 text-ivory/80 hover:border-bronze"
            }`}
          >
            <Sun className="h-3 w-3" />
            <span>Dusk Lighting</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport or Static Fallback */}
      <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden">
        {webglSupported ? (
          <div
            ref={mountRef}
            className="h-full w-full cursor-grab active:cursor-grabbing"
            aria-label="Interactive 3D Architectural Massing Model"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-charcoal p-8 text-center">
            <img
              src="/images/renders/hero-residence.png"
              alt="Static Architectural Visualization Fallback"
              className="h-64 w-auto object-cover border border-bronze/40 mb-4"
            />
            <p className="font-mono text-xs text-concrete">
              Static High-Resolution Architectural View (WebGL Hardware Acceleration Disabled)
            </p>
          </div>
        )}

        {/* HUD Telemetry Overlay */}
        <div className="pointer-events-none absolute left-5 top-5 hidden sm:block space-y-1 bg-charcoal/80 backdrop-blur-sm border border-ivory/10 px-3.5 py-2.5 font-mono text-[10px] text-concrete">
          <p className="text-bronze">GRID SPAN: 23,000 MM × 14,500 MM</p>
          <p>CANTILEVER OVERHANG: 4,200 MM</p>
          <p>CLADDING: HONED TRAVERTINE + BRONZE LOUVERS</p>
        </div>

        {/* Camera Preset Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 bg-charcoal/85 backdrop-blur-md border border-ivory/15 px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-concrete mr-1">
              CAMERA:
            </span>
            {(
              [
                { id: "perspective", label: "01 Isometric" },
                { id: "plan", label: "02 Top Plan" },
                { id: "elevation", label: "03 Front Elevation" },
                { id: "courtyard", label: "04 Pool Court" },
              ] as { id: ViewPreset; label: string }[]
            ).map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setViewPreset(preset.id);
                  setAutoRotate(false);
                }}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
                  viewPreset === preset.id
                    ? "bg-ivory text-charcoal font-semibold"
                    : "text-ivory/75 hover:text-bronze"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-bronze hover:text-ivory transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{autoRotate ? "Pause Orbit" : "Auto Orbit"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
