import { X, CheckCircle, Mail, Lock, Clock } from 'lucide-react';

export default function AuthModal({
    t,
    isOpen, 
    onClose, 
    authTab, 
    setAuthTab, 
    registerStep, 
    setRegisterStep,
    regData,
    setRegData,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    otpInput,
    setOtpInput,
    otpTimer,
    onSendOTP,
    onVerifyOTP,
    onLoginSubmit,
    alertMessage,
    isLoading 
  }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden transform transition-all duration-300 relative">
          
          {/* Nút Đóng Modal */}
          <button 
            onClick={onClose} 
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center transition z-10"
          >
            <X size={16} />
          </button>
  
          {/* Tab Header */}
          <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50">
            <button 
              onClick={() => { setAuthTab('login'); }}
              className={`py-4 text-center font-extrabold text-sm transition-all duration-200 ${authTab === 'login' ? 'bg-white text-emerald-600 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t.authLogin.toUpperCase()}
            </button>
            <button 
              onClick={() => { setAuthTab('register'); setRegisterStep('info'); }}
              className={`py-4 text-center font-extrabold text-sm transition-all duration-200 ${authTab === 'register' ? 'bg-white text-emerald-600 border-b-2 border-emerald-500' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {t.authRegister.toUpperCase()}
            </button>
          </div>
  
          <div className="p-8 space-y-6">
            {/* Hộp thoại thông báo lỗi / thành công */}
            {alertMessage.text && (
              <div className={`p-4 rounded-2xl flex gap-3 text-sm font-semibold items-start leading-relaxed ${
                alertMessage.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                  : 'bg-rose-50 text-rose-800 border border-rose-100'
              }`}>
                <span className="mt-0.5">
                  {alertMessage.type === 'success' ? <CheckCircle size={16} className="text-emerald-600" /> : <X size={16} className="text-rose-600" />}
                </span>
                <p>{alertMessage.text}</p>
              </div>
            )}
  
            {/* BIỂU MẪU ĐĂNG NHẬP */}
            {authTab === 'login' && (
              <form onSubmit={onLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.authEmail}</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input 
                      type="email" 
                      required 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="yourname@gmail.com" 
                      className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
                </div>
  
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">{t.authPassword}</label>
                    <button
                      type="button"
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      {t.authForgot}
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input 
                      type="password" 
                      required 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
                </div>
  
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-2xl transition shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Đang xác minh đăng nhập...' : t.authSubmitLogin}
                </button>
              </form>
            )}
  
            {/* BIỂU MẪU ĐĂNG KÝ (2 Bước với OTP) */}
            {authTab === 'register' && (
              registerStep === 'info' ? (
                /* Bước 1: Điền thông tin cơ bản */
                <form onSubmit={onSendOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.authFullName}</label>
                    <input 
                      type="text" 
                      required 
                      value={regData.fullName}
                      onChange={(e) => setRegData({...regData, fullName: e.target.value})}
                      placeholder="Nguyễn Huy Hoàng" 
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.authEmailOtp}</label>
                    <input 
                      type="email" 
                      required 
                      value={regData.email}
                      onChange={(e) => setRegData({...regData, email: e.target.value})}
                      placeholder="yourname@gmail.com" 
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.authPassword}</label>
                    <input 
                      type="password" 
                      required 
                      value={regData.password}
                      onChange={(e) => setRegData({...regData, password: e.target.value})}
                      placeholder="Mật khẩu tối thiểu 6 ký tự..." 
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm font-medium"
                    />
                  </div>
  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.authRoleLabel}</label>
                    <select 
                      value={regData.role}
                      onChange={(e) => setRegData({...regData, role: e.target.value})}
                      className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm text-slate-600 font-bold"
                    >
                      <option value="traveler">{t.authRoleTraveler}</option>
                      <option value="guide">{t.authRoleGuide}</option>
                    </select>
                  </div>
  
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-2xl transition shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Đang gửi mã OTP...' : t.authContinueOtp}
                  </button>
                </form>
              ) : (
                /* Bước 2: Điền và kiểm tra mã OTP gửi về Mail */
                <form onSubmit={onVerifyOTP} className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-slate-600">
                      Chúng tôi đã gửi một mã xác minh OTP gồm 6 chữ số tới hòm thư của bạn:
                    </p>
                    <p className="font-bold text-emerald-600 bg-emerald-50 inline-block px-4 py-1 rounded-full text-sm border border-emerald-100/60">
                      {regData.email}
                    </p>
                  </div>
  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                      {t.authOtpTitle}
                    </label>
                    <input 
                      type="text" 
                      required 
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="000000" 
                      className="block w-full text-center text-3xl font-extrabold tracking-widest px-4 py-3 bg-slate-50 border-2 border-emerald-200 focus:border-emerald-500 rounded-2xl focus:outline-none transition"
                    />
                    <p className="text-xs text-center text-slate-400 font-medium">{t.authOtpHint}: <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">123456</span></p>
                  </div>
  
                  <div className="flex items-center justify-between text-xs font-bold">
                    <button 
                      type="button" 
                      onClick={() => { setRegisterStep('info'); }}
                      className="text-slate-400 hover:text-slate-600 transition flex items-center gap-1"
                    >
                      {t.authEditInfo}
                    </button>
                    
                    {otpTimer > 0 ? (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> Gửi lại sau ({otpTimer}s)
                      </span>
                    ) : (
                      <button 
                        type="button" 
                        onClick={onSendOTP}
                        className="text-emerald-600 hover:underline transition"
                      >
                        {t.authResend}
                      </button>
                    )}
                  </div>
  
                  <button 
                    type="submit" 
                    disabled={isLoading || otpInput.length < 6}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-2xl transition shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Đang xác minh OTP...' : t.authVerify}
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    );
  }