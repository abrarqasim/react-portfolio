import emailjs from "@emailjs/browser";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import kittyGif from "../assets/3d/kitty.gif";

// import { Fox } from "../models";
// import { Cat } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const { alert, showAlert, hideAlert } = useAlert();
	const [loading, setLoading] = useState(false);
	const [currentAnimation, setCurrentAnimation] = useState("idle");

	const handleChange = ({ target: { name, value } }) => {
		setForm({ ...form, [name]: value });
	};

	const handleFocus = () => setCurrentAnimation("walk");
	const handleBlur = () => setCurrentAnimation("idle");

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setCurrentAnimation("hit");

		emailjs
			.send(
				import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: "Abrar Qasim",
					from_email: form.email,
					to_email: "iam@abrarqasim.com",
					message: form.message,
				},
				import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
			)
			.then(
				() => {
					setLoading(false);
					showAlert({
						show: true,
						text: "Thank you for your message 😃",
						type: "success",
					});

					setTimeout(() => {
						hideAlert(false);
						setCurrentAnimation("idle");
						setForm({
							name: "",
							email: "",
							message: "",
						});
					}, [3000]);
				},
				(error) => {
					setLoading(false);
					console.error(error);
					setCurrentAnimation("idle");

					showAlert({
						show: true,
						text: "I didn't receive your message 😢",
						type: "danger",
					});
				}
			);
	};

	const CameraLogger = () => {
		const { camera } = useThree();

		useFrame(() => {
			console.log("Camera position:", camera.position);
			console.log("Camera zoom:", camera.zoom);
		});

		return null;
	};
	const cameraRef = useRef();
	return (
		<section className="relative flex lg:flex-row flex-col max-container">
			{alert.show && <Alert {...alert} />}

			<div className="flex-1 min-w-[50%] flex flex-col">
				<h1 className="head-text">Get in Touch</h1>

				<form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-7 mt-14">
					<label className="text-black-500 font-semibold">
						Name
						<input
							type="text"
							name="name"
							className="input"
							placeholder="Write your name here..."
							required
							value={form.name}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<label className="text-black-500 font-semibold">
						Email
						<input
							type="email"
							name="email"
							className="input"
							placeholder="Write your email here..."
							required
							value={form.email}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<label className="text-black-500 font-semibold">
						Phone
						<input
							type="phone"
							name="phone"
							className="input"
							placeholder="Write your contact number here..."
							required
							value={form.phone}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>
					<label className="text-black-500 font-semibold">
						Your Message
						<textarea
							name="message"
							rows="4"
							className="textarea"
							placeholder="Write your message here..."
							value={form.message}
							onChange={handleChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
					</label>

					<button type="submit" disabled={loading} className="btn" onFocus={handleFocus} onBlur={handleBlur}>
						{loading ? "Sending..." : "Submit"}
					</button>
				</form>
			</div>

			<div className="flex h-[350px] items-center lg:h-auto lg:w-1/2 md:h-[550px] w-full">
				{/* <Canvas
					camera={{
						position: [-0.0002925112562671341, -0.00029919160057321, 0.000025024663793327748],
						fov: 75,
						near: 0.1,
						far: 1000,
						zoom: 1,
					}}
				>
					<directionalLight position={[0, 0, 1]} intensity={2.5} />
					<ambientLight intensity={1} />
					<pointLight position={[5, 10, 0]} intensity={2} />
					<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} /> */}
				{/* <Suspense fallback={<Loader />}> */}
				{/* <Cat currentAnimation={currentAnimation} position={[0.5, 0.35, 0]} rotation={[12.929, -0.6, 0]} scale={[0.5, 0.5, 0.5]} /> */}
				<img src={kittyGif} alt="kitty-abrarqasim" className="h-1/2" />
				{/* </Suspense> */}
				{/* <CameraLogger /> */}
				{/* </Canvas> */}
			</div>
		</section>
	);
};

export default Contact;
