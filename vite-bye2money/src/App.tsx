import "./styles/App.css";

import { useState } from "react";

import type { HeaderToolIconType } from "./types/types";

import Header from "./ui/Header/Header";
import Calendar from "./ui/Calendar/Calendar";
import type { MoneyEntry } from "./ui/Calendar/Calendar";

function App() {
	const [year, setYear] = useState<number>(2025);
	const [month, setMonth] = useState<number>(10);

	const [currentTab, setCurrentTab] = useState<HeaderToolIconType>("records");

	const dataContent: MoneyEntry[] = [
		{ date: "2025-10-02", amount: -5400 },
		{ date: "2025-10-03", amount: -132000 },
		{ date: "2025-10-06", amount: -10000 },
		{ date: "2025-10-08", amount: -529140 },
		{ date: "2025-10-10", amount: 2010580 },
		{ date: "2025-10-10", amount: -9500 },
		{ date: "2025-10-14", amount: -56240 },
		{ date: "2025-10-17", amount: -34460 },
	]; // For calendar- FIXME: Hard-coded for now & use "useState" later

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
				<div style={{ position: "absolute", top: "176px", width: "100%" }}>
					<Calendar
						year={year}
						month={month}
						entries={dataContent}
						selectedDate="2025-10-17"
					/>
				</div>
			)}
			{currentTab === "analytics" && <div>Analytics tab pressed</div>}
		</div>
	);
}

export default App;
