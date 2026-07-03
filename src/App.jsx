import { useState, useEffect } from 'react';
import { Search, Calendar, Sparkles, X } from 'lucide-react';
import { INITIAL_GUIDES } from './data/guides';
import Navbar from './navbar';
import Hero from './hero';
import Footer from './footer';
import AuthModal from './authmodel';
import BookingModal from './bookingmodel';
import GuideCard from './guidecart';

export default function App() {
    const [guides, setGuides] = useState(INITIAL_GUIDES);
    const [searchQuery, setSearchQuery] = useState('');
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
  
    // Giả lập Gửi OTP thông qua email
    const handleSendOTP = (e) => {
      e.preventDefault();
      if (!regData.fullName || !regData.email || !regData.password) {
        setAlertMessage({ type: 'error', text: 'Vui lòng điền đầy đủ các trường thông tin đăng ký!' });
        return;
      }
      setIsLoading(true);
      setAlertMessage({ type: '', text: '' });
  
      // Giả lập cuộc gọi API
      setTimeout(() => {
        setIsLoading(false);
        setRegisterStep('otp');
        setOtpTimer(60); // 60 giây đếm ngược
        setAlertMessage({ 
          type: 'success', 
          text: 'Mã OTP bí mật đã được gửi thành công đến hòm thư đăng ký của bạn. Vui lòng kiểm tra!' 
        });
      }, 1200);
    };
  
    // Xác minh OTP để hoàn tất Đăng ký
    const handleVerifyOTP = (e) => {
      e.preventDefault();
      if (otpInput === '123456') {
        setIsLoading(true);
        setAlertMessage({ type: '', text: '' });
  
        setTimeout(() => {
          setIsLoading(false);
          setCurrentUser({
            name: regData.fullName,
            email: regData.email,
            role: regData.role === 'guide' ? 'Hướng dẫn viên' : 'Khách du lịch',
            avatar: regData.role === 'guide' 
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
          });
          setAlertMessage({ type: 'success', text: 'Tuyệt vời! Bạn đã xác minh tài khoản thành công.' });
          
          setTimeout(() => {
            closeAuthModal();
            // Xoá trắng các form nhập liệu
            setRegData({ fullName: '', email: '', password: '', role: 'traveler' });
          }, 1500);
        }, 1000);
      } else {
        setAlertMessage({ type: 'error', text: 'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại mã thử nghiệm (123456)' });
      }
    };
  
    // Đăng nhập tài khoản
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      if (!loginEmail || !loginPassword) {
        setAlertMessage({ type: 'error', text: 'Vui lòng cung cấp cả địa chỉ email và mật khẩu.' });
        return;
      }
      setIsLoading(true);
      setAlertMessage({ type: '', text: '' });
  
      setTimeout(() => {
        setIsLoading(false);
        setCurrentUser({
          name: "Nguyễn Huy Hoàng",
          email: loginEmail,
          role: "Khách du lịch",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        });
        closeAuthModal();
      }, 1000);
    };
  
    const handleLogout = () => {
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
        />
  
        {/* 2. KHU VỰC HERO BANNER */}
        <Hero 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedTag={selectedTag}
          onTagClick={handleTagClick}
          onSearchSubmit={handleSearchSubmit}
        />
  
        {/* 3. CÁCH THỨC HOẠT ĐỘNG */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-bold text-3xl sm:text-4xl text-slate-800">
              Kết Nối Nhanh Chóng Chỉ Với 3 Bước
            </h3>
            <p className="text-slate-500 font-medium">
              Global Friends mang lại quy trình xác thực chặt chẽ, tối ưu trải nghiệm cho hành trình du lịch hoàn hảo.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">01</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Search size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">Lọc và Chọn Lựa</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Tìm theo thành phố điểm đến, sở thích đặc biệt hoặc ngôn ngữ giao tiếp của bạn.
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">02</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Calendar size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">Thống Nhất Lịch Trình</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Gặp gỡ, trò chuyện trước về lịch trình tham quan thông qua tính năng trao đổi tiện lợi.
              </p>
            </div>
  
            <div className="bg-white p-8 rounded-3xl border border-emerald-50 hover:shadow-xl hover:shadow-emerald-50/40 transition duration-300 relative group">
              <span className="absolute -top-6 left-8 text-5xl font-black text-emerald-100/60 group-hover:text-emerald-200 transition duration-300">03</span>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 mt-2">
                <Sparkles size={22} />
              </div>
              <h4 className="font-bold text-lg mb-3">Khám Phá Địa Phương</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Dịch chuyển và trải nghiệm những địa danh dưới góc nhìn độc đáo, mộc mạc như người bản xứ.
              </p>
            </div>
          </div>
        </section>
  
        {/* 4. DANH SÁCH HƯỚNG DẪN VIÊN */}
        <section id="guides-section" className="bg-[#f0f9f4]/50 py-20 border-y border-emerald-100/40 scroll-mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="text-left space-y-2">
                <h3 className="font-bold text-3xl text-slate-800">Bạn Đồng Hành Nổi Bật</h3>
                <p className="text-slate-500 font-medium">Các hướng dẫn viên thân thiện đã được xác minh lý lịch và năng lực giao tiếp.</p>
              </div>
              {selectedTag && (
                <div className="self-start flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-bold">
                  Đang lọc: #{selectedTag}
                  <button onClick={() => handleTagClick(selectedTag)} className="hover:text-rose-600 font-black">
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
  
            {guides.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-emerald-200">
                <p className="text-slate-500 font-semibold text-lg">Không tìm thấy hướng dẫn viên nào phù hợp với yêu cầu.</p>
                <button 
                  onClick={() => { setGuides(INITIAL_GUIDES); setSearchQuery(''); setSelectedTag(''); }} 
                  className="text-emerald-600 underline font-bold mt-2 hover:text-emerald-700"
                >
                  Hiển thị tất cả hướng dẫn viên
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
  
        {/* 5. BANNER KHUYẾN KHÍCH GIA NHẬP */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-8 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-emerald-100">
              <div className="space-y-4 max-w-xl text-center md:text-left z-10">
                <h3 className="font-bold text-2xl sm:text-4xl">Trở Thành Một Người Bạn Bản Địa (Guide)</h3>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  Chia sẻ phong tục, ẩm thực và danh lam quê hương của bạn và gia tăng thu nhập vào khung giờ tự do. Đăng ký thẩm định hồ sơ trực tuyến hoàn toàn miễn phí!
                </p>
              </div>
              <button 
                onClick={() => openAuthModal('register')} 
                className="bg-white hover:bg-amber-400 text-emerald-950 hover:text-slate-900 font-extrabold px-8 py-4 rounded-2xl transition shadow-lg hover:-translate-y-0.5 whitespace-nowrap z-10"
              >
                Đăng ký làm Guide
              </button>
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full z-0"></div>
            </div>
          </div>
        </section>
  
        {/* 6. CHÂN TRANG */}
        <Footer />
  
        {/* 7. MODAL ĐĂNG NHẬP / ĐĂNG KÝ XÁC MINH OTP */}
        <AuthModal 
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
  
        {/* 8. MODAL ĐẶT LỊCH (BOOKING) */}
        <BookingModal 
          guide={bookingGuide}
          onClose={() => setBookingGuide(null)}
          onConfirm={confirmBooking}
          bookingSuccess={bookingSuccess}
          isLoading={isLoading}
        />
  
      </div>
    );
  }