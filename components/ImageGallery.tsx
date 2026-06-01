"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Real photographs of Nungwi, Zanzibar — where Geff & Hermenegilda will marry.
// Sourced from Wikimedia Commons (CC BY / CC BY-SA). See public/gallery/CREDITS.md.
const images = [
  { id: 1, src: "/gallery/nungwi-pano.jpg", alt: "Nungwi panorama, Zanzibar", w: 1400, h: 930 },
  { id: 2, src: "/gallery/nungwi-beach-1.jpg", alt: "Nungwi Beach, Zanzibar", w: 960, h: 573 },
  { id: 3, src: "/gallery/nungwi-shore-1.jpg", alt: "Turquoise water at Nungwi", w: 1400, h: 933 },
  { id: 4, src: "/gallery/nungwi-paradise.jpg", alt: "Paradise at Nungwi", w: 1400, h: 1050 },
  { id: 5, src: "/gallery/nungwi-beach-3.jpg", alt: "Nungwi Beach shoreline", w: 1400, h: 1054 },
  { id: 6, src: "/gallery/nungwi-white-sand.jpg", alt: "White sandy beach, Nungwi", w: 1400, h: 1050 },
  { id: 7, src: "/gallery/nungwi-shore-2.jpg", alt: "Nungwi coast, Zanzibar", w: 1400, h: 905 },
  { id: 8, src: "/gallery/nungwi-strand.jpg", alt: "On the beach at Nungwi", w: 1280, h: 960 },
  { id: 9, src: "/gallery/nungwi-beach-2.jpg", alt: "White sands of Nungwi", w: 776, h: 456 },
  { id: 10, src: "/gallery/nungwi-turtles.jpg", alt: "Sea life at Nungwi", w: 1400, h: 1867 },
];

export default function ImageGallery() {
  const [lb, setLb] = useState<number | null>(null);

  const prev = () => setLb((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLb((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.07 }}
            onClick={() => setLb(idx)}
            className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lb !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLb(null)}
          >
            <button onClick={() => setLb(null)} className="absolute top-4 right-4 w-9 h-9 card flex items-center justify-center text-zinc-400 hover:text-white z-10">
              <X size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 w-9 h-9 card flex items-center justify-center text-zinc-400 hover:text-white z-10">
              <ChevronLeft size={18} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 w-9 h-9 card flex items-center justify-center text-zinc-400 hover:text-white z-10">
              <ChevronRight size={18} />
            </button>
            <motion.div
              key={lb}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-3xl max-h-[82vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lb].src}
                alt={images[lb].alt}
                width={images[lb].w}
                height={images[lb].h}
                className="w-full h-full object-contain rounded-xl"
              />
              <p className="absolute bottom-3 inset-x-0 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                {lb + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
