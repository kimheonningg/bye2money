export type HeaderToolIconType = "records" | "calendar" | "analytics";

export type MoneyEntry = {
	date: string; // "YYYY-MM-DD"
	amount: number; // +: income (blue), -: expense (red)
};

export type CategoryTagTone =
	| "life" // 생활
	| "shopping_beauty" // 쇼핑/뷰티
	| "medical_health" // 의료/건강
	| "food" // 식비
	| "transportation" // 교통
	| "culture_leisure" // 문화/여가
	| "salary" // 월급
	| "other_income" // 기타 수입
	| "allowance" // 용돈
	| "unclassified"; // 미분류
