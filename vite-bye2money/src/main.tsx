import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/colors.css";
import App from "./App.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ComponentTestPage from "./pages/ComponentTestPage.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/component-test" element={<ComponentTestPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
