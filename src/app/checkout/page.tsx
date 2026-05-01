// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Lock, CheckCircle2, ArrowLeft, ShieldCheck,
    Zap, AlertCircle, ChevronRight, Mail, User, Calendar, KeyRound
} from 'lucide-react';
import Link from 'next/link';

type Plan = 'monthly' | 'annual';

// Animation variants for form fields
const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const planParam = searchParams.get('plan') as Plan | null;
    const [selectedPlan, setSelectedPlan] = useState<Plan>(planParam || 'annual');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const plans = {
        monthly: { price: 12, label: 'Monthly', period: '/mo', total: 12, savings: 0 },
        annual: { price: 99, label: 'Annual', period: '/yr', total: 99, savings: 45 }
    };

    const currentPlan = plans[selectedPlan];

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
                return '';
            case 'cardNumber':
                if (!value) return 'Card number is required';
                if (!/^\d{16}$/.test(value.replace(/\s/g, ''))) return 'Enter a valid 16-digit card number';
                return '';
            case 'expiry':
                if (!value) return 'Expiry is required';
                if (!/^\d{2}\/\d{2}$/.test(value)) return 'Use MM/YY format';
                return '';
            case 'cvc':
                if (!value) return 'CVC is required';
                if (!/^\d{3,4}$/.test(value)) return 'Enter 3-4 digit CVC';
                return '';
            case 'name':
                if (!value) return 'Cardholder name is required';
                return '';
            default:
                return '';
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});

        const formData = new FormData(e.currentTarget);
        const errors: Record<string, string> = {};

        // Validate each field
        ['email', 'cardNumber', 'expiry', 'cvc', 'name'].forEach((field) => {
            const value = formData.get(field) as string;
            const error = validateField(field, value);
            if (error) errors[field] = error;
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            // Shake animation for first error field
            const firstError = Object.keys(errors)[0];
            const element = document.querySelector(`[name="${firstError}"]`);
            if (element) {
                element.animate(
                    [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }],
                    { duration: 200, iterations: 2 }
                );
            }
            return;
        }

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1800));
        setIsLoading(false);
        setIsSuccess(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        // Format card number with spaces
        if (name === 'cardNumber') {
            const cleaned = value.replace(/\D/g, '').slice(0, 16);
            const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = formatted;
        }
        // Format expiry with slash
        if (name === 'expiry') {
            const cleaned = value.replace(/\D/g, '').slice(0, 4);
            if (cleaned.length >= 3) {
                e.target.value = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
            } else {
                e.target.value = cleaned;
            }
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="text-center max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                        className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                    >
                        <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-slate-900 dark:text-white mb-3"
                    >
                        Welcome to Scopix
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                    >
                        Your <span className="font-semibold text-slate-900 dark:text-white">{currentPlan.label}</span> subscription is active.
                        Start protecting your scope and drafting professional change orders immediately.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Go to Dashboard <ChevronRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <Link
                        href="/#pricing"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group"
                    >
                        <motion.div
                            whileHover={{ x: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </motion.div>
                        Back to Pricing
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        Complete your subscription
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2 text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        Secure checkout. Cancel anytime. 7-day money-back guarantee.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Left Column: Payment Form */}
                    <div className="lg:col-span-3">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-7"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Account Info Section */}
                            <motion.section variants={fieldVariants}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Account Information
                                    </h2>
                                </div>

                                <div className="relative">
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'
                                            } ${formErrors.email ? 'text-red-500' : ''}`} />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="you@company.com"
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={handleInputChange}
                                            className={`w-full rounded-xl border-2 bg-white dark:bg-slate-900 pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${formErrors.email
                                                ? 'border-red-300 dark:border-red-700 focus:border-red-500'
                                                : focusedField === 'email'
                                                    ? 'border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/10'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                }`}
                                            aria-invalid={!!formErrors.email}
                                            aria-describedby={formErrors.email ? 'email-error' : undefined}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {formErrors.email && (
                                            <motion.p
                                                id="email-error"
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                                            >
                                                <AlertCircle className="h-3.5 w-3.5" />
                                                {formErrors.email}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.section>

                            {/* Payment Details Section */}
                            <motion.section variants={fieldVariants}>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        Payment Details
                                    </h2>
                                </div>

                                <div className="p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-5">
                                    {/* Card Number */}
                                    <motion.div variants={fieldVariants}>
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <CreditCard className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'cardNumber' ? 'text-blue-500' : 'text-slate-400'
                                                } ${formErrors.cardNumber ? 'text-red-500' : ''}`} />
                                            <input
                                                id="cardNumber"
                                                name="cardNumber"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="cc-number"
                                                required
                                                placeholder="0000 0000 0000 0000"
                                                maxLength={19}
                                                onFocus={() => setFocusedField('cardNumber')}
                                                onBlur={() => setFocusedField(null)}
                                                onChange={handleInputChange}
                                                className={`w-full rounded-xl border-2 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${formErrors.cardNumber
                                                    ? 'border-red-300 dark:border-red-700 focus:border-red-500'
                                                    : focusedField === 'cardNumber'
                                                        ? 'border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/10'
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                    }`}
                                                aria-invalid={!!formErrors.cardNumber}
                                                aria-describedby={formErrors.cardNumber ? 'cardNumber-error' : undefined}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {formErrors.cardNumber && (
                                                <motion.p
                                                    id="cardNumber-error"
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                                                >
                                                    <AlertCircle className="h-3.5 w-3.5" />
                                                    {formErrors.cardNumber}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Expiry & CVC Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div variants={fieldVariants}>
                                            <label htmlFor="expiry" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Expiry
                                            </label>
                                            <div className="relative">
                                                <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'expiry' ? 'text-blue-500' : 'text-slate-400'
                                                    } ${formErrors.expiry ? 'text-red-500' : ''}`} />
                                                <input
                                                    id="expiry"
                                                    name="expiry"
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete="cc-exp"
                                                    required
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    onFocus={() => setFocusedField('expiry')}
                                                    onBlur={() => setFocusedField(null)}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-xl border-2 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${formErrors.expiry
                                                        ? 'border-red-300 dark:border-red-700 focus:border-red-500'
                                                        : focusedField === 'expiry'
                                                            ? 'border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/10'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                        }`}
                                                    aria-invalid={!!formErrors.expiry}
                                                    aria-describedby={formErrors.expiry ? 'expiry-error' : undefined}
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {formErrors.expiry && (
                                                    <motion.p
                                                        id="expiry-error"
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -4 }}
                                                        className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                                                    >
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        {formErrors.expiry}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        <motion.div variants={fieldVariants}>
                                            <label htmlFor="cvc" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                CVC
                                            </label>
                                            <div className="relative">
                                                <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'cvc' ? 'text-blue-500' : 'text-slate-400'
                                                    } ${formErrors.cvc ? 'text-red-500' : ''}`} />
                                                <input
                                                    id="cvc"
                                                    name="cvc"
                                                    type="password"
                                                    inputMode="numeric"
                                                    autoComplete="cc-csc"
                                                    required
                                                    placeholder="123"
                                                    maxLength={4}
                                                    onFocus={() => setFocusedField('cvc')}
                                                    onBlur={() => setFocusedField(null)}
                                                    onChange={handleInputChange}
                                                    className={`w-full rounded-xl border-2 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${formErrors.cvc
                                                        ? 'border-red-300 dark:border-red-700 focus:border-red-500'
                                                        : focusedField === 'cvc'
                                                            ? 'border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/10'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                        }`}
                                                    aria-invalid={!!formErrors.cvc}
                                                    aria-describedby={formErrors.cvc ? 'cvc-error' : undefined}
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {formErrors.cvc && (
                                                    <motion.p
                                                        id="cvc-error"
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -4 }}
                                                        className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                                                    >
                                                        <AlertCircle className="h-3.5 w-3.5" />
                                                        {formErrors.cvc}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>

                                    {/* Cardholder Name */}
                                    <motion.div variants={fieldVariants}>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Cardholder Name
                                        </label>
                                        <div className="relative">
                                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'name' ? 'text-blue-500' : 'text-slate-400'
                                                } ${formErrors.name ? 'text-red-500' : ''}`} />
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                autoComplete="cc-name"
                                                required
                                                placeholder="Full name on card"
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                onChange={handleInputChange}
                                                className={`w-full rounded-xl border-2 bg-slate-50 dark:bg-slate-950 pl-12 pr-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0 transition-all ${formErrors.name
                                                    ? 'border-red-300 dark:border-red-700 focus:border-red-500'
                                                    : focusedField === 'name'
                                                        ? 'border-blue-500 dark:border-blue-500 ring-4 ring-blue-500/10'
                                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                    }`}
                                                aria-invalid={!!formErrors.name}
                                                aria-describedby={formErrors.name ? 'name-error' : undefined}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {formErrors.name && (
                                                <motion.p
                                                    id="name-error"
                                                    initial={{ opacity: 0, y: -4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -4 }}
                                                    className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
                                                >
                                                    <AlertCircle className="h-3.5 w-3.5" />
                                                    {formErrors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.section>

                            {/* Submit Button */}
                            <motion.div variants={fieldVariants} className="pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing securely...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="h-5 w-5" />
                                            Subscribe for ${currentPlan.total}.00
                                        </>
                                    )}
                                </motion.button>

                                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                    256-bit SSL encryption. Powered by Stripe.
                                </p>
                            </motion.div>
                        </motion.form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl p-6 lg:p-8 border-2 border-slate-200 dark:border-slate-700 shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-amber-500" />
                                Order Summary
                            </h2>

                            {/* Plan Selection Toggle */}
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6 relative">
                                {(['monthly', 'annual'] as const).map((plan) => (
                                    <button
                                        key={plan}
                                        type="button"
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all relative z-10 ${selectedPlan === plan
                                            ? 'text-slate-900 dark:text-white'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        {plans[plan].label}
                                    </button>
                                ))}
                                {/* Animated Background for Selected Plan */}
                                <motion.div
                                    layout
                                    className="absolute top-1 bottom-1 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
                                    initial={false}
                                    animate={{
                                        left: selectedPlan === 'monthly' ? '4px' : '50%',
                                        width: 'calc(50% - 8px)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                                {/* Save Badge */}
                                {selectedPlan === 'annual' && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-2 -right-2"
                                    >
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold shadow-lg shadow-amber-500/30">
                                            Save 17%
                                        </span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Plan Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            Scopix {currentPlan.label} Plan
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            ${currentPlan.price}.00 {currentPlan.period}
                                        </p>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">
                                        ${currentPlan.price}.00
                                    </span>
                                </div>

                                {selectedPlan === 'annual' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex justify-between items-start text-emerald-600 dark:text-emerald-400 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700"
                                    >
                                        <span className="text-sm font-medium flex items-center gap-1.5">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Annual Savings
                                        </span>
                                        <span className="text-sm font-bold">
                                            - ${currentPlan.savings}.00
                                        </span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-5 flex justify-between items-center mb-7">
                                <span className="text-base font-medium text-slate-900 dark:text-white">
                                    Total due today
                                </span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                    ${currentPlan.price}.00
                                </span>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-3.5 mb-7">
                                {[
                                    { icon: ShieldCheck, text: '7-day money-back guarantee', color: 'text-emerald-500' },
                                    { icon: Zap, text: 'Cancel anytime, no questions asked', color: 'text-amber-500' },
                                    { icon: CreditCard, text: 'Secure payment via Stripe', color: 'text-blue-500' }
                                ].map((badge, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        <badge.icon className={`h-5 w-5 ${badge.color} shrink-0`} />
                                        <span>{badge.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Help Note */}
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50">
                                <p className="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>
                                        Questions? Email us at{' '}
                                        <a href="mailto:support@scopix.dev" className="underline hover:text-blue-600 dark:hover:text-blue-200 font-medium transition-colors">
                                            support@scopix.dev
                                        </a>
                                    </span>
                                </p>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Lock className="h-4 w-4" />
                                <span>PCI-DSS compliant • Your data is encrypted</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}