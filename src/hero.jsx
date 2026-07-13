import { useEffect, useState } from 'react';
import { Search, MapPin, Clock, Globe } from 'lucide-react';
import { AutoComplete, DatePicker } from 'antd';
import SearchFilterModal from './searchFilterModal';

const { RangePicker } = DatePicker;

export default function Hero({ searchQuery, onSearchChange, selectedTag, onTagClick, onSearchSubmit, t }) {
  const [activeField, setActiveField] = useState(null);
  const [rangeValue, setRangeValue] = useState(null);
  const [tabVisible, setTabVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [locationOptions] = useState([
    { value: 'Hà Nội' },
    { value: 'Hồ Chí Minh' },
    { value: 'Đà Nẵng' },
    { value: 'Hội An' },
    { value: 'Sapa' },
  ]);

  useEffect(() => {
    const timer = window.requestAnimationFrame(() => setTabVisible(true));
    return () => window.cancelAnimationFrame(timer);
  }, []);

  return (
      <header className="relative bg-gradient-to-b from-emerald-50/60 via-[#f0f9f4] to-[#f7fbf8] py-20 px-4 overflow-hidden">
        <div className="absolute top-10 left-[-100px] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-[-100px] w-96 h-96 bg-teal-200/20 rounded-full blur-3xl -z-10"></div>
  
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.heroBadge}
            </span>
            
            <h2 className="font-extrabold text-4xl sm:text-6xl text-slate-800 leading-[1.15]">
              {t.heroTitle} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {t.heroHighlight}
              </span>
            </h2>
            
            <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {t.heroDesc}
            </p>
  
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className={`mb-5 inline-flex rounded-full border border-emerald-100 bg-white/80 px-5 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition duration-500 ${tabVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Globe className="h-4 w-4" />
                <span>{t.beGuideTitle}</span>
              </div>

              <form onSubmit={onSearchSubmit} className="group bg-white p-4 rounded-[32px] shadow-xl shadow-slate-200 border border-emerald-100 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:scale-[1.005] motion-safe:transform-gpu">
                <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_auto] gap-3">
                  <div
                    onClick={() => setFilterModalVisible(true)}
                    className={`rounded-3xl border border-slate-200/80 transition duration-300 cursor-pointer ${activeField === 'location' ? 'bg-[#f1f9f6] ring-2 ring-emerald-200 shadow-sm' : 'hover:border-emerald-200 hover:bg-[#f7fcf8]'}`}
                  >
                    <label className="flex items-center gap-2 px-4 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      <MapPin className="h-4 w-4 text-emerald-500" /> {t.heroLocationLabel}
                    </label>
                    <div className="px-4 pb-4 pt-3 text-slate-800 font-semibold text-sm sm:text-base">
                      {searchQuery}
                    </div>
                  </div>

                  <SearchFilterModal
                    visible={filterModalVisible}
                    onClose={() => setFilterModalVisible(false)}
                    searchQuery={searchQuery}
                    t={t}
                    locationOptions={locationOptions}
                  />

                  <div
                    onFocus={() => setActiveField('duration')}
                    onBlur={() => setActiveField(null)}
                    className={`rounded-3xl border border-slate-200/80 transition duration-300 ${activeField === 'duration' ? 'bg-[#f1f9f6] ring-2 ring-emerald-200 shadow-sm' : 'hover:border-emerald-200 hover:bg-[#f7fcf8]'}`}
                  >
                    <label className="flex items-center gap-2 px-4 pt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      <Clock className="h-4 w-4 text-emerald-500" /> {t.heroDurationLabel}
                    </label>
                    <RangePicker
                      value={rangeValue ?? undefined}
                      onCalendarChange={(value) => setRangeValue(value)}
                      onFocus={() => setActiveField('duration')}
                      onBlur={() => setActiveField(null)}
                      className="w-full rounded-3xl border-none bg-transparent px-4 py-3 text-slate-700 font-semibold"
                      placeholder={[t.heroDateStart, t.heroDateEnd]}
                      dropdownClassName="animated-dropdown"
                      picker="date"
                      format="DD/MM/YYYY"
                      showTime={false}
                      renderExtraFooter={() => null}
                    />
                  </div>

                  <button
                    type="submit"
                    className="relative overflow-hidden rounded-3xl bg-emerald-500 text-white font-bold px-8 py-4 text-sm sm:text-base shadow-lg shadow-emerald-200 transition duration-300 ease-out hover:bg-emerald-600 hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    <span className="absolute inset-0 rounded-3xl bg-emerald-300 opacity-0 transition duration-500 ease-out group-hover:opacity-20"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/80 animate-pulse"></span>
                      {t.heroSearch}
                    </span>
                  </button>
                </div>
              </form>
            </div>
  
            {/* Suggested Quick Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-400 pt-2">
              <span>{t.heroSuggestions}</span>
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
                <p className="font-bold text-sm text-slate-800">{t.heroTrust}</p>
                <p className="text-[11px] text-slate-400">{t.heroTrustSub}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  