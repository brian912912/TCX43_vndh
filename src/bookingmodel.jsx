import { X, ShieldCheck, MapPin, Phone } from 'lucide-react';

export default function BookingModal({ guide, onClose, onConfirm, bookingSuccess, isLoading, t }) {
    if (!guide) return null;
  
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden transform transition-all duration-300 relative">
          
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center transition"
          >
            <X size={16} />
          </button>
  
          {bookingSuccess ? (
            <div className="p-8 text-center space-y-6">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <ShieldCheck size={36} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-xl text-slate-800">{t.bookingSuccessTitle}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t.bookingSuccessDesc} <strong>{guide.name}</strong>. {t.bookingSuccessSub}
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl text-sm transition shadow-md"
              >
                {t.bookingComplete}
              </button>
            </div>
          ) : (
            <form onSubmit={onConfirm} className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h4 className="font-bold text-xl text-slate-800">{t.bookingTitle}</h4>
                <p className="text-slate-500 text-sm">{t.bookingSubtitle}</p>
              </div>
  
              <div className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/60">
                <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h5 className="font-bold text-slate-800">{guide.name}</h5>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-emerald-500" /> {guide.location}
                  </p>
                </div>
              </div>
  
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.bookingPhone}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Phone size={14} />
                    </span>
                    <input 
                      type="tel" 
                      required 
                      placeholder="09xx xxx xxx" 
                      className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
                </div>
  
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.bookingStartDate}</label>
                    <input 
                      type="date" 
                      required 
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.bookingHours}</label>
                    <input 
                      type="number" 
                      min="1" 
                      defaultValue="4" 
                      required 
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium text-slate-600"
                    />
                  </div>
                </div>
              </div>
  
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <span className="font-bold text-slate-400">{t.bookingBasePrice}</span>
                <span className="font-extrabold text-lg text-emerald-600">${guide.rate}/giờ</span>
              </div>
  
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-2xl transition shadow-lg"
              >
                {isLoading ? 'Đang gửi yêu cầu đặt lịch...' : t.bookingConfirm}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
  