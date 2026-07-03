import { ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <span className="font-bold text-xl">GF</span>
              </div>
              <span className="font-bold text-lg text-white tracking-widest">GLOBAL FRIENDS</span>
            </div>
            <p className="text-sm">Kiến tạo hành trình hạnh phúc, kết nối trải nghiệm văn hoá chân thực nhất toàn cầu.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Danh mục</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#guides-section" className="hover:text-white transition">Tìm bạn đồng hành</a></li>
              <li><a href="#" className="hover:text-white transition">Văn hóa bản địa</a></li>
              <li><a href="#" className="hover:text-white transition">Blog kinh nghiệm du lịch</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">GF Community</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Tuyển dụng hướng dẫn viên</a></li>
              <li><a href="#" className="hover:text-white transition">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white transition">Điều khoản sử dụng</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Nhận tin tức ưu đãi</h5>
            <p className="text-xs mb-4">Nhập email để cập nhật những chuyến hành trình hot nhất.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="bg-slate-800 text-white text-xs border-none rounded-xl px-3 py-2 w-full focus:ring-1 focus:ring-emerald-500" 
              />
              <button className="bg-emerald-500 text-white rounded-xl px-4 py-2 hover:bg-emerald-600 transition text-xs">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  