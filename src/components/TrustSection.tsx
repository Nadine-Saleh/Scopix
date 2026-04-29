// components/TrustSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, RefreshCw, Quote } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

const testimonials = [
    {
        name: "Alex Chen",
        role: "UI/UX Designer, 4 yrs freelance",
        quote: "Scopix caught a $450 scope creep request before I replied. The change-order email draft took 2 seconds. I got paid for the extra work instead of eating the cost."
    },
    {
        name: "Maya Rodriguez",
        role: "Technical Writer & Consultant",
        quote: "I used to lose hours every week manually checking contracts against new client messages. Now I just paste the request and Scopix flags it instantly. Worth every penny."
    },
    {
        name: "Jordan Smith",
        role: "Full-Stack Developer",
        quote: "Clients respect clear boundaries. Scopix helps me enforce them professionally without damaging relationships. My monthly revenue is up 22% since I started using it."
    }
];

const trustBadges = [
    { icon: ShieldCheck, label: "GDPR Compliant" },
    { icon: Lock, label: "No Data Sold" },
    { icon: CreditCard, label: "Stripe Secured" },
    { icon: RefreshCw, label: "7-Day Money-Back Guarantee" }
];

export default function TrustSection() {
    return (
        <section className="relative py-20 lg:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-14"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Trusted by freelancers who refuse to leave money on the table
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                        Join thousands of developers, designers, and writers protecting their scope daily.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
                >
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="group relative flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-slate-200 dark:text-slate-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/30 transition-colors duration-300" />

                            {/* Avatar Placeholder */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                                </div>
                            </div>

                            <blockquote className="flex-1">
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                                    "{t.quote}"
                                </p>
                            </blockquote>

                            {/* Verified Badge */}
                            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Verified Scope Protector</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Badges Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 pt-4 border-t border-slate-200 dark:border-slate-800"
                >
                    {trustBadges.map((badge, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <badge.icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-medium">{badge.label}</span>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}