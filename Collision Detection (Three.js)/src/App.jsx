import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const App = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    // black cube
    const blackCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const blackCubeMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    const blackCube = new THREE.Mesh(blackCubeGeometry, blackCubeMaterial);

    // Adding bounding box to black cube
    const blackCubeBB = new THREE.Box3(
      new THREE.Vector3(),
      new THREE.Vector3()
    );
    blackCubeBB.setFromObject(blackCube);
    blackCube.position.set(0, 0, 0);
    scene.add(blackCube);

    // Red cube
    const redCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const redCubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const redCube = new THREE.Mesh(redCubeGeometry, redCubeMaterial);

    // Adding bounding box to black cube
    const redCubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    redCubeBB.setFromObject(redCube);
    redCube.position.set(2, 0, 0); // set position different from black cube
    scene.add(redCube);

    // Adding event listener to keyPressed event and changing position of red cube
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode == 38) {
        // up
        redCube.position.z -= 1;
      } else if (keyCode == 40) {
        // down
        redCube.position.z += 1;
      } else if (keyCode == 37) {
        // left
        redCube.position.x -= 1;
      } else if (keyCode == 39) {
        // right
        redCube.position.x += 1;
      }
    }

    // Position the camera for a bird's eye view on top and behind the green cube
    camera.position.set(0, 3, 5); // Adjust the camera height (Y position) and distance (Z position) from the black cube
    camera.lookAt(0, 0, 0);

    function checkCollison() {
      if (redCubeBB.intersectsBox(blackCubeBB)) {
        blackCube.material.transparent = true;
        blackCube.material.opacity = 0.5;
        blackCube.material.color = new THREE.Color(Math.random * 0xffffff);
      } else {
        blackCube.material.opacity = 1;
      }
    }

    const animate = () => {
      redCubeBB
        .copy(redCube.geometry.boundingBox)
        .applyMatrix4(redCube.matrixWorld);
      checkCollison();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up Three.js objects and free up memory
      renderer.dispose();
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default App;
