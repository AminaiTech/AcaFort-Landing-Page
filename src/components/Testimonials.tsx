"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, GraduationCap, Building2 } from "lucide-react";

const testimonials = [
    {
        quote: "We used to spend two weeks after examinations manually computing grade percentages, average scores, and handwriting report cards for 800+ students. With Acafort, teachers input scores directly, and report cards are generated instantly. The relief and efficiency is incredible.",
        name: "Mrs. Fatima Bello",
        role: "Proprietress",
        institution: "De-Gold Academy, Gusau",
        location: "Zamfara State"
    },
    {
        quote: "The Parent Portal has completely transformed our engagement. Parents now track their children's attendance and exam scores in real-time. Additionally, our administrative staff no longer write paper receipts for tuition payments; everything is logged digitally.",
        name: "Dr. Emmanuel Adebayo",
        role: "Director of Studies",
        institution: "Kingswood International Schools",
        location: "Lekki, Lagos"
    },
    {
        quote: "Our transition was remarkably smooth. We were operational in less than three weeks, and the staff training session provided by their developers was simple and thorough. The reduction in paper expenditure alone paid for our annual license size.",
        name: "Alhaji Ibrahim Musa",
        role: "Principal",
        institution: "Capital Model College",
        location: "Garki, Abuja"
    }
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 8000); // Auto rotation every 8s
        return () => clearInterval(timer);
    }, [activeIndex]);

    const handleNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 100 : -100,
            opacity: 0
        })
    };

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-950/20 border-t border-white/5">
            {/* Background Mesh Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Educational Leaders</span>
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Hear from the proprietresses, directors, and school administrators transforming their campuses with Acafort.
                    </p>
                </div>

                <div className="relative min-h-[380px] sm:min-h-[320px] bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 sm:p-12 md:p-16 flex flex-col justify-between backdrop-blur-xl">
                    {/* Quotation icon */}
                    <div className="absolute top-8 right-8 text-indigo-500/10 pointer-events-none">
                        <Quote size={120} fill="currentColor" />
                    </div>

                    <div className="overflow-hidden flex-1 relative flex items-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-6 sm:space-y-8"
                            >
                                <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium leading-relaxed italic pr-4">
                                    "{testimonials[activeIndex].quote}"
                                </p>

                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                                        <Building2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-white text-base tracking-tight leading-none sm:leading-normal">
                                            {testimonials[activeIndex].name}
                                        </h4>
                                        <p className="text-xs text-slate-500 font-semibold mt-1">
                                            {testimonials[activeIndex].role} &bull;{" "}
                                            <span className="text-indigo-400">{testimonials[activeIndex].institution}</span>,{" "}
                                            {testimonials[activeIndex].location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons and Dots */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                        {/* Dot Indicators */}
                        <div className="flex gap-2.5">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > activeIndex ? 1 : -1);
                                        setActiveIndex(index);
                                    }}
                                    className={`h-2 rounded-full transition-all ${
                                        activeIndex === index ? "w-8 bg-indigo-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Arrows */}
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center active:scale-90"
                                aria-label="Previous Testimonial"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center active:scale-90"
                                aria-label="Next Testimonial"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
