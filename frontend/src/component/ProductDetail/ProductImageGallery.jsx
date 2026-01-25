import React, { useEffect, useRef, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import Drift from "drift-zoom";
import ShareModal from "../../utils/ShareModal ";

const ProductImageGallery = ({ images, selectedImage, onImageSelect }) => {
	const imageRef = useRef(null);
	const zoomPaneRef = useRef(null);
	const driftRef = useRef(null);
	const [isDesktop, setIsDesktop] = useState(false);

	const [isShareOpen, setIsShareOpen] = useState(false);

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	/* Desktop detection */
	useEffect(() => {
		const checkDevice = () => setIsDesktop(window.innerWidth >= 1024);
		checkDevice();
		window.addEventListener("resize", checkDevice);
		return () => window.removeEventListener("resize", checkDevice);
	}, []);

	/* Drift zoom – SAME AS YOUR ORIGINAL CODE */
	useEffect(() => {
		if (!isDesktop) return;
		if (!imageRef.current || !zoomPaneRef.current) return;

		driftRef.current?.disable();

		driftRef.current = new Drift(imageRef.current, {
			paneContainer: zoomPaneRef.current,
			inlinePane: false,
			hoverDelay: 0,
			zoomFactor: 2.5,
		});

		return () => driftRef.current?.disable();
	}, [selectedImage, isDesktop]);

	return (
		<div className="relative space-y-4 w-full">
			{/* Main Image */}
			<div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
				<div className="flex items-center justify-center h-72 sm:h-80 md:h-[400px] w-full p-4">
					<img
						ref={imageRef}
						src={images[selectedImage]}
						alt="Product"
						data-zoom={images[selectedImage]}
						className="max-w-full max-h-full object-contain"
					/>
				</div>

				{/* Floating Actions */}
				<div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
					<button className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:scale-110 transition-all">
						<Heart className="w-5 h-5" />
					</button>
					<button
						onClick={() => setIsShareOpen(true)}
						className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:scale-110 transition-all"
					>
						<Share2 className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* Drift Zoom Pane – INVISIBLE CONTAINER */}
			{isDesktop && (
				<div
					ref={zoomPaneRef}
					className="absolute top-0 left-[105%] w-[420px] h-[400px] pointer-events-none"
				/>
			)}

			{/* Thumbnails */}
			<div className="grid grid-cols-4 gap-3">
				{images.map((img, idx) => (
					<button
						key={idx}
						onClick={() => onImageSelect(idx)}
						className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
							selectedImage === idx
								? "border-blue-500 ring-2 ring-blue-500/20 scale-95"
								: "border-transparent bg-gray-50 hover:border-gray-200"
						}`}
					>
						<img
							src={img}
							alt={`Thumbnail ${idx + 1}`}
							className="w-full h-full object-contain p-1"
						/>
					</button>
				))}
			</div>
			<ShareModal
				isOpen={isShareOpen}
				onClose={() => setIsShareOpen(false)}
				shareUrl={shareUrl}
			/>
		</div>
	);
};

export default ProductImageGallery;
