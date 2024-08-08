import React from "react";
import { CardPerfil } from "@components/profile/CardPerfil";
import { CardPerfilPaciente } from "@components/profile/CardPerfilPaciente";
import FormularioPerfil from "@components/profile/FormularioPerfil";
import Password from "@components/profile/Password";
import { useContext } from "react";
import { AuthContext } from "@context/AuthProvider";

const Perfil = () => {
	const { auth } = useContext(AuthContext);

	return (
		<>
			<div>
				<h1 className="font-black text-4xl text-gray-500">Perfil...</h1>
				<hr className="my-4" />
				<p className="mb-8">
					Este módulo te permite visualizar el perfil del
					usuario......
				</p>
			</div>

			{!auth.propietario ? (
				<div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
					<div className="w-full md:w-1/2">
						<FormularioPerfil />
						<Password />
					</div>
					<div className="w-full md:w-1/2">
						<CardPerfil />
					</div>
				</div>
			) : (
				<CardPerfilPaciente />
			)}
		</>
	);
};

export default Perfil;
