// components/Footer.tsx
'use client';


export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <span className="text-xl font-bold text-slate-900 dark:text-white">
                                Scopix
                            </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed mb-6">
                            Work defined. Value protected. The smartest way for freelancers to detect scope creep and get paid fairly.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Twitter">
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="GitHub">
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {['Features', 'Pricing', 'Integrations', 'Changelog'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800 gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} Scopix. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                        Back to Top
                    </button>
                </div>
            </div>
        </footer>
    );
}