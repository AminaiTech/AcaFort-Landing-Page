"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Trees, FileText, Clock, Coins, Info } from "lucide-react";

export default function ROICalculator() {
    const [students, setStudentCount] = useState(500);
    const [animatedStudents, setAnimatedStudents] = useState(500);

    // Smooth counter animation for students
    useEffect(() => {
        const duration = 800; // ms
        const startTime = performance.now();
        const startVal = animatedStudents;
        const endVal = students;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const ease = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(startVal + (endVal - startVal) * ease);
            setAnimatedStudents(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [students]);

    // ROI Calculations
    const termsPerYear = 3; // Standard academic terms per year
    const sheetsPerStudentPerTerm = 15; // Digitized termly items (registrations, reports, receipts, letters)
    const sheetsPerBox = 2500; // 5 reams of 500 sheets
    const sheetsPerTree = 8333; // Sheets of A4 paper per mature tree
    const costPerSheet = 30; // ₦30 blending paper reams + cartridge ink/toner + administrative overhead
    const adminHoursPerStudentPerYear = 2.5; // Compiling reports, writing receipts, sorting registration forms

    const sheetsSaved = Math.round(students * termsPerYear * sheetsPerStudentPerTerm);
    const boxesSaved = Math.round(sheetsSaved / sheetsPerBox);
    const treesSaved = (sheetsSaved / sheetsPerTree).toFixed(1);
    const hoursSaved = Math.round(students * adminHoursPerStudentPerYear);
    const moneySaved = Math.round(sheetsSaved * costPerSheet);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section id="roi" className="py-24 relative overflow-hidden bg-slate-950/60 border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-4"
                    >
                        <Calculator size={16} />
                        Interactive Impact Calculator
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Measure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Operational & Eco ROI</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Drag the slider below to select your school population and see the estimated resources, hours, and capital you will save annually by transitioning to Acafort.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Input Controls */}
                    <div className="lg:col-span-5 space-y-8 bg-slate-900/40 border border-white/5 p-8 sm:p-10 rounded-[2.5rem] backdrop-blur-2xl">
                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">School Size</label>
                                <span className="text-3xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                                    {animatedStudents.toLocaleString()}{" "}
                                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Students</span>
                                </span>
                            </div>

                            <div className="relative pt-6">
                                <input
                                    type="range"
                                    min="100"
                                    max="2500"
                                    step="50"
                                    value={students}
                                    onChange={(e) => setStudentCount(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
                                    style={{
                                        background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((students - 100) / 2400) * 100}%, #1e293b ${((students - 100) / 2400) * 100}%, #1e293b 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-slate-600 mt-3 font-semibold">
                                    <span>100</span>
                                    <span>500</span>
                                    <span>1,000</span>
                                    <span>1,500</span>
                                    <span>2,000</span>
                                    <span>2,500</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Info Card */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-3 text-sm text-slate-400 leading-relaxed">
                            <Info size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                            <p>
                                Estimates are calculated based on 3 academic terms per year, saving an average of 15 printed sheets per student per term across digitized registration forms, school news/notices, terminal report cards, and receipts.
                            </p>
                        </div>
                    </div>

                    {/* Output Cards */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                        {/* Cost Savings */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-indigo-500/30 hover:bg-slate-900/60 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                    <Coins size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Capital Savings</p>
                                    <h4 className="text-lg font-bold text-white mt-1">Direct Cost Saved</h4>
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-indigo-400 tracking-tight mb-2">
                                {formatCurrency(moneySaved)}
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-1">/ Year</span>
                            </div>
                            <p className="text-sm text-slate-500">Prevented expenditure on reams of paper, copying, receipts, and printing ink/toners.</p>
                        </motion.div>

                        {/* Paper Savings */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-cyan-500/30 hover:bg-slate-900/60 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Resource Reduction</p>
                                    <h4 className="text-lg font-bold text-white mt-1">Paper Saved</h4>
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-cyan-400 tracking-tight mb-2">
                                {sheetsSaved.toLocaleString()}
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-1"> Sheets</span>
                            </div>
                            <p className="text-sm text-slate-500">Equating to approximately <span className="text-white font-semibold">{boxesSaved} complete cartons</span> of A4 paper eliminated annually.</p>
                        </motion.div>

                        {/* Environmental Impact */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <Trees size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Environmental Value</p>
                                    <h4 className="text-lg font-bold text-white mt-1">Trees Conserved</h4>
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight mb-2">
                                {treesSaved}
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-1"> Trees</span>
                            </div>
                            <p className="text-sm text-slate-500">Helping your school prevent deforestation and directly support UN SDG 12 and SDG 15.</p>
                        </motion.div>

                        {/* Administrative Hours Saved */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 hover:bg-slate-900/60 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Productivity Gain</p>
                                    <h4 className="text-lg font-bold text-white mt-1">Hours Reclaimed</h4>
                                </div>
                            </div>
                            <div className="text-3xl font-extrabold text-amber-400 tracking-tight mb-2">
                                {hoursSaved.toLocaleString()}
                                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider ml-1"> Hrs</span>
                            </div>
                            <p className="text-sm text-slate-500">Reclaimed time spent computing grades, double-checking sheets, and record ledger tracking.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
