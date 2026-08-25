import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Sparkles
} from 'lucide-react';

export interface ProjectImage {
  src: string;
  fullSrc?: string;
  title: string;
  description?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: 'institucional' | 'landing' | 'outros';
  categoryLabel: string;
  badge: string;
  description: string;
  tags: string[];
  cover: string;
  images: ProjectImage[];
}

interface ProjectLightboxProps {
  project: ProjectData | null;
  isOpen: boolean;
  initialImageIndex?: number;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  isOpen,
  initialImageIndex = 0,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Sync body scroll locking when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset zoom on image change
  const handleSelectImage = useCallback((index: number) => {
    setCurrentIndex(index);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    if (!project) return;
    const nextIdx = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
    handleSelectImage(nextIdx);
  }, [currentIndex, project, handleSelectImage]);

  const handleNext = useCallback(() => {
    if (!project) return;
    const nextIdx = currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
    handleSelectImage(nextIdx);
  }, [currentIndex, project, handleSelectImage]);

  // Zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.5, 1);
      if (nextScale === 1) setPosition({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleZoom = () => {
    if (scale > 1) {
      handleResetZoom();
    } else {
      setScale(2);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === '+' || e.key === '=') handleZoomIn();
      else if (e.key === '-' || e.key === '_') handleZoomOut();
      else if (e.key === '0') handleResetZoom();
      else if (e.key.toLowerCase() === 'f') toggleFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Mouse pan dragging when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || scale > 1) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  if (!isOpen || !project || project.images.length === 0) return null;

  const currentImage = project.images[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col bg-[#071B33]/95 backdrop-blur-2xl text-white select-none transition-all duration-300 animate-fadeIn"
      onMouseUp={handleMouseUp}
    >
      {/* 1. TOP HEADER TOOLBAR */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-slate-700/60 bg-[#071B33]/80 backdrop-blur-md">
        {/* Left: Project title & current caption */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-turquoise bg-brand-turquoise/15 px-2.5 py-0.5 rounded-full border border-brand-turquoise/30">
                {project.categoryLabel}
              </span>
              <h2 className="text-base md:text-lg font-bold tracking-tight text-white line-clamp-1">
                {project.title}
              </h2>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-0.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-brand-turquoise" />
              <span>{currentImage.title}</span>
            </p>
          </div>
        </div>

        {/* Center: Image counter & Zoom Level */}
        <div className="hidden md:flex items-center gap-3 bg-slate-800/70 border border-slate-700/70 px-4 py-1.5 rounded-full text-xs text-slate-300">
          <span className="font-mono font-semibold text-brand-turquoise">
            {currentIndex + 1} / {project.images.length}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span className="font-mono text-slate-400">
            {Math.round(scale * 100)}% zoom
          </span>
        </div>

        {/* Right: Controls & Close */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-xl p-1 gap-1">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 1}
              title="Diminuir Zoom (-)"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Resetar Zoom (0)"
              className="px-2 py-1 text-[11px] font-mono font-bold text-slate-300 hover:text-brand-turquoise rounded-lg hover:bg-slate-700/80 transition-colors"
            >
              1:1
            </button>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3.5}
              title="Aumentar Zoom (+)"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia (F)"}
            className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-brand-turquoise hover:bg-slate-700/80 transition-colors hidden sm:flex items-center justify-center"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            title="Fechar Álbum (Esc)"
            className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. MAIN VIEWPORT */}
      <div 
        ref={imageContainerRef}
        className="relative flex-1 flex items-center justify-center overflow-hidden p-4 md:p-8 cursor-default"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        {/* Subtle decorative orbital background glow */}
        <div className="absolute w-[600px] h-[600px] bg-brand-blue/10 rounded-full filter blur-[140px] pointer-events-none" />

        {/* Previous Navigation Button */}
        {project.images.length > 1 && (
          <button
            onClick={handlePrev}
            title="Foto Anterior (Seta Esquerda)"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-brand-blue border border-slate-700/80 text-white shadow-xl hover:shadow-brand-blue/30 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Next Navigation Button */}
        {project.images.length > 1 && (
          <button
            onClick={handleNext}
            title="Próxima Foto (Seta Direita)"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-brand-blue border border-slate-700/80 text-white shadow-xl hover:shadow-brand-blue/30 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group"
          >
            <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Active Project Screenshot Image with Zoom & Pan */}
        <div 
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
          }}
          onClick={() => {
            // If single clicked on image when scale=1, zoom in
            if (scale === 1) {
              setScale(2);
            }
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          <img
            src={currentImage.src}
            alt={`${project.title} - ${currentImage.title}`}
            className="max-w-[90vw] max-h-[68vh] md:max-h-[72vh] object-contain rounded-xl shadow-2xl border border-slate-700/60 transition-opacity duration-200"
            draggable={false}
          />
        </div>

        {/* Helper Hint banner when scale === 1 */}
        {scale === 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/70 backdrop-blur border border-slate-700/60 text-slate-400 text-[11px] px-3.5 py-1.5 rounded-full pointer-events-none z-20 flex items-center gap-2">
            <ZoomIn className="w-3.5 h-3.5 text-brand-turquoise" />
            <span>Clique na imagem ou use os botões para dar zoom</span>
          </div>
        )}
      </div>

      {/* 3. BOTTOM THUMBNAILS GALLERY STRIP */}
      <footer className="relative z-30 px-6 py-4 border-t border-slate-800/80 bg-[#071B33]/90 backdrop-blur-md flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 overflow-x-auto max-w-5xl w-full py-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {project.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectImage(idx)}
              className={`relative shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                idx === currentIndex
                  ? 'border-brand-turquoise shadow-lg shadow-brand-turquoise/30 scale-105'
                  : 'border-slate-700/60 opacity-60 hover:opacity-100 hover:border-slate-500'
              }`}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1">
                <span className="text-[9px] font-bold text-white truncate w-full text-left">
                  {img.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ProjectLightbox;
