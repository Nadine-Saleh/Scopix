// components/ProblemSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Clock, MessageSquareWarning } from 'lucide-react';
import { useRef } from 'react';

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

const floatingAnimation = {
    animate: {
        y: [-2, 2, -2],
        rotate: [-0.5, 0.5, -0.5],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export default function ProblemSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    const stats = [
        {
            icon: AlertTriangle,
            title: "Lost Revenue",
            stat: "72% of freelancers",
            highlight: "lose $100+/mo",
            suffix: "to unpaid revisions",
            desc: "Scope creep silently eats into your profits before you even realize it."
        },
        {
            icon: Clock,
            title: "Wasted Time",
            stat: "Manual contract checking",
            highlight: "wastes 3+ hrs/week",
            suffix: "of billable work",
            desc: "Hours spent cross-referencing emails and agreements could be billed instead."
        },
        {
            icon: MessageSquareWarning,
            title: "Relationship Strain",
            stat: "Late detection equals",
            highlight: "awkward conversations",
            suffix: "with clients",
            desc: "Asking for more money after work is done damages trust and delays payments."
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.02),transparent_50%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header with Parallax */}
                <motion.div
                    style={{ opacity, scale }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6"
                    >
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">The Hidden Cost</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        The Scope Creep{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                            Trap
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        Freelancers manually cross-check contracts, write awkward "this is extra" emails,
                        and ultimately lose revenue.
                    </motion.p>
                </motion.div>

                {/* Stats Grid with Enhanced Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {stats.map((item, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500" />

                            <div className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full" />

                                {/* Icon with Animation */}
                                <motion.div
                                    variants={floatingAnimation}
                                    animate="animate"
                                    className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-900/20 text-amber-600 dark:text-amber-400 shadow-sm group-hover:scale-110 transition-transform duration-300"
                                >
                                    <item.icon className="h-7 w-7" />
                                    {/* Animated Ring */}
                                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/30 animate-ping-slow" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    {item.title}
                                </h3>

                                <div className="mb-4">
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {item.stat}
                                    </p>
                                    <p className="text-amber-600 dark:text-amber-400 font-bold text-lg mt-1">
                                        {item.highlight}
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-500 text-sm">
                                        {item.suffix}
                                    </p>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                                    {item.desc}
                                </p>

                                {/* Decorative Bottom Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}