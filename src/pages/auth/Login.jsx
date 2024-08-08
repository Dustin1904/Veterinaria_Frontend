import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import { useState } from "react";
import Alertas from "@components/Alertas";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
	const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [alerta, setAlerta] = useState({});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				!form.password.includes("vet")
					? `${import.meta.env.VITE_BACKEND_URL}/login`
					: `${import.meta.env.VITE_BACKEND_URL}/pacientes/login`,
				form
			);
			setAuth(response.data);

			setAlerta({ respuesta: response.data.res, exito: true });
			localStorage.setItem("token", response.data.token);
			navigate("/dashboard");
		} catch (error) {
			setAlerta({ respuesta: error.response.data.res, exito: false });
		}
	};

	return (
		<>
			<div
				className="w-1/2 min-h-screen bg-[url('/public/images/doglogin.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            "
			></div>

			<div className="w-1/2 min-h-screen bg-white flex justify-center items-center">
				<div className="md:w-4/5 sm:w-full">
					{alerta.respuesta && (
						<Alertas exito={alerta.exito}>
							{alerta.respuesta}
						</Alertas>
					)}

					<h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
						Welcome back
					</h1>
					<small className="text-gray-400 block my-4 text-sm">
						Welcome back! Please enter your details
					</small>

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="email"
							>
								Email
							</label>
							<input
								required
								id="email"
								name="email"
								onChange={handleChange}
								value={form.email || ""}
								type="email"
								placeholder="Enter you email"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="password"
							>
								Password
							</label>
							<input
								required
								id="password"
								name="password"
								onChange={handleChange}
								value={form.password || ""}
								type="password"
								placeholder="********************"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
							/>
						</div>

						<div className="my-4">
							<button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">
								Login
							</button>
						</div>
					</form>

					<div className="mt-6 grid grid-cols-3 items-center text-gray-400">
						<hr className="border-gray-400" />
						<p className="text-center text-sm">OR</p>
						<hr className="border-gray-400" />
					</div>

					<button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-black hover:text-white">
						<img
							className="w-5 mr-2"
							src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
						/>
						Sign in with Google
					</button>

					<button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-blue-600 hover:text-white">
						<img
							className="w-5 mr-2"
							src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
						/>
						Sign in with Google
					</button>

					<div className="mt-5 text-xs border-b-2 py-4 ">
						<Link
							to="/forgot/id"
							className="underline text-sm text-gray-400 hover:text-gray-900"
						>
							Forgot your password?
						</Link>
					</div>

					<div className="mt-3 text-sm flex justify-between items-center">
						<p>Don't have an account?</p>
						<Link
							to="/register"
							className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
						>
							Register
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
