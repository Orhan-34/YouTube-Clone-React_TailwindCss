import {
	ChevronDown,
	ChevronUp,
	Clapperboard,
	ClapperboardIcon,
	Clock,
	Film,
	Flame,
	Gamepad2,
	History,
	HomeIcon,
	Library,
	Lightbulb,
	ListVideo,
	Music2,
	Newspaper,
	PlaySquare,
	Podcast,
	Radio,
	Repeat,
	Shirt,
	ShoppingBag,
	Trophy,
} from "lucide-react";
import { Children, useState, type ElementType } from "react";
import type React from "react";
import Button from "../components/Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../context/SidebarContext";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
	const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
	const location = useLocation();
	return (
		<>
			<aside
				className={`sticky flex flex-col top-0 overflow-y-auto ml-1 lg:hidden ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}
			>
				<SmallSidebarItem Icon={HomeIcon} title="Home" url="/" />
				<SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
				<SmallSidebarItem
					Icon={Clapperboard}
					title="Subscriptions"
					url="/subscriptions"
				/>
				<SmallSidebarItem Icon={Library} title="Library" url="/library" />
			</aside>
			{isSmallOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					onClick={close}
					className="lg:hidden fixed inset-0 z-[999] bg-black opacity-50"
				/>
			)}
			<aside
				className={`w-56 lg:sticky absolute top-0 overflow-y-auto flex-col gap-2 px-2 pb-4 ml-1 transition-transform duration-300 ease-in-out transform ${
					isLargeOpen ? "lg:translate-x-0" : "lg:-translate-x-full hidden" 
				} ${isSmallOpen ? "translate-x-0 z-[999] bg-[#282828] max-h-screen" : "-translate-x-full"}`}
			>
				<LargeSidebarSection title="Subscriptions">
					<LargeSidebarItem
						IconOrImgUrl={HomeIcon}
						title="Home"
						url="/"
						isActive={location.pathname === "/"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={ClapperboardIcon}
						title="Shorts"
						url="/shorts"
						isActive={location.pathname === "/shorts"}
					/>
				</LargeSidebarSection>
				<hr />
				<LargeSidebarSection visibleCount={5}>
					<LargeSidebarItem
						IconOrImgUrl={Library}
						title="Library"
						url="/library"
						isActive={location.pathname === "/library"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={History}
						title="History"
						url="/history"
						isActive={location.pathname === "/history"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={PlaySquare}
						title="Your Videos"
						url="/your-videos"
						isActive={location.pathname === "/your-videos"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Clock}
						title="Watch Later"
						url="/playlist?list=WL"
						isActive={location.pathname === "/playlist?list=WL"}
					/>
					{playlists.map((playlist) => (
						<LargeSidebarItem
							key={playlist.id}
							IconOrImgUrl={ListVideo}
							title={playlist.name}
							url={`/playlist?list=${playlist.id}`}
							isActive={location.pathname === `/playlist?list=${playlist.id}`}
						/>
					))}
				</LargeSidebarSection>
				<hr />
				<LargeSidebarSection title="Subscriptions">
					{subscriptions.map((subscribe) => (
						<LargeSidebarItem
							key={subscribe.id}
							IconOrImgUrl={subscribe.imgUrl}
							title={subscribe.channelName}
							url={`/channel/${subscribe.id}`}
							isActive={location.pathname === `/channel/${subscribe.id}`}
						/>
					))}
				</LargeSidebarSection>
				<hr />
				<LargeSidebarSection title="Explore">
					<LargeSidebarItem
						IconOrImgUrl={Flame}
						title="Trending"
						url="/trending"
						isActive={location.pathname === "/trending"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={ShoppingBag}
						title="Shopping"
						url="/shopping"
						isActive={location.pathname === "/shopping"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Music2}
						title="Music"
						url="/music"
						isActive={location.pathname === "/music"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Film}
						title="Movies & TV"
						url="/movies-tv"
						isActive={location.pathname === "/movies-tv"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Radio}
						title="Live"
						url="/live"
						isActive={location.pathname === "/live"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Gamepad2}
						title="Gaming"
						url="/gaming"
						isActive={location.pathname === "/gaming"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Newspaper}
						title="News"
						url="/news"
						isActive={location.pathname === "/news"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Trophy}
						title="Sports"
						url="/sports"
						isActive={location.pathname === "/sports"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Lightbulb}
						title="Learning"
						url="/learning"
						isActive={location.pathname === "/learning"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Shirt}
						title="Fashion & Beauty"
						url="/fashion-beauty"
						isActive={location.pathname === "/fashion-beauty"}
					/>
					<LargeSidebarItem
						IconOrImgUrl={Podcast}
						title="Podcasts"
						url="/podcasts"
						isActive={location.pathname === "/podcasts"}
					/>
				</LargeSidebarSection>
			</aside>
		</>
	);
};

type SmallSidebarItemProps = {
	Icon: ElementType;
	title: string;
	url: string;
};
function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
	return (
		<a href={url} className="text-white">
			<div className="rounded-xl flex flex-col py-4 px-1 gap-1 items-center hover:bg-slate-100 hover:text-black transition duration-300">
				<Icon className="w-6 h-6" />
				<div className="text-sm">{title}</div>
			</div>
		</a>
	);
}

type LargeSidebarSectionProps = {
	children: React.ReactNode;
	title?: string;
	visibleCount?: number;
};
function LargeSidebarSection({
	children,
	title,
	visibleCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const childrenArray = Children.toArray(children).flat();
	const visibleChildren = isExpanded
		? childrenArray
		: childrenArray.slice(0, visibleCount);
	const showExpandButton = childrenArray.length > visibleCount;
	const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
	return (
		<div className="text-white text-sm font-semibold">
			{title && <div className="mt-2 ml-4 text-lg pb-3">{title}</div>}
			{visibleChildren}
			{showExpandButton && (
				<Button
					className="w-full flex items-center rounded-lg gap-4 p-3 "
					onClick={() => setIsExpanded((e) => !e)}
				>
					<div className="w-6 h-6">
						<ButtonIcon />
					</div>
					<div>{isExpanded ? "Show Less" : "Show More"}</div>
				</Button>
			)}
		</div>
	);
}

type LargeSidebarItemProps = {
	IconOrImgUrl: ElementType | string;
	title: string;
	url: string;
	isActive?: boolean;
};

function LargeSidebarItem({
	IconOrImgUrl,
	title,
	url,
	isActive = false,
}: LargeSidebarItemProps) {
	return (
		<a href={url} className="text-white">
			<div
				className={`hover:outline-dashed rounded-xl w-full flex py-4 px-1 gap-1 items-center ${isActive ? "bg-gray-50 text-black" : undefined}`}
			>
				{typeof IconOrImgUrl === "string" ? (
					<img
						src={IconOrImgUrl}
						className="w-6 h-6 rounded-full"
						alt="icon-or-image"
					/>
				) : (
					<IconOrImgUrl className="w-6 h-6" />
				)}
				<div className="whitespace-nowrap overflow-hidden text-ellipsis ml-2">
					{title}
				</div>
			</div>
		</a>
	);
}
