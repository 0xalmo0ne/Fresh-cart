/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import { TokenContextProvider } from "./Context/TokenContext.jsx";
import CartContextprovider from "./Context/cartContext.jsx/";

createRoot(document.getElementById("root")).render(
	<TokenContextProvider>
		<CartContextprovider>
			<StrictMode>
				<App />
			</StrictMode>
		</CartContextprovider>
	</TokenContextProvider>
);
