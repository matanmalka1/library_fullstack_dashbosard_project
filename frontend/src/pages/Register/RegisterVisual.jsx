export const RegisterVisual = () => (
  <div className="hidden lg:flex flex-1 relative overflow-hidden bg-indigo-900 order-1">
    <img
      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop"
      alt="Ancient Library"
      className="w-full h-full object-cover opacity-60"
    />
    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(15,23,42,0.85),rgba(49,46,129,0.4))] flex items-center justify-center p-20 text-center">
      <div className="max-w-[420px] text-indigo-100">
        <h2 className="font-serif text-4xl font-bold text-white mb-8">Your world, curated.</h2>
        <div className="grid gap-6 text-left font-medium">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center text-white font-bold">
              1
            </div>
            <p>Personalized recommendations based on your taste.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center text-white font-bold">
              2
            </div>
            <p>Exclusive access to signed editions and early releases.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/30 border border-white/20 flex items-center justify-center text-white font-bold">
              3
            </div>
            <p>Earn points with every purchase for future discounts.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
