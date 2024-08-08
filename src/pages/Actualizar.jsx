import { Formulario } from "@components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

const Actualizar = () => {
	const { id } = useParams();
	const [paciente, setPaciente] = useState({});
	const [alerta, setAlerta] = useState({});

	useEffect(() => {
		const consultarPaciente = async () => {
			try {
				const response = await axios.get(
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
				setPaciente(response.data.paciente);
			} catch (error) {
				setAlerta({
					respuesta: `No existe un paciente con el id ${id}`,
					exito: false,
				});
			}
		};
		consultarPaciente();
	}, []);

	return (
		<div>
			<h1 className="font-black text-4xl text-gray-500">
				Actualizar Paciente
			</h1>
			<p className="mb-8 my-4">
				Este módulo te permite actualizar los datos de un paciente
				registrado
			</p>
			{paciente._id ? (
				<Formulario paciente={paciente} />
			) : (
				alerta.respuesta && (
					<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
				)
			)}
		</div>
	);
};

export default Actualizar;
