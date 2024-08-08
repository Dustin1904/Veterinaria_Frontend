import axios from "axios";

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	const perfil = async (token) => {
		try {
			const decode = JSON.parse(atob(token.split(".")[1]));
			const response = await axios.get(
				decode.rol === "veterinario"
					? `${import.meta.env.VITE_BACKEND_URL}/perfil`
					: `${import.meta.env.VITE_BACKEND_URL}/paciente/perfil`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setAuth(response.data);
		} catch (error) {
			localStorage.removeItem("token");
		}
	};

	const actualizarPerfil = async (datos) => {
		const token = localStorage.getItem("token");
		try {
			const respuesta = await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`,
				datos,
				{
					headers: {
						method: "PUT",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			perfil(token);
			return { respuesta: respuesta.data.res, exito: true };
		} catch (error) {
			return { respuesta: error.response.data.res, exito: false };
		}
	};

	const actualizarPassword = async (datos) => {
		try {
			const respuesta = await axios.put(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/veterinario/actualizarpassword`,
				datos,
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
			return { respuesta: respuesta.data.res, exito: true };
		} catch (error) {
			return { respuesta: error.response.data.res, exito: false };
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) perfil(token);
	}, []);

	return (
		<AuthContext.Provider
			value={{ auth, setAuth, actualizarPerfil, actualizarPassword }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
