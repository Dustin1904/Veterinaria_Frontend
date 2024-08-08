import { useParams } from "react-router-dom";
import axios from "axios";
import ModalTratamiento from "@components/modals/ModalTratamiento";
import Alertas from "@components/Alertas";
import { useEffect, useContext, useState } from "react";
import TratamientosContext from "@context/TratamientosProvider";
import TablaTratamientos from "@components/TablaTratamientos";
import { AuthContext } from "@context/AuthProvider";

const Visualizar = () => {
	const { id } = useParams();
	const [paciente, setPaciente] = useState({});
	const [alerta, setAlerta] = useState({});
	const { auth } = useContext(AuthContext);

	const {
		modal,
		handleModal,
		tratamientos,
		setTratamientos,
		alertaTratamiento,
		setDataModal,
	} = useContext(TratamientosContext);

	const formatearFecha = (fecha) => {
		const nuevaFecha = new Date(fecha);
		nuevaFecha.setMinutes(
			nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
		);
		return new Intl.DateTimeFormat("es-EC", { dateStyle: "long" }).format(
			nuevaFecha
		);
	};

	useEffect(() => {
		const consultarPaciente = async () => {
			try {
				const respuesta = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/paciente/${id}`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);

				setPaciente(respuesta.data.paciente);
				setTratamientos(respuesta.data.tratamientos);
			} catch (error) {
				setAlerta({ respuesta: error.response.data.res, exito: false });
			}
		};
		consultarPaciente();
	}, [tratamientos]);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
			{paciente._id ? (
				<>
					<div className="m-5 flex justify-between">
						<div>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Nombre del paciente:{" "}
								</span>
								{paciente.nombre}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Nombre del propietario:{" "}
								</span>
								{paciente.propietario}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Email:{" "}
								</span>
								{paciente.email}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Fecha de atención:{" "}
								</span>
								{formatearFecha(paciente.ingreso)}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Fecha de salida:{" "}
								</span>
								{formatearFecha(paciente.salida)}
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Estado:{" "}
								</span>
								<span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
									{paciente.estado && "activo"}
								</span>
							</p>
							<p className="text-md text-gray-00 mt-4">
								<span className="text-gray-600 uppercase font-bold">
									* Síntomas:{" "}
								</span>
								{paciente.sintomas}
							</p>
						</div>
						<div>
							<img
								src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png"
								alt="dogandcat"
								className="h-80 w-80"
							/>
						</div>
					</div>
					<hr className="my-4" />
					<div className="flex justify-between items-center">
						<p>
							Este submódulo te permite visualizar los
							tratamientos del paciente
						</p>
						{auth.rol === "veterinario" && (
							<button
								className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
								onClick={() => {
									setDataModal({});
									handleModal();
								}}
							>
								Registrar
							</button>
						)}
					</div>

					{modal && <ModalTratamiento idPaciente={paciente._id} />}

					{tratamientos.length === 0 ? (
						<Alertas exito={true}>No existen registros</Alertas>
					) : (
						<>
							{alertaTratamiento.respuesta && (
								<Alertas exito={alertaTratamiento.exito}>
									{alertaTratamiento.respuesta}
								</Alertas>
							)}
							<TablaTratamientos
								tratamientos={tratamientos}
								idPaciente={paciente._id}
							/>
						</>
					)}
				</>
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default Visualizar;
