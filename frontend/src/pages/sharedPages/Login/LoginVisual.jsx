import { BookOpen } from "lucide-react";

export const LoginVisual = () => (
  <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
    <img
      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop"
      alt="Bookshelf"
      className="w-full h-full object-cover opacity-50"
    />
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(49,46,129,0.6),rgba(15,23,42,0.9))] flex items-center justify-center p-20 text-center">
      <div className="max-w-[420px]">
        <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-[12deg] shadow-[0_20px_40px_rgba(15,23,42,0.4)]">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-serif text-[32px] font-bold text-white mb-6">
          "Books are a uniquely portable magic."
        </h2>
        <p className="text-indigo-200 text-lg italic m-0">— Stephen King</p>
      </div>
    </div>
  </div>
);
