import { Route, Routes } from "react-router-dom"
import { ApplicationViews } from "./views/ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Navbar } from "./nav/Navbar"
import { Authorized} from "./views/Authorized"


export const Nutshell = () => {
  
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
			
					<Navbar />
					<ApplicationViews />
					         
			</Authorized>
		} />
	</Routes>
}
