/** @format */
import { createContext, useState } from "react";

export let ConterContext = createContext();
export function ConterContextProvider({ children }) {
	const [counter, setCounter] = useState(30);
	return (
		<ConterContext.Provider value={{ counter, setCounter }}>
			{children}
		</ConterContext.Provider>
	);
}
