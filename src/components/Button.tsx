import type { HtmlHTMLAttributes } from "react";

type ButtonProps = {
	className?: string;
	textColor?: string;

	isLoading?: boolean;
	icon?: React.ReactNode;
	children: React.ReactNode;
	hoverTextColor?: string;
	hoverBgColor?: string;
	props?: HtmlHTMLAttributes<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
	className,
	isLoading,
	icon,
	children,
	textColor,
	hoverTextColor,
	hoverBgColor,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={`${
				// biome-ignore lint/style/useTemplate: <explanation>
				className ? className + " " : ""
			} ${
				hoverTextColor ? `hover:${hoverTextColor}` : "hover:text-black"
			} ${hoverBgColor ? `hover:${hoverBgColor}` : "hover:bg-white"} rounded-full p-2 ${textColor ? textColor : "text-white"}`}
			disabled={isLoading}
		>
			{isLoading ? (
				<span>Loading...</span>
			) : (
				<>
					{icon && <span>{icon}</span>}
					{children}
				</>
			)}
		</button>
	);
};

export default Button;
