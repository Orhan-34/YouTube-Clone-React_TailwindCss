import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type SidebarContextType = {
	isLargeOpen: boolean;
	isSmallOpen: boolean;
	toggle: () => void;
	close: () => void;
};

type SidebarProviderProps = {
	children: ReactNode;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
	const value = useContext(SidebarContext);
	if (!value) {
		throw new Error("useSidebarContext must be used within SidebarProvider");
	}
	return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
	const [isLargeOpen, setIsLargeOpen] = useState(true);
	const [isSmallOpen, setIsSmallOpen] = useState(false);

	useEffect(() => {
		const handler = () => {
			if (!isScreenSmall()) setIsSmallOpen(false);
		};

		window.addEventListener("resize", handler);

		return () => {
			window.removeEventListener("resize", handler);
		};
	}, []);

	function isScreenSmall() {
		return window.innerWidth < 1024;
	}

	const toggle = () => {
		if (isScreenSmall()) {
			setIsSmallOpen((prev) => !prev);
		} else {
			setIsLargeOpen((prev) => !prev);
		}
	};
	const close = () => {
		if (isScreenSmall()) {
			setIsSmallOpen(false);
		} else {
			setIsLargeOpen(false);
		}
	};

	return (
		<SidebarContext.Provider
			value={{
				isLargeOpen,
				isSmallOpen,
				toggle,
				close,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
}
