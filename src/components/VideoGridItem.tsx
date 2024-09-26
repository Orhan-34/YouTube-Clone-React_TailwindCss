import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatPostDate } from "../utils/formatPostDate";
import { formatViews } from "../utils/formatViews";

type VideoGridItemProps = {
	id: string;
	title: string;
	channel: {
		id: string;
		name: string;
		profileUrl: string;
	};
	views: number;
	postedAt: Date;
	duration: number;
	thumbnailUrl: string;
	videoUrl: string;
};

const VideoGridItem = ({
	id,
	title,
	channel,
	views,
	postedAt,
	duration,
	thumbnailUrl,
	videoUrl,
}: VideoGridItemProps) => {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current == null) return;

		if (isVideoPlaying) {
			videoRef.current.currentTime = 0;
			videoRef.current.play();
		}else {
			videoRef.current.pause();
		}
	}, [isVideoPlaying]);

	return (
		<div className="flex flex-col gap-4" onMouseEnter={() => setIsVideoPlaying(true)} onMouseLeave={() => setIsVideoPlaying(false)}>
			<a href={`/watch?v=${id}`} className="relative aspect-video">
				<img
					src={thumbnailUrl}
					className="h-full w-full rounded-xl object-cover"
					alt=""
				/>
				<div className="absolute bottom-1 right-1 bg-slate-950 text-white text-sm px-0.5 rounded">
					{formatDuration(duration)}
				</div>
				<video ref={videoRef} muted playsInline src={videoUrl} className={`block h-full object-cover absolute inset-0 transition-opacity duration-500 ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}/>
			</a>
			<div className="flex gap-2">
				<a href="/" className="flex-shrink-0">
					<img
						src={channel.profileUrl}
						alt=""
						className="w-12 h-12 rounded-full"
					/>
				</a>
				<div className="flex flex-col text-white">
					<a href="/" className="text-sm font-medium">
						{title}
					</a>
					<a href="/" className="text-sm text-slate-450">
						{channel.name}
					</a>
					<div className="text-sm text-slate-450">
						{formatViews(views)} views • {formatPostDate(postedAt)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoGridItem;
