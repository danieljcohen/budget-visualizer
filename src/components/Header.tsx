export function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-navy-500/20 rounded-full blur-3xl" />
      
      <div className="relative px-6 py-12 text-center">
        {/* Greek letters */}
        <div className="mb-4">
          <span className="text-6xl font-display tracking-wider text-gold-400">
            ΣΧ
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
          Sigma Chi Beta Lambda
        </h1>
        
        <p className="text-xl text-navy-300 font-sans">
          2025-26 Academic Year Budget Tracker
        </p>
        
        {/* Decorative line */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-500/50" />
          <div className="w-2 h-2 rotate-45 bg-gold-500" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>
      </div>
    </header>
  );
}

