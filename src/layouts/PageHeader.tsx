import logo from "../assets/logo-youtube.png";
import {
	Upload,
	Bell,
	User,
	Mic,
	Search,
	ArrowLeft,
	Menu,
} from "lucide-react";
import { useState } from "react";
import Button from "../components/Button";
import { useSidebarContext } from "../context/SidebarContext";
export function PageHeader() {
	const [showSearchBar, setShowSearchBar] = useState(false);
	return (
		<div className="flex gap-10 justify-between lg:gap-20 mx-4 my-7">
			<PageHeaderFirstSection hidden={showSearchBar}/>
			<form
				className={` flex-grow items-center justify-center gap-4 ${showSearchBar ? "flex mt-5" : "hidden md:flex"}`}
			>
				{showSearchBar && (
					<Button
						className="flex-shrink-0"
						onClick={() => setShowSearchBar(false)}
					>
						<ArrowLeft />
					</Button>
				)}
				<div className="flex flex-grow max-w-[600px]">
					<input
						type="search"
						className="rounded-l-full border border-gray-400 shadow-inner shadow-gray-400 text-lg px-2 py-1 w-full focus:border-blue-500 outline-none"
						placeholder="Search"
					/>

					<Button
						className="bg-white rounded-r-full rounded-none flex-shrink-0 p-3"
						textColor="text-black "
					>
						<Search />
					</Button>
				</div>
				<Button className="flex-shrink-0">
					<Mic />
				</Button>
			</form>
			<div
				className={`flex-shrink-0 md:gap-2 ${showSearchBar ? "hidden" : "visible"}`}
			>
				<Button
					className="md:hidden mr-5"
					onClick={() => setShowSearchBar(true)}
				>
					<Search />
				</Button>
				<Button className="md:hidden mr-5">
					<Mic />
				</Button>
				<Button className="mr-5 ">
					<Upload />
				</Button>
				<Button className="mr-5">
					<Bell />
				</Button>
				<Button className="mr-5">
					<User />
				</Button>
			</div>
		</div>
	);
}

type PageHeaderFirstSectionProps = {
	hidden?: boolean;
};

export function PageHeaderFirstSection({
	hidden = false,
}: PageHeaderFirstSectionProps) {
	const { toggle } = useSidebarContext();

	return (
		<div
			className={`gap-4 items-center flex-shrink-0 ${
				hidden ? "hidden" : "flex"
			}`}
		>
			<Button onClick={toggle}>
				<Menu />
			</Button>
			<a href="/" className="flex flex-row">
				<img src={logo} className="w-12 h-12" alt="logo" />
				<p className="text-3xl font-medium text-white mt-2 hidden lg:flex">YouTube <span className="text-sm ml-2">~Tr</span></p>
			</a>
		</div>
	);
}
