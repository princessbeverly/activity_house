import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextureLoader } from 'three'; 

// Scene setup
const scene = new THREE.Scene();

// House group
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
    new THREE.TorusGeometry(4, 2.5, 10),
    new THREE.MeshStandardMaterial({ color: 0xdeb485 }) // Corrected: Use 0x for hex color
);
// Position the torus
walls.position.y = 1.25;

// Rotate the torus to lie flat
walls.rotation.x = Math.PI / 2;

// Add the torus to the house group
house.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(8, 2.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x88572f }) // Corrected: Use 0x for hex color
)

roof.rotation.y = Math.PI / 0.25;
roof.position.y = 4 + 0.5
house.add(roof)

const roof2 = new THREE.Mesh(
    new THREE.ConeGeometry(4, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0x88572f }) // Corrected: Use 0x for hex color
)

roof2.rotation.y = Math.PI / 0.25;
roof2.position.y = 2
roof2.position.z = 6.5
house.add(roof2)



const doorGeometry = new THREE.BoxGeometry(2, 2, 2); // Add depth for thickness
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x88572f });

const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.y = 1;
door.position.z = 6.5;
house.add(door);

const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 1, 8)
house.add(doorLight)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89a854' }); // Example valid color

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(6, 0.2, 6)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(6.5, 0.1, 6.5)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.9, 0.9, 0.9);
bush3.position.set(7.2, 0.2, 7.4)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(8, 0.05, 7.4)

house.add(bush1, bush2, bush3, bush4);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.5, 0.5, 0.5);
bush5.position.set(6.5, 0.2, 2)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial);
bush6.scale.set(0.25, 0.25, 0.25);
bush6.position.set(6, 0.1, 2)

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial);
bush7.scale.set(0.9, 0.9, 0.9);
bush7.position.set(8, 0.2, 2)

const bush8 = new THREE.Mesh(bushGeometry, bushMaterial);
bush8.scale.set(0.15, 0.15, 0.15);
bush8.position.set(7.2, 0.05, 2)

house.add(bush5, bush6, bush7, bush8);

const bubblesGeometry = new THREE.SphereGeometry(1, 5, 5);
const bubbleMaterial = new THREE.MeshStandardMaterial({ color: '#89a854' });

// Create a group to hold all the bubbles
const bubblesGroup = new THREE.Group();

// Generate 50 bubbles
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const bubble = new THREE.Mesh(bubblesGeometry, bubbleMaterial);
    bubble.position.set(x, 0.3, z);

    // Apply random rotations
    bubble.rotation.z = (Math.random() - 0.5) * 0.4;
    bubble.rotation.y = (Math.random() - 0.5) * 0.4;

    // Add the bubble to the group
    bubblesGroup.add(bubble);
}

// Add the bubbles group to the scene
scene.add(bubblesGroup);




// Add a plane as the base

const textureLoader = new TextureLoader(); // Create an instance of TextureLoader
const grassColorTexture = textureLoader.load('./texturegrass.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('./texturegrass.jpg');

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20), // Base size
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        roughness: 0.5,
        metalness: 0.5,
        displacementMap: grassColorTexture,
        displacementScale: 0.05,
     }) // Light gray color
);

// Add the UV2 attribute for the aoMap
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));

// Rotate and position the floor
floor.rotation.x = -Math.PI / 2; // Rotate to horizontal
floor.position.y = 0; // Position it at the bottom
floor.receiveShadow = true; // Allow it to receive shadows

scene.add(floor);

// Sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};


const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
scene.add(ambientLight, moonLight);

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.set(15, 3, 15);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.setClearColor('#262837')

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth damping effect

// Update on window resize
window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);

    controls.update(); // Update controls for damping effect
    renderer.render(scene, camera);
};
animate();
