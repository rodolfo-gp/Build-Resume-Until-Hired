import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// Additional Components
import Footer from "./components/Footer";

// Importing Pages
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import CoverLetter from "./pages/CoverLetter";
import Resume from "./pages/Resume";
import SignupPage from "./pages/SignupPage";
import Output from "./pages/Output";
import Viewsaved from "./pages/Viewsaved";
import { UserProvider } from "./context/UserContext";

import "./App.css";

localStorage.setItem("url", "https://api.bru-h.xyz")

// Constants
const textAreaRow = "4";
const textAreaCol = "50";

function App() {
	return (
	<UserProvider>
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Loginpage />} />
				<Route path="/Login" element={<Loginpage />} />
				<Route path="/View" element={<Viewsaved />} />
				<Route path="/Signup" element={<SignupPage />} />
				<Route path="/Homepage" element={<Homepage />} />
				<Route path="/Output" element={<Output />} />
				<Route
					path="/Cover_Letter"
					element={<CoverLetter row={textAreaRow} col={textAreaCol} />}
				/>
				<Route
					path="/Resume"
					element={<Resume row={textAreaRow} col={textAreaCol} />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	</UserProvider>
	);
}

export default App;
