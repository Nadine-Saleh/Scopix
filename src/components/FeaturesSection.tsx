// components/FeaturesSection.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, FileEdit, Activity, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
        }
    })
};

const iconPulse = {
    animate: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const features = [
        {
            icon: ShieldCheck,
            title: "Scope Intelligence",
            benefit: "Never guess if a task is billable",
            desc: "Auto-matches client requests to your signed agreement and flags out-of-scope work instantly using smart NLP matching.",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-500/10 to-cyan-500/10",
            borderColor: "group-hover:border-blue-500/50"
        },
        {
            icon: FileEdit,
            title: "Change-Order Builder",
            benefit: "Get paid for extra work, not just hours",
            desc: "One-click professional client emails that clearly justify additional charges. No more awkward conversations.",
            gradient: "from-blue-600 to-indigo-600",
            bgGradient: "from-blue-600/10 to-indigo-600/10",
            borderColor: "group-hover:border-blue-600/50"
        },
        {
            icon: Activity,
            title: "Scope Health Dashboard",
            benefit: "Spot creeping projects before they drain profits",
            desc: "Red/Yellow/Green risk indicators per project so you know exactly where to intervene before it's too late.",
            gradient: "from-blue-500 to-blue-700",
            bgGradient: "from-blue-500/10 to-blue-700/10",
            borderColor: "group-hover:border-blue-700/50"
        }
    ];

    return (
        <section id="features" ref={sectionRef} className="relative py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.02),transparent_50%)]" />
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header with Animation */}
                <motion.div
                    style={{ y }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-6"
                    >
                        <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">The Solution</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        How Scopix{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                            Fixes It
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                        Unlike bloated freelance suites, Scopix does one thing perfectly:{' '}
                        <span className="text-slate-900 dark:text-white font-semibold">protects your boundaries</span> so you get paid fairly.
                    </motion.p>
                </motion.div>

                {/* Features Grid with 3D Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10" style={{ perspective: '1000px' }}>
                    {features.map((item, idx) => (
                        <motion.div
                            key={idx}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            whileHover={{
                                y: -12,
                                rotateX: 5,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            {/* Gradient Border Glow */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500`} />

                            <div className={`relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${item.borderColor}`}>
                                {/* Animated Background Gradient */}
                                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.bgGradient} rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Icon Container with Gradient */}
                                <motion.div
                                    variants={iconPulse}
                                    animate="animate"
                                    className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                >
                                    <item.icon className="h-8 w-8" />
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                    {item.title}
                                </h3>

                                <div className="mb-4">
                                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} font-semibold text-base mb-2`}>
                                        {item.benefit}
                                    </p>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {item.desc}
                                </p>

                                {/* CTA Arrow */}
                                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    <span className="text-sm font-semibold">Learn more</span>
                                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                </div>

                                {/* Bottom Accent Line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                                {/* Corner Accent */}
                                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-transparent to-slate-100 dark:to-slate-800 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white dark:border-slate-900" />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                            Join 500+ freelancers protecting their scope
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}