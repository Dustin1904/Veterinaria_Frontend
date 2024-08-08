import { useContext } from "react";
import { Forbidden } from "@pages/Forbidden";
import { AuthContext } from "@context/AuthProvider";

export default function PrivateRouteWithRole({ children }) {
	const { auth } = useContext(AuthContext);

	if (auth.rol !== "veterinario") return <Forbidden />;
	else return children;
}
