import "./styles/App.css";

import { useState } from "react";

import type { HeaderToolIconType } from "./types/types";

import Header from "./ui/Header/Header";

function App() {
	const [year, setYear] = useState<number>(2025);
	const [month, setMonth] = useState<number>(10);

	const [currentTab, setCurrentTab] = useState<HeaderToolIconType>("records");

	const dayContent = {}; // For calendar- TODO: Use "useState" later

	return (
		<div style={{ position: "absolute", top: 0, width: "100%" }}>
			<Header
				brand={"Wise Wallet"}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				year={year}
				month={month}
				onChangeMonth={(newYear, newMonth) => {
					setYear(newYear);
					setMonth(newMonth);
				}}
			/>
			{currentTab === "records" && <div>Records tab pressed</div>}
			{currentTab === "calendar" && (
				// <calendar year={year} month={month} dayContent={dayContent} />
				<div>calendar tab pressed</div>
			)}
			{currentTab === "analytics" && <div>Analytics tab pressed</div>}
		</div>
	);
}

export default App;
