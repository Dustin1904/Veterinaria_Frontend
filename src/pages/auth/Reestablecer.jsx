import logoDog from "@assets/dog-hand.webp";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Alertas from "@components/Alertas";

export const Reestablecer = () => {
	const { token } = useParams();

	const [alerta, setAlerta] = useState({});
	const [tokenBack, setTokenBack] = useState("");

	const verifyToken = async () => {
		try {
			const response = await axios.get(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/recuperar-password/${token}`
			);

			setAlerta({ respuesta: response.data.res, exito: true });
			setTokenBack("/nuevo-password/" + token);
		} catch (error) {
			setAlerta({ respuesta: error.response.data.res, exito: false });
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			{alerta.respuesta && (
				<Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
			)}
			<img
				className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600 mt-4"
				src={logoDog}
				alt="image description"
			/>

			<div className="flex flex-col items-center justify-center">
				<p className="md:text-lg lg:text-xl text-gray-600 mt-8">
					Ya puedes recuperar tu contraseña
				</p>
				<Link
					to={tokenBack}
					className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
				>
					Recuperar contraseña
				</Link>
			</div>
		</div>
	);
};
