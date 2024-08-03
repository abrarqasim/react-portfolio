import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";

import scene from "../assets/3d/cat.glb";

export function Cat({ currentAnimation, ...props }) {
	const group = useRef();
	const { nodes, materials, animations } = useGLTF(scene);
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		Object.values(actions).forEach((action) => action.stop());

		if (actions[currentAnimation]) {
			actions[currentAnimation].play();
		}
	}, [actions, currentAnimation]);

	return (
		<>
			<group ref={group} {...props} dispose={null}>
				<group name="Sketchfab_Scene">
					<group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
						<group name="root">
							<group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
								<group name="Plane_0" scale={0.255}>
									<mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials["Material.001"]} />
								</group>
								<group name="rig_917">
									<group name="GLTF_created_0">
										<primitive object={nodes.GLTF_created_0_rootJoint} />
										<skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials["alb.001"]} skeleton={nodes.Object_9.skeleton} />
										<skinnedMesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials["alb.001"]} skeleton={nodes.Object_11.skeleton} />
										<skinnedMesh name="Object_13" geometry={nodes.Object_13.geometry} material={materials.Kitty_001_MI} skeleton={nodes.Object_13.skeleton} />
										<group name="ochi_1_914" />
										<group name="ochi_2_915" />
										<group name="pisica_916" />
									</group>
								</group>
							</group>
						</group>
					</group>
				</group>
			</group>
			<OrbitControls />
		</>
	);
}

useGLTF.preload(scene);
