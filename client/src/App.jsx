import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Main from "./components/Main";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/404";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
	return (
		<div>
			<Router>
				<Header />
				<div>
					<ErrorBoundary>
						<Routes>
							{/* prettier-ignore */}
							<Route exact path="/" element={""}>'this'</Route>
							{/* prettier-ignore */}
							<Route exact path="/about" element={<About />} ></Route>
							{/* prettier-ignore */}
							<Route exact path="/keepit" element={<Main />} ></Route>
							{/* prettier-ignore */}
							<Route exact path="/register" element={<Register />} ></Route>
							{/* prettier-ignore */}
							<Route exact path="/Profile" element={<Profile />} ></Route>
							{/* prettier-ignore */}
							<Route exact path="/*" element={<NotFound />} ></Route>
						</Routes>
					</ErrorBoundary>
				</div>
			</Router>
			{/* <Footer /> */}
		</div>
	);
}
