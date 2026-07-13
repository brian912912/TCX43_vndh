import { LogOut, Globe } from 'lucide-react';

export default function Navbar({ currentUser, onLogout, onOpenAuth, language, setLanguage, t }) {
    return (
      <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <span className="font-extrabold text-2xl tracking-wider">GF</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 tracking-tight leading-none">GLOBAL FRIENDS</h1>
              <p className="text-[10px] text-emerald-600 font-extrabold tracking-widest uppercase mt-1">Traveler Network</p>
            </div>
          </div>
  
          {/* Links & CTA */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 font-semibold text-slate-600">
              <a href="#how-it-works" className="hover:text-emerald-600 transition duration-200">{t.navHow}</a>
              <a href="#guides-section" className="hover:text-emerald-600 transition duration-200">{t.navGuides}</a>
            </div>
  
            {/* Language toggle: always visible and prominent */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              aria-label={`${language === 'vi' ? 'EN' : 'VI'} language toggle`}
              className="mr-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 text-sm font-bold shadow-lg transform transition duration-250 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{language === 'vi' ? 'EN' : 'VI'}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3 bg-emerald-50/80 py-1.5 pl-3 pr-4 rounded-full border border-emerald-100">
                <img 
                  src={currentUser.avatar} 
                  alt="User Avatar" 
                  className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover" 
                />
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">{currentUser.name}</p>
                  <p className="text-[9px] text-emerald-600 font-semibold mt-0.5">{currentUser.role}</p>
                </div>
                <button 
                  onClick={onLogout} 
                  className="text-slate-400 hover:text-rose-500 ml-2 transition" 
                  title={t.logout}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onOpenAuth('login')} 
                  className="text-slate-600 hover:text-emerald-600 font-bold px-4 py-2 text-sm transition"
                >
                  {t.login}
                </button>
                <button 
                  onClick={() => onOpenAuth('register')} 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-2xl text-sm transition shadow-lg shadow-emerald-100 hover:-translate-y-0.5"
                >
                  {t.register}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }