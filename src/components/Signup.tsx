/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const validateUsername = (username: string) =>
		/^[a-zA-Z]{4,}$/.test(username);
	const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
	const validatePassword = (password: string) =>
		/[!@#$%^&*(),.?":{}|<>A^Za^z]/.test(password);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateUsername(username)) {
			setErrorMessage("Username not valid");
			return;
		}

		if (!validateEmail(email)) {
			setErrorMessage("Email not valid");
			return;
		}

		if (!validatePassword(password)) {
			setErrorMessage("Password not valid");
			return;
		}

		Swal.fire({
			icon: "success",
			title: "Account created!",
			text: "Your account has been successfully created.",
		});
		await addDataToFirestore(username, email, password);

		// Reset form
		setUsername("");
		setEmail("");
		setPassword("");
		setErrorMessage("");
	};
	const addDataToFirestore = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			const userDocRef = doc(db, "users", username);

			// Set the document data with the specified ID
			await setDoc(userDocRef, { username, email, password });
			console.log("Document written with ID: ", username);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return (
		<div
			className="h-screen bg-cover bg-center flex flex-col justify-center items-center p-4 sm:p-8"
			style={{ backgroundImage: 'url("/Welcome-screen.jpeg")' }}
		>
			<h1 className="text-white text-3xl sm:text-4xl font-bold mb-6 text-center">
				Sign Up
			</h1>
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
			>
				{errorMessage && (
					<p className="text-red-500 mb-4 text-center">{errorMessage}</p>
				)}
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Username
					</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your username"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your email"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
						placeholder="Enter your password"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
				>
					Sign up
				</button>

				<div className="text-center w-full mt-5">
					<h3 className="text-black/60 text-sm">
						Already have account?
						<Link
							to="/login"
							className="text-black underline underline-offset-1"
						>
							{" "}
							Login
						</Link>
					</h3>
				</div>
			</form>
		</div>
	);
};

export default Signup;
