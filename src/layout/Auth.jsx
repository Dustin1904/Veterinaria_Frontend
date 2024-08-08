import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Auth = () => {
	const autenticado = localStorage.getItem("token");

	return (
		<main className="flex justify-center w-full min-h-screen">
			{autenticado ? <Navigate to="/dashboard" /> : <Outlet />}
		</main>
	);
};

export default Auth;
