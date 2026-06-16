"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle, Sparkles, Zap, ShieldAlert, ShieldCheck, HelpCircle as HelpIcon } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter Pack",
        description: "Core features for smaller primary or local institutions to begin digital records.",
        priceTermly: 350,
        icon: Zap,
        color: "text-blue-400 border-blue-500/10",
        bg: "bg-blue-400/5",
        ctaText: "Begin Onboarding",
        features: [
            "Smart academic records database",
            "Automated terminal reports",
            "Student registration profile tracker",
            "Teacher & Staff logs",
            "Termly class structures & levels",
            "Basic attendance register",
            "Standard security protocol"
        ]
    },
    {
        name: "Growth Suite",
        description: "The complete engine for expanding nursery, primary, and secondary schools.",
        priceTermly: 600,
        icon: Sparkles,
        color: "text-indigo-400 border-indigo-500/30 ring-2 ring-indigo-500/30",
        bg: "bg-indigo-400/5",
        featured: true,
        ctaText: "Start Free Trial",
        features: [
            "Smart academic records database",
            "Automated terminal reports",
            "Student registration profile tracker",
            "Teacher & Staff logs",
            "Termly class structures & levels",
            "Smart attendance + automatic SMS notifications",
            "Unified Parent Engagement Portal",
            "Interactive financial ledger & fee logs",
            "Real-time WhatsApp support access",
            "Advanced multi-tenant security isolation"
        ]
    },
    {
        name: "Fortress Enterprise",
        description: "Enterprise grade operations for large multi-campus school networks.",
        priceTermly: "Custom",
        icon: ShieldCheck,
        color: "text-emerald-400 border-emerald-500/10",
        bg: "bg-emerald-400/5",
        ctaText: "Contact Sales via WhatsApp",
        features: [
            "smart academic records database",
            "Automated terminal reports",
            "Student registration profile tracker",
            "Teacher & Staff logs",
            "Unified Parent Engagement Portal",
            "Interactive financial ledger & fee logs",
            "Custom white-labeled domain (e.g. portal.yourschool.com)",
            "Dedicated secure server & database replication",
            "Tailored staff workshops & onboarding sessions",
            "Priority developer support access",
            "Custom API integrations with accounting programs"
        ]
    }
];

export default function Pricing() {
    const [billingPeriod, setBillingPeriod] = useState<"termly" | "annual">("termly");

    const getPriceDisplay = (price: number | string) => {
        if (typeof price === "string") return price;
        
        let adjustedPrice = price;
        if (billingPeriod === "annual") {
            // 3 terms per year, 20% discount on total annual billing
            adjustedPrice = Math.round(price * 3 * 0.8);
        }

        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }).format(adjustedPrice);
    };

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950/40">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Predictable, Value-Driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Pricing</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
                        Select a termly license size customized for your institution. Cancel, pause, or adjust student counts at the start of any new term.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 relative mb-4">
                        <button
                            onClick={() => setBillingPeriod("termly")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10 ${
                                billingPeriod === "termly" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Termly Billing
                        </button>
                        <button
                            onClick={() => setBillingPeriod("annual")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative z-10 flex items-center gap-2 ${
                                billingPeriod === "annual" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Annual Billing
                            <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                Save 20%
                            </span>
                        </button>
                    </div>
                    <div className="text-xs text-slate-500 font-medium italic mt-1 mb-8">
                        * Annual billing covers all 3 terms of an academic year at a 20% discounted price.
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => {
                        const PlanIcon = plan.icon;
                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`rounded-[2.5rem] bg-slate-900/40 border p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group ${
                                    plan.featured 
                                        ? "border-indigo-500/40 bg-slate-900/80 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/20" 
                                        : "border-white/5 hover:border-white/10 hover:bg-slate-900/60"
                                }`}
                            >
                                {/* Featured Ribbon */}
                                {plan.featured && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-indigo-600 text-[10px] font-extrabold tracking-widest uppercase text-white py-1 px-10 rotate-45 translate-x-7 translate-y-4 shadow-lg shadow-indigo-500/20">
                                            Recommended
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex gap-4 items-center mb-6">
                                        <div className={`w-12 h-12 rounded-2xl ${plan.bg} ${plan.color.split(" ")[0]} flex items-center justify-center border border-white/5`}>
                                            <PlanIcon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium">Billed per student</p>
                                        </div>
                                    </div>

                                    <div className="mb-6 flex items-baseline gap-1">
                                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                                            {getPriceDisplay(plan.priceTermly)}
                                        </span>
                                        {typeof plan.priceTermly === "number" && (
                                            <span className="text-sm font-semibold text-slate-500 tracking-wide uppercase">
                                                / {billingPeriod === "termly" ? "Term" : "Year"}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                        {plan.description}
                                    </p>

                                    <div className="border-t border-white/5 pt-8 mb-8">
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Included capabilities</p>
                                        <ul className="space-y-3">
                                            {plan.features.map((feat) => (
                                                <li key={feat} className="flex gap-3 items-start text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                                    <Check size={16} className={`shrink-0 mt-0.5 ${plan.color.split(" ")[0]}`} />
                                                    <span className="capitalize">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href={plan.name === "Fortress Enterprise" ? "https://wa.me/2348136490129?text=Hello%20Acafort%2C%20we%20are%20interested%20in%20the%20Enterprise%20plan%20for%20our%20school%20network." : "/onboarding"}
                                        target={plan.name === "Fortress Enterprise" ? "_blank" : undefined}
                                        className={`block text-center py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                                            plan.featured
                                                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                                : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                                        }`}
                                    >
                                        {plan.ctaText}
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
