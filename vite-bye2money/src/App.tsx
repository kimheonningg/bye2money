import "./styles/App.css";

import Header from "./ui/Header/Header";

function App() {
	return (
		<div style={{ position: "absolute", top: 0, width: "100%" }}>
			<Header brand={"Wise Wallet"} year={2025} month={10} />
		</div>
	);
}

export default App;
