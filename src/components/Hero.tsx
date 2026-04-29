// components/Hero.tsx
'use client';

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

export default function Hero() {
    return (
        <section className="relative w-full bg-slate-50 dark:bg-slate-950 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left: Copy & CTAs */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-start max-w-[65ch]"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
                        >
                            Stop Giving Away Your Time for Free
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed"
                        >
                            Scopix detects scope creep in real-time and drafts professional change-order emails so you get paid for extra work, not just extra hours.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <a
                                href="#pricing"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                            >
                                Start Protecting Your Scope
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
                            >
                                See How It Works
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Mockup Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="relative w-full aspect-[4/3] max-w-md mx-auto lg:mx-0 lg:ml-auto"
                    >
                        {/* Base Grid Pattern */}
                        <div className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:18px_18px] opacity-50" />
                        </div>

                        {/* Floating UI Cards */}
                        <div className="absolute top-6 left-4 right-4 sm:top-8 sm:left-6 sm:right-6">
                            {/* Main Dashboard Mock */}
                            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded" />
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                        🟢 Scope Health: Green
                                    </span>
                                </div>
                                <div className="space-y-2.5">
                                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-700/50 rounded" />
                                    <div className="h-2.5 w-3/4 bg-slate-100 dark:bg-slate-700/50 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Notification Card */}
                        <motion.div
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700 p-3.5 shadow-xl max-w-[200px]"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-sm">⚠️</div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">New Request</p>
                                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">+2 hrs out of scope</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}