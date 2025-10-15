import React from "react";
import styles from "./CategoryTag.module.css";

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

export interface CategoryTagProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className"> {
	tone?: CategoryTagTone;
	selected?: boolean;
	disabled?: boolean;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
	children,
	tone = "life",
	selected = false,
	disabled = false,
	...rest
}) => {
	const classes = [
		styles.tag,
		styles[`tone_${tone}`],
		selected ? styles.state_selected : styles.state_default,
		disabled ? styles.state_disabled : styles.state_enabled,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<span
			className={classes}
			aria-pressed={selected}
			aria-disabled={disabled || undefined}
			{...rest}
		>
			<span className={styles.label}>{children}</span>
		</span>
	);
};

export default CategoryTag;
