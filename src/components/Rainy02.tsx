import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Color, type InstancedMesh, type Mesh } from "three";
import { OrbitControls } from "@react-three/drei";
import styles from "./Rainy02.module.css";

const Plane = () => {
	const [ref] = usePlane(
		() => ({ rotation: [-Math.PI / 2, 0, 0] }),
		useRef<Mesh>(null),
	);
	return (
		<>
			<mesh ref={ref} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<shadowMaterial opacity={0.2} color="#1f1f1f" />
			</mesh>
		</>
	);
};

const Boxes = ({
	colors,
	number,
	size,
}: {
	colors: Float32Array;
	number: number;
	size: number;
}) => {
	const args: [number, number, number] = [size, size, size];
	const [ref, { at }] = useBox(
		() => ({
			args,
			mass: 1,
			position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
		}),
		useRef<InstancedMesh>(null),
	);

	useFrame(() =>
		at(Math.floor(Math.random() * number)).position.set(
			0,
			Math.random() * 5,
			0,
		),
	);

	return (
		<instancedMesh
			receiveShadow
			castShadow
			ref={ref}
			args={[undefined, undefined, number]}
		>
			<boxGeometry args={args}>
				<instancedBufferAttribute
					attach="attributes-color"
					args={[colors, 3]}
				/>
			</boxGeometry>
			<meshPhysicalMaterial vertexColors />
		</instancedMesh>
	);
};

const COLORS = [
	"rgb(107, 154, 159)",
	"rgb(134, 172, 207)",
	"rgb(137, 163, 177)",
	"rgb(165, 196, 207)",
	"rgb(169, 194, 192)",
	"rgb(231, 227, 228)",
] as const;

const Scene = ({
	colors,
	number,
	size,
	canvasColor,
}: {
	colors: Float32Array;
	number: number;
	size: number;
	canvasColor: string;
}) => {
	// const parseRGB = (rgb: string) => {
	//   const result = rgb.match(/\d+/g);
	//   if (result) {
	//     const [r, g, b] = result.map(Number);
	//     return new Color(r, g, b);
	//   }
	//   return new Color(1, 1, 1);
	// };

	return (
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
				<Plane />
				<Boxes {...{ colors, number, size }} />
			</Physics>
		</group>
	);
};

// const DAY_AND_NIGHT_COLORS = ["rgb(239, 239, 239)", "rgb(17, 32, 40)"] as const;

const Rainy02 = () => {
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
				className={styles.canvasContainer}
				camera={{ fov: 50, position: [0, 3, 6] }}
				style={{ backgroundColor: canvasColor }}
				shadows
			>
				<Scene
					colors={colors}
					number={number}
					size={size}
					canvasColor={canvasColor}
				/>
				<OrbitControls
					maxPolarAngle={Math.PI / 2}
					minDistance={1}
					maxDistance={8}
				/>
			</Canvas>
		</div>
	);
};

export default Rainy02;
