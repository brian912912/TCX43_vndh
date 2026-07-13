import { Modal, Button } from 'antd';
import { MapPin, X } from 'lucide-react';

export default function SearchFilterModal({ visible, onClose, searchQuery, t, locationOptions }) {
  const filterCategories = [
    {
      key: 'type',
      label: t.filterByType || 'Theo loại du khách',
      options: [
        { key: 'culture', label: t.optionCulture || '🏛️ Văn hóa địa phương' },
        { key: 'food', label: t.optionFood || '🍜 Ẩm thực' },
        { key: 'adventure', label: t.optionAdventure || '🏔️ Phiêu lưu / Thể thao' },
        { key: 'family', label: t.optionFamily || '👨‍👩‍👧‍👦 Gia đình' },
        { key: 'couple', label: t.optionCouple || '👫 Cặp đôi' },
        { key: 'group', label: t.optionGroup || '👥 Nhóm bạn' },
        { key: 'relax', label: t.optionRelax || '🌴 Thư giãn / Dã ngoại' },
      ]
    },
    {
      key: 'trend',
      label: t.filterByTrend || 'Theo xu hướng',
      options: [
        { key: 'hot', label: t.optionHot || '🔥 Đang hot' },
        { key: 'discover', label: t.optionDiscover || '✨ Khám phá mới' },
        { key: 'offbeat', label: t.optionOffbeat || '🛤️ Off the beaten path' },
        { key: 'heritage', label: t.optionHeritage || '📜 Lịch sử & Di tích' },
      ]
    },
    {
      key: 'budget',
      label: t.filterByBudget || 'Theo ngân sách',
      options: [
        { key: 'budget', label: t.optionBudget || '💰 Giá rẻ' },
        { key: 'value', label: t.optionValue || '💵 Tiết kiệm' },
        { key: 'premium', label: t.optionPremium || '✨ Cao cấp' },
        { key: 'luxury', label: t.optionLuxury || '👑 Luxury' },
      ]
    }
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-lg font-bold text-slate-800">
          <span>Tìm kiếm</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={
        <div className="flex gap-3 justify-end">
          <Button onClick={onClose} style={{ 
            borderRadius: '24px',
            height: '44px'
          }}>
            Đóng
          </Button>
          <Button type="primary" style={{ 
            backgroundColor: '#10b981', 
            borderRadius: '24px',
            height: '44px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Tìm kiếm
          </Button>
        </div>
      }
      width={680}
      style={{ top: '20px' }}
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
    >
      {/* Location Selector */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="h-5 w-5 text-emerald-500" />
          <label className="text-sm font-bold text-slate-600 uppercase tracking-[0.22em]">
            Địa điểm
          </label>
        </div>
        <div className="relative">
          <select 
            value={searchQuery}
            className="w-full px-4 py-3 rounded-2xl border border-emerald-200 bg-white text-slate-800 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-200 appearance-none cursor-pointer"
            style={{ paddingRight: '40px' }}
          >
            {locationOptions.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.value}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Categories */}
      {filterCategories.map((category) => (
        <div key={category.key} className="mb-8 pb-6 border-b border-slate-100 last:border-b-0">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-[0.22em] mb-4">
            {category.label}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {category.options.map((option) => (
              <button
                key={option.key}
                className="px-4 py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-700 font-medium text-sm transition duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </Modal>
  );
}
