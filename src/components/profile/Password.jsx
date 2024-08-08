import { useState } from "react";
import Alertas from "@components/Alertas";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

const Password = () => {
	const { actualizarPassword } = useContext(AuthContext);

	const [form, setForm] = useState({
		password: "",
		newPassword: "",
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
		if (Object.values(form).includes("")) {
			setAlerta({
				respuesta: "Todos los campos deben ser ingresados",
				exito: false,
			});
			setTimeout(() => {
				setAlerta({});
			}, 5000);
			return;
		}

		if (form.newPassword.length < 6) {
			setAlerta({
				respuesta: "El password debe tener mínimo 6 carácteres",
				exito: false,
			});
			setTimeout(() => {
				setAlerta({});
			}, 5000);
			return;
		}

		const resultado = await actualizarPassword(form);
		setAlerta(resultado);
		setTimeout(() => {
			setAlerta({});
		}, 5000);
	};

	return (
		<>
			<div className="mt-5">
				<h1 className="font-black text-4xl text-gray-500">Password</h1>
				<hr className="my-4" />
				<p className="mb-2">
					Este módulo te permite izar el password del usuario
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				{alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)}

				<div>
					<label
						htmlFor="password"
						className="text-gray-700 uppercase font-bold text-sm"
					>
						Password Actual:{" "}
					</label>
					<input
						id="password"
						type="password"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
						placeholder="**************"
						name="password"
						value={form.password}
						onChange={handleChange}
					/>
				</div>

				<div>
					<label
						htmlFor="newPassword"
						className="text-gray-700 uppercase font-bold text-sm"
					>
						Nuevo password:{" "}
					</label>
					<input
						id="newPassword"
						type="password"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
						placeholder="**************"
						name="newPassword"
						value={form.newPassword}
						onChange={handleChange}
					/>
				</div>

				<input
					type="submit"
					className="bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all"
					value="Actualizar"
				/>
			</form>
		</>
	);
};

export default Password;
