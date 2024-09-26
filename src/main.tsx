import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SidebarProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SidebarProvider>
	</StrictMode>,
);
