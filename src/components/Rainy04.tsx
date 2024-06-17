import type { PlaneProps, Triplet } from "@react-three/cannon";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { InstancedMesh, Mesh } from "three";
import {
	Color,
	Shape,
	ExtrudeGeometry,
	Object3D,
	InstancedBufferAttribute,
} from "three";
import { OrbitControls } from "@react-three/drei";
import styles from "./Rainy04.module.css";

const Plane = (props: PlaneProps) => {
	const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));
	return (
		<mesh ref={ref} receiveShadow>
			<planeGeometry args={[100, 100]} />
			<shadowMaterial color="#1f1f1f" opacity={0.2} />
		</mesh>
	);
};

type InstancedGeometryProps = {
	colors: Float32Array;
	number: number;
	size: number;
};

// Function to create a rounded box geometry
function createRoundedBoxGeometry(
	width: number,
	height: number,
	depth: number,
	radius: number,
	smoothness: number,
) {
	const shape = new Shape();

	const eps = 0.00001;
	const radius0 = radius - eps;
	shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
	shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
	shape.absarc(
		width - radius * 2,
		height - radius * 2,
		eps,
		Math.PI / 2,
		0,
		true,
	);
	shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

	const geometry = new ExtrudeGeometry(shape, {
		depth: depth - radius * 2,
		bevelEnabled: true,
		bevelSegments: smoothness,
		steps: 1,
		bevelSize: radius0,
		bevelThickness: radius0,
		curveSegments: smoothness,
	});

	geometry.center();

	return geometry;
}

function InstancedRoundedBoxes({
	colors,
	number,
	size,
}: InstancedGeometryProps) {
	const args: Triplet = [size, size, size];
	const [ref, { at }] = useBox(
		() => ({
			args,
			mass: 1,
			position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
		}),
		useRef<InstancedMesh>(null),
	);

	const geometry = createRoundedBoxGeometry(size, size, size, 0.05, 10);

	useFrame(() =>
		at(Math.floor(Math.random() * number)).position.set(
			0,
			Math.random() * 5,
			0,
		),
	);

	useEffect(() => {
		const mesh = ref.current;
		const dummy = new Object3D();
		if (mesh) {
			for (let i = 0; i < number; i++) {
				dummy.updateMatrix();
				mesh.setMatrixAt(i, dummy.matrix);
			}

			mesh.instanceMatrix.needsUpdate = true;
			geometry.setAttribute("color", new InstancedBufferAttribute(colors, 3));
		}
	}, [number, colors, geometry, ref.current]);

	return (
		<instancedMesh
			ref={ref}
			args={[geometry, undefined, number]}
			receiveShadow
			castShadow
		>
			<meshPhysicalMaterial vertexColors />
		</instancedMesh>
	);
}

const COLORS = [
	"rgb(107, 154, 159)",
	"rgb(134, 172, 207)",
	"rgb(137, 163, 177)",
	"rgb(165, 196, 207)",
	"rgb(169, 194, 192)",
	"rgb(231, 227, 228)",
] as const;

const Rainy04 = () => {
	const number = 150;
	const size = 0.2;
	const canvasColor = "rgb(239, 239, 239)";

	const colors = useMemo(() => {
		const array = new Float32Array(number * 3);
		const color = new Color();
		for (let i = 0; i < number; i++) {
			color.set(COLORS[Math.floor(Math.random() * 6)]).toArray(array, i * 3);
		}
		return array;
	}, []);

	return (
		<div className={styles.canvasDiv}>
			<Canvas
				camera={{ fov: 50, position: [0, 3, 6] }}
				shadows
				style={{ backgroundColor: canvasColor }}
			>
				<group position={[0, -2, 0]}>
					<ambientLight intensity={1} />
					<spotLight
						angle={0.5}
						castShadow
						decay={0}
						intensity={5}
						penumbra={1}
						position={[5, 10, 5]}
					/>
					<Physics broadphase="SAP">
						<Plane rotation={[-Math.PI / 2, 0, 0]} />
						<InstancedRoundedBoxes {...{ colors, number, size }} />
					</Physics>
				</group>
				<OrbitControls
					maxPolarAngle={Math.PI / 2}
					minDistance={5}
					maxDistance={15}
				/>
			</Canvas>
		</div>
	);
};

export default Rainy04;
