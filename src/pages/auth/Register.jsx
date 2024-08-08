import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "@components/Alertas.jsx";
import axios from "axios";

export const Register = () => {
	const [form, setForm] = useState({
		nombre: "",
		apellido: "",
		direccion: "",
		telefono: "",
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
				`${import.meta.env.VITE_BACKEND_URL}/registro`,
				form
			);

			setAlerta({ respuesta: response.data.res, exito: true });
		} catch (error) {
			setAlerta({
				respuesta:
					error.response.data.res || "Rellene todos los campos correctamente",
				exito: false,
			});
		}
	};

	return (
		<>
			<div className="bg-white flex justify-center items-center w-1/2 py-4">
				<div className="md:w-4/5 sm:w-full">
					{alerta.respuesta && (
						<Alerta exito={alerta.exito}>{alerta.respuesta}</Alerta>
					)}

					<h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">
						Bienvenido
					</h1>
					<small className="text-gray-400 block my-4 text-sm">
						Ingrese sus datos para registrarse
					</small>

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="nombre"
							>
								Nombre
							</label>
							<input
								required
								id="nombre"
								name="nombre"
								onChange={handleChange}
								value={form.nombre || ""}
								type="text"
								placeholder="Ingrese su nombre"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="apellido"
							>
								Apellido
							</label>
							<input
								required
								id="apellido"
								name="apellido"
								onChange={handleChange}
								value={form.apellido || ""}
								type="text"
								placeholder="Ingrese su apellido"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="direccion"
							>
								Dirección
							</label>
							<input
								required
								id="direccion"
								name="direccion"
								onChange={handleChange}
								value={form.direccion || ""}
								type="text"
								placeholder="Ingrese su dirección"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="direccion"
							>
								Teléfono
							</label>
							<input
								required
								id="telefono"
								name="telefono"
								onChange={handleChange}
								value={form.telefono || ""}
								type="tel"
								placeholder="Ingrese su dirección"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="email"
							>
								Correo electrónico
							</label>
							<input
								required
								id="email"
								name="email"
								onChange={handleChange}
								value={form.email || ""}
								type="email"
								placeholder="Ingrese su correo electrónico"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<label
								className="mb-2 block text-sm font-semibold"
								htmlFor="password"
							>
								Contraseña
							</label>
							<input
								required
								id="password"
								name="password"
								onChange={handleChange}
								value={form.password || ""}
								type="password"
								placeholder="Ingrese su contraseña"
								className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
							/>
						</div>

						<div className="mb-3">
							<button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
								Registrate
							</button>
						</div>
					</form>

					<div className="mt-5 text-xs border-b-2 py-4 "></div>

					<div className="mt-3 text-sm flex justify-between items-center">
						<p>¿Ya tienes una cuenta?</p>
						<Link
							to="/login"
							className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
						>
							Inicia sesión
						</Link>
					</div>
				</div>
			</div>

			<div
				className="w-1/2 min-h-screen bg-[url('/public/images/dogregister.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            "
			></div>
		</>
	);
};
