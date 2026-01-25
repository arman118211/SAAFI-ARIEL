import React, { useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";
import { X, Copy, Check, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ShareModal = ({ isOpen, onClose, shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const shareButtons = [
    { Button: WhatsappShareButton, Icon: WhatsappIcon, label: "WhatsApp", color: "#25D366" },
    { Button: FacebookShareButton, Icon: FacebookIcon, label: "Facebook", color: "#1877F2" },
    { Button: TwitterShareButton, Icon: TwitterIcon, label: "X / Twitter", color: "#000000" },
    { Button: LinkedinShareButton, Icon: LinkedinIcon, label: "LinkedIn", color: "#0A66C2" },
    { Button: TelegramShareButton, Icon: TelegramIcon, label: "Telegram", color: "#26A5E4" },
    { Button: EmailShareButton, Icon: EmailIcon, label: "Email", color: "#7F8C8D" },
  ];

  // Animation variants for the staggered entrance
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { delayChildren: 0.1, staggerChildren: 0.05 }
    },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden w-full max-w-[600px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20"
          >
            {/* Aesthetic Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />

            {/* Header */}
            <div className="pt-8 pb-4 px-8 text-center">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Spread the word
              </h3>
              <p className="text-gray-500 text-sm mt-1">If you like it, share it with others!</p>
            </div>

            {/* Share Grid */}
            <div className="px-8 pb-6">
              <div className="grid grid-cols-3 gap-4">
                {shareButtons.map(({ Button, Icon, label, color }) => (
                  <motion.div 
                    key={label} 
                    variants={itemVariants}
                    className="group flex flex-col items-center"
                  >
                    <Button url={shareUrl} className="relative group-hover:scale-110 transition-transform duration-300">
                        {/* Subtle glow behind icons */}
                      <div 
                        className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity" 
                        style={{ backgroundColor: color }}
                      />
                      <Icon size={56} round className="relative z-10 shadow-lg" />
                    </Button>
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-tighter group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* URL Section - "Glass" Look */}
              <div className="mt-8 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex items-center bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-2 rounded-2xl">
                  <span className="flex-1 px-3 text-xs font-medium text-gray-500 truncate italic">
                    {shareUrl}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="relative overflow-hidden group/btn px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95"
                  >
                    <div className={`absolute inset-0 transition-colors duration-300 ${copied ? 'bg-green-500' : 'bg-gray-900 dark:bg-white'}`} />
                    <div className="relative flex items-center gap-2">
                      {copied ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Copy className="w-4 h-4 text-white dark:text-black" />
                      )}
                      <span className={`text-xs font-bold ${copied ? 'text-white' : 'text-white dark:text-black'}`}>
                        {copied ? "Done!" : "Copy Link"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Close Button - Floating Style */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;