import React from "react";
import styles from "./Header.module.css";
import Button from "../../components/Button/Button";

export interface HeaderProps {
	brand?: string;
	year: number;
	month: number; // 1~12
	monthLabel?: string;
	onPrev?: () => void;
	onNext?: () => void;
}

const Header: React.FC<HeaderProps> = ({
	brand = "Wise Wallet",
	year,
	month,
	monthLabel = "August",
	onPrev,
	onNext,
}) => {
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
					{/* FIXME: replace icons */}
					<Button buttonType="ghost" aria-label="docs">
						🗂
					</Button>
					<Button buttonType="ghost" aria-label="calendar">
						🗓
					</Button>
					<Button buttonType="ghost" aria-label="chart">
						📊
					</Button>
				</div>
			</div>
		</header>
	);
};

export default Header;
