import { Search } from 'lucide-react';

export default function Hero({ searchQuery, onSearchChange, selectedTag, onTagClick, onSearchSubmit }) {
    return (
      <header className="relative bg-gradient-to-b from-emerald-50/60 via-[#f0f9f4] to-[#f7fbf8] py-20 px-4 overflow-hidden">
        <div className="absolute top-10 left-[-100px] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-[-100px] w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10"></div>
  
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Kết nối du lịch không ranh giới
            </span>
            
            <h2 className="font-extrabold text-4xl sm:text-6xl text-slate-800 leading-[1.15]">
              Đi xa hơn với <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Người Bạn Bản Địa
              </span>
            </h2>
            
            <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Khám phá tinh hoa văn hóa, món ngon độc lạ địa phương cùng mạng lưới đồng hành trẻ trung, uy tín của <strong className="text-emerald-600">GF</strong>.
            </p>
  
            <form onSubmit={onSearchSubmit} className="bg-white p-3 rounded-3xl shadow-xl shadow-slate-100 border border-emerald-100 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto lg:mx-0">
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="text-emerald-500 flex-shrink-0" size={20} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={onSearchChange}
                  placeholder="Nhập địa điểm (ví dụ: Hà Nội), thế mạnh hoặc tên..." 
                  className="w-full bg-transparent border-none py-2 focus:outline-none text-slate-700 font-medium placeholder-slate-400 text-sm sm:text-base"
                />
              </div>
              <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3.5 rounded-2xl transition shadow-lg shadow-emerald-200">
                Tìm kiếm
              </button>
            </form>
  
            {/* Suggested Quick Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-400 pt-2">
              <span>Đề xuất khám phá:</span>
              {["Văn hoá", "Ẩm thực", "Lịch sử", "Bãi biển", "Chụp ảnh"].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    selectedTag === tag 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-200 hover:border-emerald-500 hover:text-emerald-600 bg-white'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
  
          {/* Right Graphic Banner */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute inset-0 bg-emerald-200/40 rounded-full blur-2xl -z-10 scale-105"></div>
            <div className="w-[430px] h-[430px] bg-slate-100 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white rotate-3 transition duration-500 hover:rotate-0">
              <img 
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80" 
                alt="Friends traveling" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-100">
              <div className="h-10 w-10 rounded-xl bg-amber-400 flex items-center justify-center text-white font-bold text-lg">
                ⭐
              </div>
              <div>
                <p className="font-bold text-sm text-slate-800">100% Tin Cậy</p>
                <p className="text-[11px] text-slate-400">Đã được xác thực lý lịch tư pháp</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  