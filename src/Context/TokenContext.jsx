/** @format */

import { useEffect } from "react";
import { createContext, useState } from 'react'
export const tokenContext = createContext()
export function TokenContextProvider({ children }) {
	const [token, setToken] = useState(null);
	useEffect(() => {
		if (localStorage.getItem("userToken")) {
			setToken(localStorage.getItem("userToken"));
		}
	}, []);

	return (
		<tokenContext.Provider value={{ token, setToken }}>
			{children}
		</tokenContext.Provider>
	);
}
