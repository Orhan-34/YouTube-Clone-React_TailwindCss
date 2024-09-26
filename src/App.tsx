import CategoryCase from "./components/CategoryCase";
import { PageHeader } from "./layouts/PageHeader";
import { categories } from "./data/categories";
import { useState } from "react";
import VideoGridItem from "./components/VideoGridItem";
import { videos } from "./data/videos";
import { Sidebar } from "./layouts/Sidebar";
function App() {
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	return (
			<div className="max-h-screen flex flex-col gap-7">
				<PageHeader />
				<div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
					<Sidebar />
					<div className="overflow-x-hidden px-8 pb-4">
						<div className="sticky top-0 pb-4 z-10">
							<CategoryCase
								categories={categories}
								selectedCategory={selectedCategory}
								onSelect={setSelectedCategory}
							/>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
							{videos.map((video) => (
								<VideoGridItem key={video.id} {...video} />
							))}
						</div>
					</div>
				</div>
			</div>
	);
}

export default App;
