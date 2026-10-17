"use client";

import { useState, useEffect, useCallback } from "react";

export const DEFAULT_CERTIFICATE_URL =
  "https://res.cloudinary.com/irxsvxce/image/upload/v1792231897/WhatsApp_Image_2026-10-17_at_1.31.38_PM.jpg";

/**
 * Helper function to trigger certificate modal from any client component
 */
export function openCertificateModal(
  url = DEFAULT_CERTIFICATE_URL,
  title = "Certificate of Appreciation - Oracle Eye Hospital"
) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-certificate-modal", { detail: { url, title } })
    );
  }
}

export default function CertificateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(DEFAULT_CERTIFICATE_URL);
  const [title, setTitle] = useState(
    "Certificate of Appreciation - Oracle Eye Hospital"
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  // Handle custom event & global document clicks for certificate triggers
  useEffect(() => {
    const handleCustomEvent = (e) => {
      if (e.detail?.url) setImageUrl(e.detail.url);
      if (e.detail?.title) setTitle(e.detail.title);
      setIsLoading(true);
      setIsZoomed(false);
      setIsOpen(true);
    };

    const handleDocumentClick = (e) => {
      const trigger =
        e.target.closest("[data-certificate-modal]") ||
        e.target.closest('a[href*="WhatsApp_Image_2026-10-17_at_1.31.38_PM"]');

      if (trigger) {
        e.preventDefault();
        e.stopPropagation();

        const customUrl =
          trigger.getAttribute("data-certificate-url") ||
          trigger.getAttribute("href") ||
          DEFAULT_CERTIFICATE_URL;

        const customTitle =
          trigger.getAttribute("data-certificate-title") ||
          "Certificate of Appreciation - Oracle Eye Hospital";

        setImageUrl(customUrl);
        setTitle(customTitle);
        setIsLoading(true);
        setIsZoomed(false);
        setIsOpen(true);
      }
    };

    window.addEventListener("open-certificate-modal", handleCustomEvent);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("open-certificate-modal", handleCustomEvent);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  // Handle Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-900/90 text-white flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 pr-3">
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm sm:text-base border border-emerald-500/30 flex-shrink-0">
              📜
            </span>
            <div className="min-w-0">
              <h3
                id="certificate-modal-title"
                className="font-display font-bold text-xs sm:text-sm md:text-base tracking-wide text-white truncate"
              >
                {title}
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                Giants Group of Bisauli Stars • Certificate of Appreciation
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Zoom toggle button */}
            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
              title={isZoomed ? "Reset size" : "Enlarge view"}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isZoomed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                )}
              </svg>
              <span>{isZoomed ? "Fit Screen" : "Zoom"}</span>
            </button>

            {/* Open full resolution in new tab */}
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 transition-colors"
              title="Open full resolution original image"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">Original</span>
            </a>

            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
              title="Close (Esc)"
              aria-label="Close certificate preview"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body / Image Viewer */}
        <div
          className={`relative flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-slate-950/80 transition-all ${
            isZoomed ? "cursor-zoom-out items-start" : "cursor-default"
          }`}
          onClick={() => isZoomed && setIsZoomed(false)}
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
              <span className="text-xs">Loading Certificate...</span>
            </div>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Official Certificate of Appreciation - Oracle Eye Hospital"
            className={`rounded-lg object-contain transition-all duration-200 shadow-2xl ${
              isZoomed
                ? "w-full max-w-none h-auto"
                : "max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full"
            } ${isLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>

        {/* Modal Footer / Details */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Official Recognition • Oracle Eye Hospital</span>
          </div>
          <span className="hidden sm:inline-block text-slate-500">
            Click outside or press Esc to close
          </span>
        </div>
      </div>
    </div>
  );
}
