"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

type LineConfig = {
  d: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  duration: number;
  delay: number;
  amp: { x: number; y: number; rotate: number };
};

const LINES: LineConfig[] = [
  {
    d: "M620 40 C 500 200, 560 380, 430 560 C 360 660, 380 720, 320 790",
    stroke: "#061A3A",
    strokeWidth: 1.5,
    opacity: 0.18,
    duration: 13,
    delay: 0,
    amp: { x: 6, y: 10, rotate: 0.8 },
  },
  {
    d: "M660 120 C 540 260, 600 420, 470 600 C 410 690, 430 730, 380 800",
    stroke: "#C99A3D",
    strokeWidth: 1.5,
    opacity: 0.35,
    duration: 17,
    delay: 1.2,
    amp: { x: 8, y: 12, rotate: 1 },
  },
  {
    d: "M560 0 C 470 140, 510 320, 400 480 C 340 570, 360 640, 300 720",
    stroke: "#061A3A",
    strokeWidth: 1,
    opacity: 0.12,
    duration: 11,
    delay: 0.6,
    amp: { x: 5, y: 8, rotate: 0.6 },
  },
  {
    d: "M700 260 C 600 340, 640 460, 540 560",
    stroke: "#C99A3D",
    strokeWidth: 1,
    opacity: 0.22,
    duration: 19,
    delay: 2,
    amp: { x: 7, y: 9, rotate: 0.9 },
  },
];

function AbstractLines({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <svg
      viewBox="0 0 700 800"
      fill="none"
      aria-hidden="true"
      className="absolute inset-y-0 right-0 hidden h-full w-[42vw] max-w-[620px] lg:block"
    >
      {LINES.map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          strokeLinecap="round"
          opacity={line.opacity}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, line.amp.x, -line.amp.x * 0.6, line.amp.x * 0.4, 0],
                  y: [0, -line.amp.y, line.amp.y * 0.5, -line.amp.y * 0.3, 0],
                  rotate: [0, line.amp.rotate, -line.amp.rotate * 0.6, line.amp.rotate * 0.3, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: line.duration,
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
      <circle cx="470" cy="600" r="3" fill="#C99A3D" opacity="0.5" />
      <circle cx="380" cy="800" r="2.5" fill="#061A3A" opacity="0.2" />
      <circle cx="620" cy="40" r="2.5" fill="#C99A3D" opacity="0.4" />
    </svg>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The video is shown directly (native <video>, object-fit via CSS below)
  // instead of being decoded off-screen onto a canvas — that hidden-video
  // trick was meant to dodge the browser's native media-control UI (PiP/cast
  // icon on hover), but translating a real video far outside the viewport
  // made some browsers throttle its decoding into never actually rendering
  // a frame (reported as the video/logo not showing at all on desktop). The
  // disablePictureInPicture/disableRemotePlayback/controlsList attributes on
  // the <video> below suppress that native UI instead, with zero risk to
  // playback since the video is a normal, fully "visible" element.
  //
  // A small canvas still sits on top, used only to paint a patch over the
  // sparkle glyph baked into the video (see drawSparklePatch) — much
  // cheaper than redrawing the whole frame every tick.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    // The video also has a small 4-pointed sparkle glyph baked into every
    // frame at a FIXED position (it doesn't move with the flowing gold
    // lines, unlike everything else) — measured by sampling frames across
    // the whole 10s loop. SPARKLE_SRC is its bounding box in the video's
    // native 1920x1080 space. A blurred/darkened patch was tried first, but
    // blurring a bright overlay just spreads its brightness into a bigger,
    // softer (and more visible) smudge. Instead this clone-stamps a patch
    // from elsewhere in the SAME frame (shifted up by SPARKLE_CLONE_DY,
    // where the gold lines pass but no sparkle sits) over the glyph — since
    // both source and destination come from the live frame every tick, the
    // cloned lines are always in whatever motion state the rest of the
    // frame is in, so it stays sharp and in sync instead of a blurred hole.
    const SPARKLE_SRC = { x: 1660, y: 830, w: 130, h: 140 };
    const SPARKLE_MARGIN = 45;
    const SPARKLE_CLONE_DY = -220;
    const patchCanvas = document.createElement("canvas");
    const patchCtx = patchCanvas.getContext("2d");

    const drawSparklePatch = (scale: number, offsetX: number, offsetY: number) => {
      if (!patchCtx) return;
      const srcX = SPARKLE_SRC.x - SPARKLE_MARGIN;
      const srcY = SPARKLE_SRC.y - SPARKLE_MARGIN;
      const srcW = SPARKLE_SRC.w + SPARKLE_MARGIN * 2;
      const srcH = SPARKLE_SRC.h + SPARKLE_MARGIN * 2;
      const patchW = Math.max(1, Math.round(srcW * scale));
      const patchH = Math.max(1, Math.round(srcH * scale));

      if (patchCanvas.width !== patchW || patchCanvas.height !== patchH) {
        patchCanvas.width = patchW;
        patchCanvas.height = patchH;
      }

      patchCtx.clearRect(0, 0, patchW, patchH);
      patchCtx.drawImage(video, srcX, srcY + SPARKLE_CLONE_DY, srcW, srcH, 0, 0, patchW, patchH);

      // Soft radial fade so the cloned patch blends into the sharp frame
      // around it instead of leaving a visible rectangular edge.
      const gradient = patchCtx.createRadialGradient(
        patchW / 2,
        patchH / 2,
        0,
        patchW / 2,
        patchH / 2,
        Math.min(patchW, patchH) / 2
      );
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.5, "rgba(0,0,0,1)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      patchCtx.globalCompositeOperation = "destination-in";
      patchCtx.fillStyle = gradient;
      patchCtx.fillRect(0, 0, patchW, patchH);
      patchCtx.globalCompositeOperation = "source-over";

      ctx!.drawImage(patchCanvas, offsetX + srcX * scale, offsetY + srcY * scale, patchW, patchH);
    };

    const draw = () => {
      try {
        const { videoWidth, videoHeight } = video;
        if (videoWidth && videoHeight && canvas.width && canvas.height) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Mirror the <video>'s own CSS `object-fit: cover` here so the
          // patch lands exactly where the video content actually renders.
          const scale = Math.max(canvas.width / videoWidth, canvas.height / videoHeight);
          const drawWidth = videoWidth * scale;
          const drawHeight = videoHeight * scale;
          const offsetX = (canvas.width - drawWidth) / 2;
          const offsetY = (canvas.height - drawHeight) / 2;
          drawSparklePatch(scale, offsetX, offsetY);
        }
      } catch {
        // A single bad frame (e.g. video seeking) should never stop the loop.
      }
      rafId = requestAnimationFrame(draw);
    };

    const tryPlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    };

    resize();
    tryPlay();
    draw();
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      className="relative flex min-h-[520px] flex-col overflow-hidden sm:min-h-[680px]"
      style={{
        background:
          "linear-gradient(135deg, #061A3A 0%, #031027 55%, #05070C 100%)",
      }}
    >
      {/* Shown directly, full-bleed (object-cover) on every breakpoint —
          disablePictureInPicture/disableRemotePlayback/controlsList
          suppress every native overlay (PiP hover icon, cast icon,
          right-click menu) without needing to hide the element itself. */}
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
      {/* Small canvas layered on top, used only to paint a patch over the
          video's baked-in sparkle glyph (see drawSparklePatch) — hidden for
          prefers-reduced-motion along with the rest of the motion here. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full motion-reduce:hidden"
      />
      {/* Very small, fixed-color scrim (same navy as the gradient above) so
          the brighter moment in the video loop doesn't wash out the white
          text — barely visible during the rest of the loop, where the video
          is already this dark. Hidden together with the canvas for
          prefers-reduced-motion, keeping the plain gradient untouched. */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#05070C]/40 motion-reduce:hidden" />

      <AbstractLines prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 flex flex-1 flex-col py-10 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[900px] px-4 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center text-[11px] font-medium uppercase tracking-[0.26em] text-gold-300"
          >
            Distribuidora de Produtos
          </motion.span>

          {/* The video's own "Della" logo (baked into every frame) sits
              centered in this section, roughly spanning its 35%–56% band
              regardless of viewport. The headline sits above that band; the
              rest of the copy below (see the large margin-top further down)
              — leaving the logo itself fully visible and unobstructed. */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-7 font-display text-[clamp(2.125rem,4.6vw,3.625rem)] font-semibold leading-[1.15] text-white"
          >
            {siteConfig.heroSlogan.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
        </div>

        <div className="mx-auto mt-[160px] w-full max-w-[900px] px-4 text-center sm:mt-[210px] sm:px-6 lg:mt-[250px] lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="mx-auto max-w-md text-[15px] leading-relaxed text-white/60"
          >
            Seu próximo best-seller está aqui.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/produtos"
              className="group flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-gold-400 hover:shadow-[0_18px_36px_-14px_rgba(213,168,75,0.45)]"
            >
              Conheça nossos produtos
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 flex items-center justify-center gap-8 border-t border-white/10 pb-2 pt-7"
          >
            {["Qualidade", "Confiança", "Resultados"].map((word) => (
              <span
                key={word}
                className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45"
              >
                {word}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
