import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CommandEnvironment({ reducedMotion }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reducedMotion || window.matchMedia("(max-width: 760px)").matches) return undefined;

    let active = true;
    let disposeScene = () => {};

    async function boot() {
      const THREE = await import("three");
      if (!active || !mountRef.current) return;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x05070b, 0.034);

      const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 90);
      camera.position.set(0, 4.2, 13);

      const rig = new THREE.Group();
      scene.add(rig);

      const grid = new THREE.GridHelper(42, 42, 0x8e090b, 0x29313a);
      grid.position.y = -2.4;
      grid.material.transparent = true;
      grid.material.opacity = 0.42;
      rig.add(grid);

      const backGrid = new THREE.GridHelper(34, 24, 0xc0181c, 0x2d343e);
      backGrid.rotation.x = Math.PI / 2;
      backGrid.position.set(0, 5.8, -14);
      backGrid.material.transparent = true;
      backGrid.material.opacity = 0.16;
      rig.add(backGrid);

      const particles = new THREE.BufferGeometry();
      const particleCount = 170;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 28;
        positions[i * 3 + 1] = Math.random() * 10 - 1.8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }
      particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xb8c2cf,
        size: 0.035,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
      });
      const particleCloud = new THREE.Points(particles, particleMaterial);
      rig.add(particleCloud);

      const routeMaterial = new THREE.LineBasicMaterial({ color: 0xc0181c, transparent: true, opacity: 0.38 });
      const routeGroup = new THREE.Group();
      const routes = [
        [-9, -1.7, -6, -3, -0.4, 3, 6, 1.5, -2],
        [8, -1.4, -8, 2, 0.2, -2, -7, 1.4, 4],
        [-4, 2.2, -10, 0, 0.6, -1, 7, 2.4, 5],
        [10, 2.4, -2, 3, 1, 3, -8, 0.2, -5],
      ];
      routes.forEach((route) => {
        const points = [];
        for (let i = 0; i < route.length; i += 3) {
          points.push(new THREE.Vector3(route[i], route[i + 1], route[i + 2]));
        }
        routeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), routeMaterial));
      });
      rig.add(routeGroup);

      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xc0181c, transparent: true, opacity: 0.82 });
      const markerGroup = new THREE.Group();
      routes.flatMap((route) => route.filter((_, i) => i % 3 === 0).map((_, index) => route.slice(index * 3, index * 3 + 3))).forEach((point) => {
        if (point.length < 3) return;
        const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), markerMaterial);
        marker.position.set(point[0], point[1], point[2]);
        markerGroup.add(marker);
      });
      rig.add(markerGroup);

      const scanMaterial = new THREE.MeshBasicMaterial({
        color: 0x8e090b,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const scan = new THREE.Mesh(new THREE.PlaneGeometry(22, 0.36), scanMaterial);
      scan.rotation.x = -0.88;
      scan.position.set(0, 1.2, -4);
      rig.add(scan);

      const light = new THREE.PointLight(0xc0181c, 16, 30);
      light.position.set(-7, 6, 7);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x9aa7b6, 0.42));

      const state = {
        scene: 0,
        progress: 0,
        mouseX: 0,
        mouseY: 0,
        targetCamera: new THREE.Vector3(0, 4.2, 13),
        targetRig: new THREE.Vector3(0, 0, 0),
        targetRot: new THREE.Vector3(-0.08, 0, 0),
      };

      const sceneTargets = [
        { camera: [0, 4.2, 13], rig: [0, 0, 0], rot: [-0.08, 0.02, 0], fog: 0.034, route: 0.28 },
        { camera: [-2.6, 5.4, 10], rig: [0.4, -0.3, -1.4], rot: [-0.18, -0.18, 0.01], fog: 0.04, route: 0.72 },
        { camera: [2.8, 4.7, 11.2], rig: [-0.8, -0.2, 0.6], rot: [-0.1, 0.22, -0.02], fog: 0.032, route: 0.48 },
        { camera: [0.8, 3.2, 8.2], rig: [0, 0.2, 1.5], rot: [-0.02, -0.34, 0.02], fog: 0.027, route: 0.88 },
        { camera: [-3.2, 5.8, 12], rig: [0.6, -0.1, -0.4], rot: [-0.14, 0.28, 0], fog: 0.038, route: 0.58 },
        { camera: [3.5, 3.8, 9.5], rig: [-1.1, -0.5, 0], rot: [-0.06, -0.24, 0], fog: 0.036, route: 0.95 },
        { camera: [0, 5.7, 12.4], rig: [0, -0.6, -0.8], rot: [-0.22, 0, 0], fog: 0.033, route: 0.42 },
        { camera: [0, 4.1, 9], rig: [0, 0, 1.2], rot: [-0.04, 0, 0], fog: 0.045, route: 0.65 },
      ];

      const applyScene = (index, progress = 0) => {
        const target = sceneTargets[index] || sceneTargets[0];
        state.scene = index;
        state.progress = progress;
        state.targetCamera.set(target.camera[0] + progress * 1.2, target.camera[1] - progress * 0.45, target.camera[2] - progress * 2.2);
        state.targetRig.set(target.rig[0], target.rig[1], target.rig[2] - progress * 1.8);
        state.targetRot.set(target.rot[0], target.rot[1] + progress * 0.3, target.rot[2]);
        scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, target.fog, 0.08);
        routeMaterial.opacity = THREE.MathUtils.lerp(routeMaterial.opacity, target.route, 0.08);
      };

      const triggers = [
        ["#top", 0],
        ["#performance", 1],
        ["#capabilities", 2],
        ["#briefcase", 3],
        [".principles-section", 4],
        ["#process", 5],
        [".vendor-section", 6],
        ["#rfq", 7],
      ].map(([trigger, index]) => ScrollTrigger.create({
        trigger,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => applyScene(index, self.progress),
        onEnter: () => applyScene(index, 0),
        onEnterBack: () => applyScene(index, 1),
      }));

      function handleMouse(event) {
        state.mouseX = (event.clientX / window.innerWidth - 0.5) * 0.7;
        state.mouseY = (event.clientY / window.innerHeight - 0.5) * 0.45;
      }

      function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      window.addEventListener("mousemove", handleMouse);
      window.addEventListener("resize", handleResize);

      let frame;
      const clock = new THREE.Clock();
      function render() {
        const time = clock.getElapsedTime();
        grid.position.z = (time * 0.45 + state.progress * 6) % 2;
        backGrid.rotation.z = Math.sin(time * 0.08) * 0.04 + state.progress * 0.08;
        particleCloud.rotation.y = time * 0.012 + state.scene * 0.045;
        particleCloud.position.z = Math.sin(time * 0.2) * 0.4;
        markerGroup.children.forEach((marker, index) => {
          marker.rotation.x += 0.012;
          marker.rotation.y += 0.018;
          marker.scale.setScalar(1 + Math.sin(time * 1.8 + index) * 0.22);
        });
        scan.position.z = -8 + ((time * 1.2 + state.progress * 16) % 16);
        scanMaterial.opacity = 0.09 + Math.sin(time * 2.2) * 0.035;
        camera.position.lerp(state.targetCamera, 0.045);
        camera.position.x += state.mouseX * 0.035;
        camera.position.y += -state.mouseY * 0.025;
        rig.position.lerp(state.targetRig, 0.04);
        rig.rotation.x = THREE.MathUtils.lerp(rig.rotation.x, state.targetRot.x + state.mouseY * 0.05, 0.045);
        rig.rotation.y = THREE.MathUtils.lerp(rig.rotation.y, state.targetRot.y + state.mouseX * 0.05, 0.045);
        rig.rotation.z = THREE.MathUtils.lerp(rig.rotation.z, state.targetRot.z, 0.045);
        camera.lookAt(0, 0.5, -2);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      }
      render();

      disposeScene = () => {
        cancelAnimationFrame(frame);
        triggers.forEach((trigger) => trigger.kill());
        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
        renderer.dispose();
        particles.dispose();
        particleMaterial.dispose();
        routeMaterial.dispose();
        markerMaterial.dispose();
        scanMaterial.dispose();
      };
    }

    boot();

    return () => {
      active = false;
      disposeScene();
    };
  }, [reducedMotion]);

  return (
    <div className="command-environment" ref={mountRef} aria-hidden="true">
      <div className="env-noise" />
      <div className="env-scanlines" />
      <div className="env-vignette" />
    </div>
  );
}
