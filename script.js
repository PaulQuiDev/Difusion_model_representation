import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scène et caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Contrôles de la caméra
const controls = new OrbitControls(camera, canvas);

// Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const groupEncodeur = new THREE.Group();

// Renommage de la variable pour le trapèze
const trapezGeometry = new THREE.CylinderGeometry(2, 3, 5, 4);
const trapezMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 , transparent: true, opacity: 0.7});
const trapezMesh = new THREE.Mesh(trapezGeometry, trapezMaterial);
trapezMesh.rotation.x = Math.PI/4
trapezMesh.rotation.z = -Math.PI/2

groupEncodeur.add(trapezMesh);
trapezMesh.position.set(-3, 0, 0);

scene.add(groupEncodeur)

// Ajouter la rotation du trapèze avec les touches fléchées
// Ajouter la rotation du trapèze avec les touches fléchées et afficher dans la console
// Ajouter la rotation du trapèze avec les touches fléchées et afficher dans la console
window.addEventListener('keydown', (event) => {
    const rotationSpeed = Math.PI/15;
    switch (event.code) {
        case 'ArrowLeft':
            trapezMesh.rotation.y -= rotationSpeed;
            break;
        case 'ArrowRight':
            trapezMesh.rotation.y += rotationSpeed;
            break;
        case 'ArrowUp':
            trapezMesh.rotation.x -= rotationSpeed;
            break;
        case 'ArrowDown':
            trapezMesh.rotation.x += rotationSpeed;
            break;
        case 'KeyA': // Rotation sur l'axe Z (sens antihoraire)
            trapezMesh.rotation.z -= rotationSpeed;
            break;
        case 'KeyD': // Rotation sur l'axe Z (sens horaire)
            trapezMesh.rotation.z += rotationSpeed;
            break;
    }

    // Afficher la rotation actuelle du trapèze dans la console
    console.log(`Rotation du trapèze - x: ${trapezMesh.rotation.x.toFixed(2)}, y: ${trapezMesh.rotation.y.toFixed(2)}, z: ${trapezMesh.rotation.z.toFixed(2)}`);
});




// Transparent pink blocks (representing convolution filters)
const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
const blockMaterial = new THREE.MeshBasicMaterial({ color: 0xff00d0, transparent: true, opacity: 0.5 });

const blocks = [];
for (let i = 0; i < 3; i++) {
    const blockMesh = new THREE.Mesh(blockGeometry, blockMaterial);
    blockMesh.position.set(i * 2, 0, 0); // Position each block
    blocks.push(blockMesh);
    scene.add(blockMesh);
}

// Fonction d'animation
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

// Appeler la fonction d'animation
animate();

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
