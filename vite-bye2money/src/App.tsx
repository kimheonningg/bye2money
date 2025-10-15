import "./styles/App.css";

import Header from "./ui/Header/Header";

function App() {
	return (
		<div style={{ position: "absolute", top: 0, width: "100%" }}>
			<Header
				year={2023}
				month={8}
				monthLabel="August"
				onPrev={() => {}}
				onNext={() => {}}
			/>
		</div>
	);
}

export default App;
