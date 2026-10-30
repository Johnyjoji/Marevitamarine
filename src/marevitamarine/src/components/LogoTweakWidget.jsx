import React, { useState } from 'react';
import { Sliders, X, Copy, Check } from 'lucide-react';

export default function LogoTweakWidget({
  expandedHeight,
  setExpandedHeight,
  collapsedSize,
  setCollapsedSize,
  containerPadding,
  setContainerPadding
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Expanded Logo Height: ${expandedHeight}px\nCollapsed Logo Size: ${collapsedSize}px\nLogo Container Padding (Left): ${containerPadding}px`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] pointer-events-auto">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-navy-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl text-navy-900">
          <div className="flex items-center justify-between pb-3 border-b border-navy-100">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Sliders className="h-4 w-4 text-marine-600" />
              <span>Navbar & Logo Tweak</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 hover:bg-navy-100 text-navy-500 transition-colors"
              aria-label="Minimize tweak panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 pt-3 text-xs">
            {/* Expanded Logo Height / Navbar Sizing */}
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span>Expanded Logo & Nav Height</span>
                <span className="font-bold text-marine-600">{expandedHeight}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="56"
                value={expandedHeight}
                onChange={(e) => setExpandedHeight(Number(e.target.value))}
                className="w-full accent-marine-600 cursor-pointer"
              />
            </div>

            {/* Collapsed Logo Size */}
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span>Collapsed Logo Size</span>
                <span className="font-bold text-marine-600">{collapsedSize}px</span>
              </div>
              <input
                type="range"
                min="20"
                max="48"
                value={collapsedSize}
                onChange={(e) => setCollapsedSize(Number(e.target.value))}
                className="w-full accent-marine-600 cursor-pointer"
              />
            </div>

            {/* Container Left Padding */}
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span>Logo Left Padding (Expanded)</span>
                <span className="font-bold text-marine-600">{containerPadding}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={containerPadding}
                onChange={(e) => setContainerPadding(Number(e.target.value))}
                className="w-full accent-marine-600 cursor-pointer"
              />
            </div>

            {/* Copy values */}
            <div className="pt-2 flex items-center justify-between border-t border-navy-100">
              <span className="text-[11px] text-navy-500">Adjust live & test navbar</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-900 text-white font-medium hover:bg-navy-800 transition-colors"
              >
                {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied!' : 'Copy Values'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-navy-900 px-4 py-3 text-white shadow-xl hover:bg-navy-800 transition-all font-medium text-xs"
        >
          <Sliders className="h-4 w-4 text-marine-400" />
          <span>Tweak Navbar Size</span>
        </button>
      )}
    </div>
  );
}
