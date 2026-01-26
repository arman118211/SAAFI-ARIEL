import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { X, Download, Smartphone, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";

const ScratchQRModal = ({ open, onClose, scratchId }) => {
	const qrRef = useRef(null);
	const qrInstance = useRef(null);

	useEffect(() => {
		if (!open) return;

		const qrUrl = `https://saafiariel.com/scratch/${scratchId}`;

		qrInstance.current = new QRCodeStyling({
			width: 300,
			height: 300,
			data: qrUrl,
			image: "/logo.jpg",
			dotsOptions: {
				color: "#1e293b", // Slate 800
				type: "extra-rounded",
			},
			backgroundOptions: {
				color: "#ffffff",
			},
			imageOptions: {
				crossOrigin: "anonymous",
				margin: 8,
			},
			cornersSquareOptions: {
				type: "extra-rounded",
				color: "#2563eb", // Blue 600
			},
			qrOptions: {
				errorCorrectionLevel: "H",
			},
		});

		if (qrRef.current) {
			qrRef.current.innerHTML = "";
			qrInstance.current.append(qrRef.current);
		}
	}, [open, scratchId]);

	const cardRef = useRef(null);

	// const downloadQR = () => {
	//     // You can customize the name to include the campaign ID
	//     qrInstance.current.download({
	//         name: `ScratchCard-${scratchId}`,
	//         extension: "png",
	//     });
	// };
	const downloadQR = async () => {
		if (!cardRef.current) return;

		try {
			const dataUrl = await toPng(cardRef.current, {
				cacheBust: true,
				pixelRatio: 2, // 👈 HD quality
				backgroundColor: "#ffffff",
			});

			const link = document.createElement("a");
			link.download = `ScratchCard-${scratchId}.png`;
			link.href = dataUrl;
			link.click();
		} catch (err) {
			console.error("QR Card download failed", err);
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
			<div
				ref={cardRef}
				className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in duration-300"
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors z-10"
				>
					<X size={20} />
				</button>

				{/* Card Header Area */}
				<div className="bg-blue-600 p-8 text-center text-white relative">
					<div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
						<svg viewBox="0 0 100 100" className="w-full h-full">
							<circle cx="0" cy="0" r="40" fill="white" />
						</svg>
					</div>
					<Sparkles className="mx-auto mb-2 text-blue-200" size={32} />
					<h2 className="text-2xl font-black tracking-tight uppercase">
						Scratch & Win
					</h2>
					<p className="text-blue-100 text-sm opacity-90">
						Scan to reveal your surprise prize!
					</p>
				</div>

				{/* QR Body */}
				<div className="p-8 bg-white flex flex-col items-center">
					<div className="relative p-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
						<div
							ref={qrRef}
							className="rounded-lg overflow-hidden shadow-inner"
						/>

						{/* Decorative Corners */}
						<div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500" />
						<div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-500" />
						<div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-500" />
						<div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-500" />
					</div>

					<div className="mt-6 flex items-center gap-2 text-slate-400 text-xs font-medium">
						<Smartphone size={14} />
						<span>Compatible with all QR Scanners</span>
					</div>
				</div>

				{/* Card Footer / Actions */}
				<div className="p-6 bg-slate-50 border-t border-slate-100">
					<button
						onClick={downloadQR}
						className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
					>
						<Download size={18} />
						Download Reward Card
					</button>
					<p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
						Powered by Saafi Ariel
					</p>
				</div>
			</div>
		</div>
	);
};

export default ScratchQRModal;
