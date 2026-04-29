"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { id: 1, src: "https://picsum.photos/seed/wedding-1/800/600", alt: "Couple on the beach" },
  { id: 2, src: "https://picsum.photos/seed/zanzibar-coast/600/800", alt: "Zanzibar coastline" },
  { id: 3, src: "https://picsum.photos/seed/tropical-flowers/800/600", alt: "Tropical flowers" },
  { id: 4, src: "https://picsum.photos/seed/sunset-ocean/600/800", alt: "Sunset over the ocean" },
  { id: 5, src: "https://picsum.photos/seed/couple-portrait/800/600", alt: "Portrait" },
  { id: 6, src: "https://picsum.photos/seed/beach-walk/600/800", alt: "Beach walk" },
  { id: 7, src: "https://picsum.photos/seed/tropical-garden/800/600", alt: "Tropical garden" },
  { id: 8, src: "https://picsum.photos/seed/ocean-breeze/800/600", alt: "Ocean breeze" },
  { id: 9, src: "https://picsum.photos/seed/stone-town/600/800", alt: "Stone Town" },
  { id: 10, src: "https://picsum.photos/seed/romance-beach/800/600", alt: "Romantic beach" },
  { id: 11, src: "https://picsum.photos/seed/palm-trees/800/600", alt: "Palm trees" },
  { id: 12, src: "https://picsum.photos/seed/zanzibar-night/600/800", alt: "Zanzibar night" },
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
              width={800}
              height={600}
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
                width={800}
                height={600}
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
