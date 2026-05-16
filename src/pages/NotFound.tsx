import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="text-[12rem] md:text-[16rem] font-bold text-main-theme/5 leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl md:text-8xl font-javanese text-main-theme">
            ꦲ
          </span>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-main-theme mb-2">
        Halaman tidak ditemukan
      </h1>
      <p className="text-sub-theme text-sm md:text-base max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="px-8 py-3 bg-main-theme/10 text-main-theme rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-main-theme/20 transition-all"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
