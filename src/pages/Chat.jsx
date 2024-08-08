import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "@context/AuthProvider";
import { useContext } from "react";
import axios from "axios";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`.replace("/api", ""));

const Chat = () => {
	const [mensaje, setMensaje] = useState("");
	const [mensajes, setMensajes] = useState([]);
	const { auth } = useContext(AuthContext);

	const obtenerHistorial = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/chats`
			);
			setMensajes(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		obtenerHistorial();

		socket.on("recibir", (mensaje) =>
			setMensajes((state) => [...state, mensaje])
		);

		return () => socket.disconnect();
	}, [socket]);

	const handleMensajeChat = () => {
		setMensaje("");
		if (localStorage.getItem("token")) {
			setMensajes([
				...mensajes,
				{
					mensaje,
					emisor: auth._id,
					nombre: auth.nombre,
					rol: auth.rol,
					createdAt: new Date(),
				},
			]);
			socket.emit("enviar", {
				mensaje,
				emisor: auth._id,
				nombre: auth.nombre,
				rol: auth.rol,
			});
		}
	};

	return (
		<div className="flex flex-col justify-between min-h-[70vh]">
			<div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
				<div className="chat-message">
					{mensajes.map(
						({ mensaje, emisor, nombre, rol, createdAt }, index) =>
							emisor === auth._id ? (
								<div
									key={index}
									className="flex items-end justify-end my-2"
								>
									<div className="flex flex-col items-end">
										<span className="text-xs mr-2.5">
											{nombre}
										</span>
										<span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-700 text-white text-xs max-w-xs mx-2">
											{mensaje}
										</span>
										<span className="text-xs mr-2.5 mt-1 text-neutral-500">
											{new Date(
												createdAt
											).toLocaleString()}
										</span>
									</div>
									<img
										src={
											rol === "veterinario"
												? "https://cdn-icons-png.flaticon.com/512/2934/2934749.png"
												: "https://cdn-icons-png.flaticon.com/512/2105/2105138.png"
										}
										alt="Veterinarian profile"
										className="w-14 h-14 rounded-full order-2"
									/>
								</div>
							) : (
								<div
									className="flex items-end my-2"
									key={index}
								>
									<div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
										<div className="flex flex-col items-start">
											<span className="text-xs ml-1">
												{nombre}
											</span>
											<span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-300 text-gray-600">
												{mensaje}
											</span>
											<span className="text-xs ml-1 mt-1 text-neutral-500">
												{new Date(
													createdAt
												).toLocaleString()}
											</span>
										</div>
									</div>
									<img
										src={
											rol === "veterinario"
												? "https://cdn-icons-png.flaticon.com/512/2934/2934749.png"
												: "https://cdn-icons-png.flaticon.com/512/2105/2105138.png"
										}
										alt="Pacient profile"
										className="w-14 h-14 rounded-full order-1 "
									/>
								</div>
							)
					)}
				</div>
			</div>
			<div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
				<div className="relative flex">
					<input
						type="text"
						placeholder="Escribe tu mensaje!"
						className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
						value={mensaje}
						onChange={({ target }) => setMensaje(target.value)}
					/>

					<div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
						<button
							type="button"
							className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-green-800 hover:bg-green-600 focus:outline-none"
							onClick={() => handleMensajeChat()}
						>
							<span className="font-bold">Send</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;
