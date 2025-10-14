import React, { useId, useMemo, useState } from "react";
import styles from "./TextInput.module.css";

export type TextInputType = "default" | "textAreaOnly";
export type TypingState = "placeholder" | "onFocus" | "onTyping" | "typed";

export interface TextInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "size"
	> {
	inputType?: TextInputType;
	label?: string;
	error?: boolean;
	disabled?: boolean;
	rows?: number;
	onValueChange?: (value: string) => void;
	value?: string;
	forceTypingState?: TypingState;
}

const TextInput: React.FC<TextInputProps> = ({
	inputType = "default",
	label,
	error = false,
	disabled = false,
	rows = 4,
	onChange,
	onValueChange,
	value,
	defaultValue,
	placeholder,
	onFocus,
	onBlur,
	forceTypingState,
	id,
	...rest
	// TODO: 하나의 Type으로 만들어서 정리
}) => {
	const autoId = useId();
	const inputId = id ?? autoId;

	const isControlled = typeof value === "string";
	const [uncontrolled, setUncontrolled] = useState<string>(
		defaultValue?.toString() ?? ""
	);
	const [focused, setFocused] = useState(false);
	const [recentlyTypedAt, setRecentlyTypedAt] = useState<number>(0);

	const currentValue = isControlled ? (value as string) : uncontrolled;

	const handleChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		const next = e.currentTarget.value;
		if (!isControlled) setUncontrolled(next);
		onChange?.(e as React.ChangeEvent<HTMLInputElement>);
		onValueChange?.(next);
		setRecentlyTypedAt(Date.now());
	};

	const handleFocus: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		setFocused(true);
		onFocus?.(e as React.FocusEvent<HTMLInputElement>);
	};

	const handleBlur: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		setFocused(false);
		onBlur?.(e as React.FocusEvent<HTMLInputElement>);
	};

	const inferredTypingState: TypingState = useMemo(() => {
		if (forceTypingState) return forceTypingState;
		if (!focused && !currentValue) return "placeholder";
		if (focused && !currentValue) return "onFocus";
		// Wait 150ms to regard as input
		if (focused && currentValue && Date.now() - recentlyTypedAt < 150)
			return "onTyping";
		if (!focused && currentValue) return "typed";
		return "onTyping";
	}, [forceTypingState, focused, currentValue, recentlyTypedAt]);

	const classes = [
		styles.root,
		styles[`type_${inputType}`],
		focused ? styles.state_active : styles.state_enabled,
		error ? styles.state_error : "",
		disabled ? styles.state_disabled : "",
		styles[`typing_${inferredTypingState}`],
	]
		.filter(Boolean)
		.join(" ");

	const commonProps = {
		id: inputId,
		className: styles.input,
		disabled,
		placeholder,
		onFocus: handleFocus,
		onBlur: handleBlur,
		onChange: handleChange,
		value: currentValue,
		...(isControlled ? {} : { defaultValue }),
		"aria-invalid": error || undefined,
		"aria-disabled": disabled || undefined,
	};

	return (
		<label className={classes} htmlFor={inputId}>
			{label ? <span className={styles.label}>{label}</span> : null}

			{inputType === "textAreaOnly" ? (
				<textarea
					{...(commonProps as any)}
					className={`${styles.input} ${styles.textarea}`}
					rows={rows}
					{...rest}
				/>
			) : (
				<input {...(commonProps as any)} type="text" {...rest} />
			)}
		</label>
	);
};

export default TextInput;
