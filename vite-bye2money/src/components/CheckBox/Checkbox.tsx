import React, { useId, useState } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxSize = "L" | "M" | "S";

export interface CheckboxProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "size" | "type" | "checked" | "defaultChecked"
	> {
	label?: React.ReactNode;
	disabled?: boolean;
	size?: CheckboxSize;
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckboxProps> = ({
	label,
	disabled = false,
	size = "M",
	checked,
	defaultChecked,
	onCheckedChange,
	id,
	onChange,
	...rest
}) => {
	const autoId = useId();
	const inputId = id ?? autoId;

	const isControlled = typeof checked === "boolean";
	const [uncontrolled, setUncontrolled] = useState<boolean>(!!defaultChecked);
	const currentChecked = isControlled ? (checked as boolean) : uncontrolled;

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const next = e.currentTarget.checked;
		if (!isControlled) setUncontrolled(next);
		onChange?.(e);
		onCheckedChange?.(next);
	};

	const classes = [
		styles.root,
		styles[`size_${size}`],
		currentChecked ? styles.state_selected : styles.state_default,
		disabled ? styles.state_disabled : styles.state_enabled,
	]
		.filter(Boolean)
		.join(" ");

	const commonProps = {
		id: inputId,
		className: styles.inputNative,
		type: "checkbox",
		disabled,
		checked: currentChecked,
		onChange: handleChange,
		"aria-checked": currentChecked,
		"aria-disabled": disabled || undefined,
	};

	return (
		<label className={classes} htmlFor={inputId}>
			<input {...commonProps} {...rest} />
			<span className={styles.box} aria-hidden="true">
				<svg
					className={styles.icon}
					width="18"
					height="18"
					viewBox="0 0 20 20"
					focusable="false"
					aria-hidden="true"
				>
					<circle cx="10" cy="10" r="10" />
					<path
						d="M6 10.5l2.5 2.5L14 7.5"
						fill="none"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			{label ? <span className={styles.text}>{label}</span> : null}
		</label>
	);
};

export default CheckBox;
