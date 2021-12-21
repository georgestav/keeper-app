import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import ViewNotes from "./components/ViewNotes";

function App() {
	return (
		<div>
			<Header />
			<Main />
			<ViewNotes />
			<Footer />
		</div>
	);
}

export default App;
