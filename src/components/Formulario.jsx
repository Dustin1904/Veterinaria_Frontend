import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

export const Formulario = ({ paciente }) => {
	const navigate = useNavigate();

	const [alerta, setAlerta] = useState({});
	const { auth } = useContext(AuthContext);

	const [form, setform] = useState({
		nombre: paciente?.nombre ?? "",
		propietario: paciente?.propietario ?? "",
		email: paciente?.email ?? "",
		celular: paciente?.celular ?? "",
		salida:
			new Date(paciente?.salida).toLocaleDateString("en-CA", {
				timeZone: "UTC",
			}) ?? "",
		convencional: paciente?.convencional ?? "",
		sintomas: paciente?.sintomas ?? "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (paciente?._id) {
			const response = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/paciente/${paciente?._id}`,
				form,
				{
					headers: {
						method: "PUT",
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			navigate("/dashboard/listar");
		} else {
			try {
				form.id = auth._id;
				await axios.post(
					`${import.meta.env.VITE_BACKEND_URL}/pacientes/registro`,
					form,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
				setAlerta({
					respuesta: "Paciente registrado con exito y correo enviado",
					exito: true,
				});
				setTimeout(() => {
					navigate("/dashboard/listar");
				}, 5000);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
				setTimeout(() => {
					setAlerta({});
				}, 5000);
			}
		}
	};

	const handleChange = (e) => {
		setform({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="nombre:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Nombre de la mascota:
				</label>
				<input
					id="nombre"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="nombre de la mascota"
					name="nombre"
					onChange={handleChange}
					value={form.nombre}
				/>
			</div>
			<div>
				<label
					htmlFor="propietario:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Nombre del propietario:
				</label>
				<input
					id="propietario"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="nombre del propietario"
					name="propietario"
					onChange={handleChange}
					value={form.propietario}
				/>
			</div>
			<div>
				<label
					htmlFor="email:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Email:
				</label>
				<input
					id="email"
					type="email"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="email del propietario"
					name="email"
					onChange={handleChange}
					value={form.email}
				/>
			</div>
			<div>
				<label
					htmlFor="celular:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Celular:
				</label>
				<input
					id="celular"
					type="number"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="celular del propietario"
					name="celular"
					onChange={handleChange}
					value={form.celular}
				/>
			</div>
			<div>
				<label
					htmlFor="convencional:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Convencional:
				</label>
				<input
					id="convencional"
					type="number"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="convencional del propietario"
					name="convencional"
					onChange={handleChange}
					value={form.convencional}
				/>
			</div>
			<div>
				<label
					htmlFor="Salida:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Fecha de salida:
				</label>
				<input
					id="salida"
					type="date"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="salida"
					name="salida"
					onChange={handleChange}
					value={form.salida}
				/>
			</div>
			<div>
				<label
					htmlFor="sintomas:"
					className="text-gray-700 uppercase font-bold text-sm"
				>
					Síntomas:
				</label>
				<textarea
					id="sintomas"
					type="text"
					className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
					placeholder="Ingrese los síntomas de la mascota"
					name="sintomas"
					onChange={handleChange}
					value={form.sintomas}
				/>
			</div>
			{alerta.respuesta && (
				<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
			)}
			<input
				type="submit"
				className="bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all"
				value={
					paciente?._id ? "Actualizar paciente" : "Registrar paciente"
				}
			/>
		</form>
	);
};
