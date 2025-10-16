import "./styles/App.css";

import { useState } from "react";

import Header from "./ui/Header/Header";

function App() {
	const [year, setYear] = useState(2025);
	const [month, setMonth] = useState(10);

	const dayContent = {}; // For calender- TODO: Use "useState" later

	return (
		<div style={{ position: "absolute", top: 0, width: "100%" }}>
			<Header
				brand={"Wise Wallet"}
				year={year}
				month={month}
				onChangeMonth={(newYear, newMonth) => {
					setYear(newYear);
					setMonth(newMonth);
				}}
			/>
		</div>
	);
}

export default App;
