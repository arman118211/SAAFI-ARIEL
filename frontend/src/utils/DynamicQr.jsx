import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
// Icons: npm install lucide-react
import { Download, Loader2, QrCode, Link2, Type } from "lucide-react";

const DynamicQR = () => {
  const qrRef = useRef(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!qrRef.current) return;
    
    setIsDownloading(true);

    try {
      // We add a slight delay so the user sees the loader state
      await new Promise(resolve => setTimeout(resolve, 800));

      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2, // Higher quality
      });

      const link = document.createElement("a");
      link.download = `${title.replace(/\s+/g, '-').toLowerCase() || 'qr-code'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Setup */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              QR <span className="text-indigo-600">Generator</span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Create a professional scan card in seconds.</p>
          </div>

          <div className="space-y-5">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                <Type size={16} /> QR Title
              </label>
              <input
                type="text"
                placeholder="Business Name or Event"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                <Link2 size={16} /> Destination URL
              </label>
              <input
                type="text"
                placeholder="https://yourlink.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side: The Preview Card */}
        <div className="flex flex-col items-center">
          <div 
            ref={qrRef}
            className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 flex flex-col items-center text-center"
          >
            {title && (
              <h2 className="text-2xl font-bold text-slate-800 mb-6 break-all">
                {title}
              </h2>
            )}
            
            <div className="p-4 bg-slate-50 rounded-[2rem] border-4 border-white shadow-inner">
              {url ? (
                <QRCodeCanvas
                  value={url}
                  size={220}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/logo.jpg", // LinkedIn Logo Example
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              ) : (
                <div className="w-[220px] h-[220px] flex items-center justify-center text-slate-300">
                  <QrCode size={80} strokeWidth={1} />
                </div>
              )}
            </div>

            {url && (
              <p className="mt-6 text-xs font-medium text-slate-400 uppercase tracking-widest">
                Scan to visit link
              </p>
            )}
          </div>

          {/* Download & Social Actions */}
          {url && (
            <div className="w-full max-w-sm mt-8 space-y-6">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-400 text-white rounded-2xl font-bold transition-all transform active:scale-95 shadow-xl shadow-slate-200"
              >
                {isDownloading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Download size={20} />
                )}
                {isDownloading ? "Preparing Image..." : "Download QR Card"}
              </button>

              <div className="flex items-center justify-center gap-6">
                <WhatsappShareButton url={url} title={title}>
                  <WhatsappIcon size={44} round className="hover:opacity-80 transition-opacity" />
                </WhatsappShareButton>
                <FacebookShareButton url={url} quote={title}>
                  <FacebookIcon size={44} round className="hover:opacity-80 transition-opacity" />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                  <TwitterIcon size={44} round className="hover:opacity-80 transition-opacity" />
                </TwitterShareButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicQR;