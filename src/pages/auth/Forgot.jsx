import { useState } from "react";
import { Link } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

export const Forgot = () => {
	const [email, setEmail] = useState("");
	const [alerta, setAlerta] = useState({});

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/recuperar-password`,
				{ email }
			);
			setAlerta({ respuesta: response.data.res, exito: true });
		} catch (error) {
			setAlerta({ respuesta: error.response.data.res, exito: false });
		}
	};

	return (
		<>
			<div className="bg-white flex flex-col justify-center items-center w-1/2">
				{alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)}
				<div className="md:w-4/5 sm:w-full mt-4">
					<h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
						Forgot your password!
					</h1>
					<small className="text-gray-400 block my-4 text-sm">
						Don't worry, please enter your details
					</small>

					<form onSubmit={handleSubmit}>
						<div className="mb-1">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="email"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								onChange={handleChange}
								value={email || ""}
								type="email"
								placeholder="Enter you email"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
								Send email
							</button>
						</div>
					</form>

					<div className="mt-5 text-xs border-b-2 py-4 "></div>

					<div className="mt-3 text-sm flex justify-between items-center">
						<p>You already remembered</p>
						<Link
							to="/login"
							className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
						>
							Login
						</Link>
					</div>
				</div>
			</div>

			<div
				className="w-1/2 h-screen bg-[url('/public/images/catforgot.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            "
			></div>
		</>
	);
};
