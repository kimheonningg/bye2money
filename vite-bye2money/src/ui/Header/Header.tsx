import React, { useState } from "react";
import styles from "./Header.module.css";
import Button from "../../components/Button/Button";

import {
	DescriptionOutlined,
	CalendarMonthOutlined,
	BarChartOutlined,
} from "@mui/icons-material";

export interface HeaderProps {
	brand?: string;
	year: number;
	month: number; // 1~12
	monthLabel?: string;
	onPrev?: () => void;
	onNext?: () => void;
}

export type ToolIconType = "records" | "calendar" | "analytics" | null;

const Header: React.FC<HeaderProps> = ({
	brand = "Wise Wallet",
	year,
	month,
	monthLabel = "August",
	onPrev,
	onNext,
}) => {
	const [activeTool, setActiveTool] = useState<ToolIconType>(null);

	return (
		<header className={styles.appbar}>
			<div className={styles.appbarInner}>
				<div className={styles.brand}>{brand}</div>

				<div className={styles.monthNav}>
					<Button buttonType="ghost" aria-label="prev" onClick={onPrev}>
						‹
					</Button>

					<div className={styles.mono}>
						<div className={styles.year}>{year}</div>
						<div className={styles.monthNum}>{month}</div>
						<div className={styles.monthLabel}>{monthLabel}</div>
					</div>

					<Button buttonType="ghost" aria-label="next" onClick={onNext}>
						›
					</Button>
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
