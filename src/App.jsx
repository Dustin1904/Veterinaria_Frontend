import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@layouts/Auth";
import { LandinPage } from "@pages/LandinPage";
import { Register } from "@pages/auth/Register";
import Login from "@pages/auth/Login";
import { Forgot } from "@pages/auth/Forgot";
import { Confirmar } from "@pages/auth/Confirmar";
import { Reestablecer } from "@pages/auth/Reestablecer";
import { NuevoPassword } from "@pages/auth/NuevoPassword";

import { NotFound } from "@pages/NotFound";
import Dashboard from "@layouts/Dashboard";
import Listar from "@pages/Listar";
import Visualizar from "@pages/Visualizar";
import Crear from "@pages/Crear";
import Actualizar from "@pages/Actualizar";
import Perfil from "@pages/Perfil";

import { AuthProvider } from "@context/AuthProvider";
import { PrivateRoute } from "@routes/PrivateRoutes";
import { TratamientosProvider } from "@context/TratamientosProvider";
import Chat from "@pages/Chat";
import PrivateRouteWithRole from "@routes/PrivateRouteWithRole";

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route index element={<LandinPage />} />

						<Route path="/" element={<Auth />}>
							<Route index path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route path="forgot/:id" element={<Forgot />} />
							<Route
								path="confirmar/:token"
								element={<Confirmar />}
							/>
							<Route
								path="recuperar-password/:token"
								element={<Reestablecer />}
							/>
							<Route
								path="nuevo-password/:token"
								element={<NuevoPassword />}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>

						<Route
							path="dashboard/*"
							element={
								<TratamientosProvider>
									<PrivateRoute>
										<Routes>
											<Route element={<Dashboard />}>
												<Route
													index
													element={<Perfil />}
												/>
												<Route
													path="listar"
													element={<Listar />}
												/>
												<Route
													path="visualizar/:id"
													element={<Visualizar />}
												/>
												<Route
													path="crear"
													element={
														<PrivateRouteWithRole>
															<Crear />
														</PrivateRouteWithRole>
													}
												/>
												<Route
													path="actualizar/:id"
													element={<Actualizar />}
												/>
												<Route
													path="chat"
													element={<Chat />}
												/>
											</Route>
										</Routes>
									</PrivateRoute>
								</TratamientosProvider>
							}
						/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
