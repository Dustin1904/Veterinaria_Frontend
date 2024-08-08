import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logoDog from "@assets/dog-hand.webp";
import Alertas from "@components/Alertas";
import { useParams } from "react-router-dom";

export const NuevoPassword = () => {
	const { token } = useParams();

	const navigate = useNavigate();
	const [alerta, setAlerta] = useState({});

	const [form, setForm] = useState({
		password: "",
		confirmPassword: "",
	});
	

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `${
				import.meta.env.VITE_BACKEND_URL
			}/nuevo-password/${token}`;
			const respuesta = await axios.post(url, form);
			setForm({});
			setAlerta({ respuesta: respuesta.data.res, exito: true });
			setTimeout(() => {
				navigate("/login");
			}, 5000);
			
		} catch (error) {
			setAlerta({ respuesta: error.response.data.res, exito: false });
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			{alerta.respuesta && (
				<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
			)}
			<h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500 mt-4">
				Welcome again
			</h1>
			<small className="text-gray-400 block my-4 text-sm">
				Please enter your details
			</small>
			<img
				className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
				src={logoDog}
				alt="image description"
			/>

			<form className="w-full" onSubmit={handleSubmit}>
				<div className="mb-1">
					<label className="mb-2 block text-sm font-semibold">
						Password
					</label>
					<input
						type="password"
						placeholder="Enter your password"
						className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
						value={form.password || ""}
						name="password"
						onChange={handleChange}
					/>
					<label className="mb-2 block text-sm font-semibold">
						Confirm password
					</label>
					<input
						type="password"
						placeholder="Repeat your password"
						className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
						value={form.confirmPassword || ""}
						name="confirmPassword"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
						Send
					</button>
				</div>
			</form>
		</div>
	);
};
