import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
type CategoryCaseProps = {
	categories: string[];
	selectedCategory: string;
	onSelect: (category: string) => void;
};
const TRANSLATE_AMOUNT = 200;

const CategoryCase = ({
	categories,
	selectedCategory,
	onSelect,
}: CategoryCaseProps) => {
	const [translate, setTranslate] = useState(0);
	const [isLeftButtonVisible, setIsLeftButtonVisible] = useState(false);
	const [isRightButtonVisible, setIsRightButtonVisible] = useState(true);

	const containerRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (containerRef.current == null) return;
		const observer = new IntersectionObserver((entries) => {
			const container = entries[0]?.target;
			if (container == null) return;
			setIsLeftButtonVisible(translate > 0);
			setIsRightButtonVisible(
				translate + container.clientWidth < container.scrollWidth,
			);
		});

		observer.observe(containerRef.current);
		return () => {
			observer.disconnect();
		};
	}, [categories, translate]);

	return (
		<div
			className="overflow-x-hidden overflow-y-hidden relative"
			ref={containerRef}
		>
			<div
				className="flex whitespace-nowrap gap-3 transition-transform w-max"
				style={{ transform: `translateX(-${translate}px)` }}
			>
				{categories.map((category, index) => (
					<Button
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						onClick={() => onSelect(category)}
						className={`py-1 px-3 rounded-lg whitespace-nowrap ${selectedCategory === category ? "bg-black text-white" : "bg-gray-300 text-black"} `}
						textColor="text-black"
					>
						{category}
					</Button>
				))}
			</div>
			{isLeftButtonVisible && (
				<div className="absolute left-0 bg-gradient-to-r from-[#282828] from-50% to-transparent top-1/2 -translate-y-1/2  w-24 h-full ">
					<Button
						className="h-full aspect-square w-auto p-1"
                        onClick={() => {
                            setTranslate(translate => {
                              const newTranslate = translate - TRANSLATE_AMOUNT
                              if (newTranslate <= 0) return 0
                              return newTranslate
                            })
                          }}
					>
						<ChevronLeft />
					</Button>
				</div>
			)}
			{isRightButtonVisible && (
				<div
					className="absolute right-0
                0 bg-gradient-to-l from-[#282828] from-50% to-transparent top-1/2 -translate-y-1/2  w-24 h-full flex justify-end"
				>
					<Button
						className="h-full aspect-square w-auto p-1"
						onClick={() => {
							setTranslate((translate) => {
								if (containerRef.current == null) {
									return translate;
								}
								const newTranslate = translate + TRANSLATE_AMOUNT;
								const edge = containerRef.current.scrollWidth;
								const width = containerRef.current.clientWidth;
								if (newTranslate + width >= edge) {
									return edge - width;
								}
								return newTranslate;
							});
						}}
					>
						<ChevronRight />
					</Button>
				</div>
			)}
		</div>
	);
};

export default CategoryCase;
