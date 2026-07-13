import { useState, useEffect } from 'react';
import { Search, Calendar, Sparkles, X } from 'lucide-react';
import { translations } from './translations';
import { INITIAL_GUIDES } from './data/guides';
import Navbar from './navbar';
import Hero from './hero';
import Footer from './footer';
import AuthModal from './authmodel';
import BookingModal from './bookingmodel';
import GuideCard from './guidecart';
import TourguideDashboard from './tourguideDashboard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5003/api';

export default function App() {
    const [guides, setGuides] = useState(INITIAL_GUIDES);
    const isTravelerUser = (user) => {
      const role = user?.role?.toLowerCase?.() || '';
      return role === 'traveler' || role === 'tourist' || role === 'traveller';
    };
    const [searchQuery, setSearchQuery] = useState('Hồ Chí Minh');
    const [selectedTag, setSelectedTag] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    
    // Trạng thái của Auth Modal
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
    const [registerStep, setRegisterStep] = useState('info'); // 'info' | 'otp'
    
    // Biểu mẫu Nhập
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regData, setRegData] = useState({
      fullName: '',
      email: '',
      password: '',
      role: 'traveler'
    });
    const [otpInput, setOtpInput] = useState('');
    
    // Trạng thái Timer & Alert
    const [otpTimer, setOtpTimer] = useState(0);
    const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
  
    // Trạng thái Đặt lịch (Booking)
    const [bookingGuide, setBookingGuide] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [language, setLanguage] = useState('vi');
    const shouldShowTravelerDashboard = isTravelerUser(currentUser);
    const t = translations[language];

    useEffect(() => {
      const savedUser = localStorage.getItem('tcx43_user');
      const savedToken = localStorage.getItem('tcx43_token');

      if (savedUser && savedToken) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('tcx43_user');
          localStorage.removeItem('tcx43_token');
        }
      }
    }, []);
  
    // Bộ đếm đếm ngược cho OTP
    useEffect(() => {
      let interval;
      if (otpTimer > 0) {
        interval = setInterval(() => {
          setOtpTimer((prev) => prev - 1);
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [otpTimer]);
  
    const handleSearchChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      filterGuides(value, selectedTag);
    };
  
    const handleTagClick = (tag) => {
      const nextTag = selectedTag === tag ? '' : tag;
      setSelectedTag(nextTag);
      filterGuides(searchQuery, nextTag);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      filterGuides(searchQuery, selectedTag);
    };
  
    const filterGuides = (query, tag) => {
      let filtered = INITIAL_GUIDES;
      if (query.trim() !== '') {
        const q = query.toLowerCase();
        filtered = filtered.filter(g => 
          g.name.toLowerCase().includes(q) || 
          g.location.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      if (tag) {
        filtered = filtered.filter(g => g.tags.includes(tag));
      }
      setGuides(filtered);
    };
  
    const openAuthModal = (tab) => {
      setAuthTab(tab);
      setRegisterStep('info');
      setAlertMessage({ type: '', text: '' });
      setIsAuthModalOpen(true);
    };
  
    const closeAuthModal = () => {
      setIsAuthModalOpen(false);
      setOtpInput('');
      setAlertMessage({ type: '', text: '' });
    };
  
    const handleSendOTP = async (e) => {
      e.preventDefault();
      if (!regData.fullName || !regData.email || !regData.password) {
        setAlertMessage({ type: 'error', text: 'Vui lòng điền đầy đủ các trường thông tin đăng ký!' });
        return;
      }

      setIsLoading(true);
      setAlertMessage({ type: '', text: '' });

      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: regData.fullName,
            email: regData.email,
            password: regData.password,
            role: regData.role === 'guide' ? 'Tour Guide' : 'Tourist'
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Đăng ký thất bại');
        }

        setRegisterStep('otp');
        setOtpTimer(300);
        setAlertMessage({ type: 'success', text: data.message || 'Mã OTP đã được gửi đến email của bạn.' });
      } catch (error) {
        setAlertMessage({ type: 'error', text: error.message });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleVerifyOTP = async (e) => {
      e.preventDefault();
      if (!otpInput) {
        setAlertMessage({ type: 'error', text: 'Vui lòng nhập mã OTP.' });
        return;
      }

      setIsLoading(true);
      setAlertMessage({ type: '', text: '' });

      try {
        const response = await fetch(`${API_URL}/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: regData.email, otp: otpInput })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Xác minh OTP thất bại');
        }

        localStorage.setItem('tcx43_token', data.token);
        localStorage.setItem('tcx43_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setAlertMessage({ type: 'success', text: 'Tài khoản đã được kích hoạt thành công.' });

        setTimeout(() => {
          closeAuthModal();
          setRegData({ fullName: '', email: '', password: '', role: 'traveler' });
          setOtpInput('');
        }, 1000);
      } catch (error) {
        setAlertMessage({ type: 'error', text: error.message });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      if (!loginEmail || !loginPassword) {
        setAlertMessage({ type: 'error', text: 'Vui lòng cung cấp cả địa chỉ email và mật khẩu.' });
        return;
      }

      setIsLoading(true);
      setAlertMessage({ type: '', text: '' });

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginEmail, password: loginPassword })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Đăng nhập thất bại');
        }

        localStorage.setItem('tcx43_token', data.token);
        localStorage.setItem('tcx43_user', JSON.stringify(data.user));
        setCurrentUser(data.user);
        setAlertMessage({ type: 'success', text: 'Đăng nhập thành công.' });

        setTimeout(() => {
          closeAuthModal();
          setLoginEmail('');
          setLoginPassword('');
        }, 1000);
      } catch (error) {
        setAlertMessage({ type: 'error', text: error.message });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('tcx43_token');
      localStorage.removeItem('tcx43_user');
      setCurrentUser(null);
    };
  
    const startBooking = (guide) => {
      setBookingGuide(guide);
      setBookingSuccess(false);
    };
  
    const confirmBooking = (e) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setBookingSuccess(true);
      }, 1200);
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-[#f7fbf8] text-slate-800 antialiased font-sans">
        
        {/* 1. THANH ĐIỀU HƯỚNG */}
        <Navbar 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          onOpenAuth={openAuthModal} 
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
  
        {/* 2. KHU VỰC HERO BANNER */}
        <Hero 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedTag={selectedTag}
          onTagClick={handleTagClick}
          onSearchSubmit={handleSearchSubmit}
          t={t}
        />
  
        {/* 3. TOURGUIDE DASHBOARD UI/UX */}
        {shouldShowTravelerDashboard && <TourguideDashboard t={t} />}

        {/* 4. CÁCH THỨC HOẠT ĐỘNG */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-bold text-3xl sm:text-4xl text-slate-800">
              {t.stepsTitle}
            </h3>
            <p className="text-slate-500 font-medium">
              {t.stepsSubtitle}
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">01</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Search size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">{t.step1Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {t.step1Desc}
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">02</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Calendar size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">{t.step2Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {t.step2Desc}
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">03</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Sparkles size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">{t.step3Title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </section>
  
        {/* 5. DANH SÁCH HƯỚNG DẪN VIÊN */}
        <section id="guides-section" className="bg-[#f0f9f4]/50 py-20 border-y border-emerald-100/40 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="text-left space-y-2">
                <h3 className="font-bold text-3xl text-slate-800">{t.guidesTitle}</h3>
                <p className="text-slate-500 font-medium">{t.guidesSubtitle}</p>
              </div>
              {selectedTag && (
                <div className="self-start flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold">
                  {t.filtering}: #{selectedTag}
                  <button onClick={() => handleTagClick(selectedTag)} className="hover:text-rose-600 font-black">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
  
            {guides.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-emerald-200">
                <p className="text-slate-500 font-semibold text-lg">{t.noGuideFound}</p>
                <button 
                  onClick={() => { setGuides(INITIAL_GUIDES); setSearchQuery(''); setSelectedTag(''); }} 
                  className="text-emerald-600 underline font-bold mt-2 hover:text-emerald-700"
                >
                  {t.showAllGuides}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {guides.map((guide) => (
                  <GuideCard 
                    key={guide.id} 
                    guide={guide} 
                    onSelect={startBooking} 
                  />
                ))}
              </div>
            )}
  
          </div>
        </section>
  
        {/* 6. BANNER KHUYẾN KHÍCH GIA NHẬP */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-emerald-100">
              <div className="space-y-4 max-w-xl text-center md:text-left z-10">
                <h3 className="font-bold text-2xl sm:text-4xl">{t.beGuideTitle}</h3>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  {t.beGuideDesc}
                </p>
              </div>
              <button 
                onClick={() => openAuthModal('register')} 
                className="bg-white hover:bg-amber-400 text-emerald-950 hover:text-slate-900 font-extrabold px-8 py-4 rounded-2xl transition shadow-lg hover:-translate-y-0.5 whitespace-nowrap z-10"
              >
                {t.beGuideCta}
              </button>
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full z-0"></div>
            </div>
          </div>
        </section>
  
        {/* 7. CHÂN TRANG */}
        <Footer t={t} />
  
        {/* 8. MODAL ĐĂNG NHẬP / ĐĂNG KÝ XÁC MINH OTP */}
        <AuthModal 
          t={t}
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          authTab={authTab}
          setAuthTab={setAuthTab}
          registerStep={registerStep}
          setRegisterStep={setRegisterStep}
          regData={regData}
          setRegData={setRegData}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          otpInput={otpInput}
          setOtpInput={setOtpInput}
          otpTimer={otpTimer}
          onSendOTP={handleSendOTP}
          onVerifyOTP={handleVerifyOTP}
          onLoginSubmit={handleLoginSubmit}
          alertMessage={alertMessage}
          isLoading={isLoading}
        />
  
        {/* 9. MODAL ĐẶT LỊCH (BOOKING) */}
        <BookingModal 
          t={t}
          guide={bookingGuide}
          onClose={() => setBookingGuide(null)}
          onConfirm={confirmBooking}
          bookingSuccess={bookingSuccess}
          isLoading={isLoading}
        />
  
      </div>
    );
  }