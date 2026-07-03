import { Star, MapPin, Languages } from 'lucide-react';

export default function GuideCard({ guide, onSelect }) {
    return (
      <div className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between">
        <div>
          <div className="relative h-56 bg-slate-100">
            <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm text-slate-800">
              <Star className="text-amber-400 fill-amber-400" size={14} /> {guide.rating} ({guide.reviews})
            </div>
          </div>
  
          <div className="p-5 space-y-4">
            <div>
              <h4 className="font-bold text-lg text-slate-800 hover:text-emerald-600 transition cursor-pointer">{guide.name}</h4>
              <p className="text-xs font-semibold text-slate-400 flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-emerald-500" /> {guide.location}
              </p>
            </div>
  
            <p className="text-xs text-slate-500 line-clamp-2 italic font-medium">
              "{guide.bio}"
            </p>
  
            <div className="flex flex-wrap gap-1.5">
              {guide.tags.map((tag, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
  
            <div className="border-t border-dashed border-slate-100 pt-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Mức giá</p>
                <p className="text-base font-extrabold text-emerald-600">${guide.rate}/giờ</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ngoại ngữ</p>
                <p className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end mt-0.5">
                  <Languages size={12} className="text-slate-400" /> {guide.languages[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="px-5 pb-5 pt-1">
          <button 
            onClick={() => onSelect(guide)} 
            className="w-full bg-slate-50 hover:bg-emerald-500 text-emerald-700 hover:text-white font-bold py-3 rounded-2xl text-sm transition-all duration-200"
          >
            Đặt lịch gặp gỡ
          </button>
        </div>
      </div>
    );
  }
  