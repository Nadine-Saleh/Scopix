// components/PricingSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const featuresMonthly = [
    "Real-time scope creep detection",
    "Unlimited change-order drafts",
    "Scope Health dashboard",
    "Professional email templates",
    "Priority support",
    "Cancel anytime"
];
const features = [
    "Real-time scope creep detection",
    "Unlimited change-order drafts",
    "Scope Health dashboard",
    "Professional email templates",
    "Project risk indicators",
    "Email/Slack integration",
    "Priority support",
    "Cancel anytime"
];

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="relative py-24 lg:py-32 bg-white dark:bg-slate-900 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mb-6"
                    >
                        <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Simple, Transparent Pricing</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Protect Your Value.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                            Pay Less Than One Unpaid Hour.
                        </span>
                    </h2>

                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Freelancers charge $50–$150/hour. Preventing just one unpaid revision cycle pays for Scopix for months.
                    </p>
                </motion.div>

                {/* Billing Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center items-center gap-4 mb-16"
                >
                    <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        Monthly
                    </span>

                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="relative h-8 w-14 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        aria-label="Toggle annual billing"
                    >
                        <motion.div
                            animate={{ x: isAnnual ? 24 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-1 left-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg"
                        />
                    </button>

                    <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        Annual
                    </span>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-lg shadow-amber-500/30"
                    >
                        <Star className="h-3 w-3 fill-white" />
                        Save 17%
                    </motion.div>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
                >
                    {/* Monthly Plan */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className={`relative rounded-3xl border-2 p-8 lg:p-10 transition-all duration-500 ${!isAnnual
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-2xl shadow-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl'
                            }`}
                    >
                        {!isAnnual && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold shadow-lg">
                                    <Zap className="h-4 w-4 fill-white" />
                                    Selected
                                </div>
                            </div>
                        )}

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                Monthly
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                Perfect for active projects
                            </p>

                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                                    $12
                                </span>
                                <span className="text-lg text-slate-500 dark:text-slate-400">
                                    /mo
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                Billed monthly
                            </p>
                        </div>

                        <Link
                            href="/checkout?plan=monthly"
                            className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 inline-flex items-center justify-center ${!isAnnual
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                Start Monthly
                            </motion.span>
                        </Link>

                        <ul className="mt-8 space-y-4">
                            {featuresMonthly.map((featureMonthly, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${!isAnnual ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-slate-100 dark:bg-slate-800'
                                        }`}>
                                        <Check className={`h-3.5 w-3.5 ${!isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                                            }`} />
                                    </div>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">
                                        {featureMonthly}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Annual Plan */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className={`relative rounded-3xl border-2 p-8 lg:p-10 transition-all duration-500 ${isAnnual
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-2xl shadow-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl'
                            }`}
                    >
                        {isAnnual && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold shadow-lg shadow-amber-500/30">
                                    <Star className="h-4 w-4 fill-white" />
                                    Best Value
                                </div>
                            </div>
                        )}

                        {/* Glow Effect */}
                        {isAnnual && (
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
                        )}

                        <div className="relative">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Annual
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Best value, billed yearly
                                </p>

                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                                        $99
                                    </span>
                                    <span className="text-lg text-slate-500 dark:text-slate-400">
                                        /yr
                                    </span>
                                </div>

                                <div className="mt-2 flex items-center justify-center gap-2">
                                    <span className="text-sm text-slate-400 line-through">$144/year</span>
                                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                        Save $45
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/checkout?plan=annual"
                                className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 inline-flex items-center justify-center ${isAnnual
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    Go Annual
                                </motion.span>
                            </Link>

                            <ul className="mt-8 space-y-4">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isAnnual ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-slate-100 dark:bg-slate-800'
                                            }`}>
                                            <Check className={`h-3.5 w-3.5 ${isAnnual ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                                                }`} />
                                        </div>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Trust & Guarantee Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Shield className="h-5 w-5 text-emerald-500" />
                                <span className="text-sm font-medium">Cancel anytime. No lock-in.</span>
                            </div>
                            <div className="hidden sm:block w-px h-5 bg-slate-300 dark:bg-slate-700" />
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                <Zap className="h-5 w-5 text-amber-500" />
                                <span className="text-sm font-medium">7-day money-back guarantee</span>
                            </div>
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Prices in USD. Secure payment processing via Stripe. All major cards accepted.
                        </p>
                    </div>

                    {/* Social Proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white dark:border-slate-900"
                                />
                            ))}
                        </div>
                        <p>
                            <span className="font-semibold text-slate-900 dark:text-white">500+</span> freelancers protecting their scope
                        </p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}