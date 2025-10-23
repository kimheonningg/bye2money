import type { MonthlyRecordGroup } from "../types/types";

export const toISODate = (y: number, m: number, d: number) =>
	`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export const formatKRW = (n: number) => n.toLocaleString("ko-KR");

// MainPage의 전체내역 계산 용
export function computeMonthlySummary(monthly: MonthlyRecordGroup) {
	let income = 0;
	let expense = 0;
	let count = 0;

	for (const g of monthly.groups) {
		count += g.entries.length;
		for (const e of g.entries) {
			if (e.amount >= 0) income += e.amount;
			else expense += -e.amount; // 절대값 누적
		}
	}
	return { count, income, expense };
}
