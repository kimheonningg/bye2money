export type HeaderToolIconType = "records" | "calendar" | "analytics";

export type MoneyEntry = {
	date: string; // "YYYY-MM-DD"
	amount: number; // +: income (blue), -: expense (red)
};
