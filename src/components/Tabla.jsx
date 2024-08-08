import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

const Tabla = () => {
	const [pacientes, setPacientes] = useState([]);
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);

	const listarPacientes = async () => {
		try {
			const respuesta = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/pacientes`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setPacientes(respuesta.data, ...pacientes);
			
		} catch (error) {}
	};

	useEffect(() => {
		listarPacientes();
	}, []);

	const handleDelete = async (id) => {
		try {
			if (
				confirm(
					"Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?"
				)
			) {
				await axios.delete(
					`${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
						data: {
							salida: new Date().toString(),
						},
					}
				);
				listarPacientes();
			}
		} catch (error) {}
	};

	return (
		<>
			{pacientes.length == 0 ? (
				<Alertas exito={true}>No existen registros</Alertas>
			) : (
				<table className="w-full mt-5 table-auto shadow-lg  bg-white">
					<thead className="bg-gray-800 text-slate-400">
						<tr>
							<th className="p-2">N°</th>
							<th className="p-2">Nombre</th>
							<th className="p-2">Propietario</th>
							<th className="p-2">Email</th>
							<th className="p-2">Celular</th>
							<th className="p-2">Estado</th>
							<th className="p-2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{pacientes.map((paciente, index) => (
							<tr
								className="border-b hover:bg-gray-300 text-center"
								key={paciente._id}
							>
								<td>{index + 1}</td>
								<td>{paciente.nombre}</td>
								<td>{paciente.propietario}</td>
								<td>{paciente.email}</td>
								<td>{paciente.celular}</td>
								<td>
									<span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
										{paciente.estado && "activo"}
									</span>
								</td>
								<td className="py-2 text-center">
									<MdInfo
										className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
										onClick={() =>
											navigate(
												`/dashboard/visualizar/${paciente._id}`
											)
										}
									/>

									{auth.rol === "veterinario" && (
										<>
											<MdNoteAdd
												className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
												onClick={() =>
													navigate(
														`/dashboard/actualizar/${paciente._id}`
													)
												}
											/>

											<MdDeleteForever
												className="h-7 w-7 text-red-900 cursor-pointer inline-block"
												onClick={() =>
													handleDelete(paciente._id)
												}
											/>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Tabla;
