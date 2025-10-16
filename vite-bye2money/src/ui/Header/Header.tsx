import { useState, useEffect } from "react";
import styles from "./Header.module.css";

import {
	DescriptionOutlined,
	CalendarMonthOutlined,
	BarChartOutlined,
} from "@mui/icons-material";

import { MONTHS } from "./const";
import { stepMonth } from "./monthNav";

export interface HeaderProps {
	brand?: string;
	year: number;
	month: number; // 1~12
	onChangeMonth: (year: number, month: number) => void;
}

export type ToolIconType = "records" | "calendar" | "analytics";

const Header = ({ brand, year, month, onChangeMonth }: HeaderProps) => {
	const [activeTool, setActiveTool] = useState<ToolIconType>("records");
	const [currentYear, setCurrentYear] = useState(year);
	const [currentMonth, setCurrentMonth] = useState(month);
	const [currentLabel, setCurrentLabel] = useState(MONTHS[month - 1].label);

	useEffect(() => {
		setCurrentYear(year);
		setCurrentMonth(month);
		setCurrentLabel(MONTHS[month - 1].label);
	}, [year, month]);

	const handlePrev = () => {
		// Go to previous month
		const {
			year: newYear,
			month: newMonth,
			label: newLabel,
		} = stepMonth(currentYear, currentMonth, -1);
		setCurrentYear(newYear);
		setCurrentMonth(newMonth);
		setCurrentLabel(newLabel);
		onChangeMonth(newYear, newMonth);
	};

	const handleNext = () => {
		// Go to next month
		const {
			year: newYear,
			month: newMonth,
			label: newLabel,
		} = stepMonth(currentYear, currentMonth, 1);
		setCurrentYear(newYear);
		setCurrentMonth(newMonth);
		setCurrentLabel(newLabel);

		onChangeMonth(newYear, newMonth);
	};

	return (
		<header className={styles.appbar}>
			<div className={styles.appbarInner}>
				<div className={styles.brand}>{brand}</div>

				<div className={styles.monthNav}>
					<div
						className={styles.monthNavArrow}
						role="button"
						aria-label="previous month"
						tabIndex={0}
						onClick={handlePrev}
					>
						{"<"}
					</div>

					<div className={styles.monthDisplay}>
						<div className={styles.year}>{currentYear}</div>
						<div className={styles.monthNum}>{currentMonth}</div>
						<div className={styles.monthLabel}>{currentLabel}</div>
					</div>

					<div
						className={styles.monthNavArrow}
						role="button"
						aria-label="next month"
						tabIndex={0}
						onClick={handleNext}
					>
						{">"}
					</div>
				</div>

				<div className={styles.tools}>
					<button
						className={styles.tool}
						aria-label="records"
						aria-pressed={activeTool === "records"}
						data-active={activeTool === "records"}
						onClick={() => setActiveTool("records")}
					>
						<DescriptionOutlined className={styles.icon} />
					</button>
					<button
						className={styles.tool}
						aria-label="calendar"
						aria-pressed={activeTool === "calendar"}
						data-active={activeTool === "calendar"}
						onClick={() => setActiveTool("calendar")}
					>
						<CalendarMonthOutlined className={styles.icon} />
					</button>
					<button
						className={styles.tool}
						aria-label="analytics"
						aria-pressed={activeTool === "analytics"}
						data-active={activeTool === "analytics"}
						onClick={() => setActiveTool("analytics")}
					>
						<BarChartOutlined className={styles.icon} />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
