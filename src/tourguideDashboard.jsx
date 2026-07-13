import { BadgeCheck, CalendarDays, CheckCircle2, Compass, MessageCircleMore, Search, Sparkles, UploadCloud, Users } from 'lucide-react';
import { Button, Card, Input, Upload, Calendar as AntCalendar } from 'antd';
import { useState } from 'react';
import { translations } from './translations';

const quickTags = ['Văn hóa', 'Ẩm thực', 'Lịch sử', 'Thiên nhiên', 'Phiêu lưu'];

const getModeCards = (t) => [
  {
    title: t.dashboardAdminTitle,
    description: t.dashboardAdminDesc,
    icon: Users,
    accent: 'from-[#00a877] to-[#0d6a57]',
  },
  {
    title: t.dashboardGuideTitle,
    description: t.dashboardGuideDesc,
    icon: Compass,
    accent: 'from-[#00a877]/90 to-[#112d32]',
  },
  {
    title: t.dashboardUserTitle,
    description: t.dashboardUserDesc,
    icon: MessageCircleMore,
    accent: 'from-[#ffb800] to-[#ff9800]',
  },
];

export default function TourguideDashboard({ t = translations.vi }) {
  const [nickname, setNickname] = useState('Nhi Tran');
  const [name, setName] = useState('Thanh Nhi');  const modeCards = getModeCards(t);
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="rounded-[32px] border border-[#dff4ea] bg-gradient-to-br from-[#effbf7] via-[#f7fcf9] to-[#f1f9f6] p-6 shadow-[0_30px_80px_-30px_rgba(0,168,119,0.35)] sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00a877]/20 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00a877]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.dashboardBadge}
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-black leading-tight text-[#112d32] sm:text-4xl lg:text-5xl">
                {t.dashboardTitle}
                <span className="block text-[#00a877]">{t.dashboardHighlight}</span>
              </h3>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {t.dashboardDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {quickTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#00a877]/20 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-[#183028]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: '4.9/5', text: t.dashboardStats[0] },
                { label: '24/7', text: t.dashboardStats[1] },
                { label: '100%', text: t.dashboardStats[2] },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#dff4ea] bg-white/80 p-4 shadow-sm">
                  <p className="text-lg font-black text-[#00a877]">{item.label}</p>
                  <p className="text-sm font-medium text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="!rounded-full !border-[#00a877] !bg-[#00a877] !px-6 !py-2.5 !text-sm !font-semibold !text-white transition-all duration-200 hover:!scale-[1.03] hover:!bg-[#00956b]">
                <span className="flex items-center gap-2">
                  <Search size={16} /> {t.dashboardSearch}
                </span>
              </Button>
              <Button className="!rounded-full !border-[#00a877]/20 !bg-white !px-6 !py-2.5 !text-sm !font-semibold !text-[#183028] transition-all duration-200 hover:!scale-[1.03] hover:!border-[#00a877] hover:!text-[#00a877]">
                <span className="flex items-center gap-2">
                  <Users size={16} /> {t.dashboardManage}
                </span>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[28px] border border-white bg-white p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80"
                alt="Tourguide profile preview"
                className="h-72 w-full rounded-[22px] object-cover sm:h-80"
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-[#ffb800] px-4 py-3 text-sm font-bold text-[#112d32] shadow-lg">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" /> 100% Trusted / Verified
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {modeCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[24px] border border-[#dff4ea] bg-white/80 p-5 shadow-sm">
                  <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-r ${card.accent} p-3 text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-bold text-[#112d32]">{card.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p>
                </div>
              );
            })}
          </div>

          <Card className="rounded-[24px] border border-[#dff4ea] bg-white/80 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00a877]">{t.dashboardInternal}</p>
                <h4 className="text-2xl font-bold text-[#112d32]">{t.dashboardCardTitle}</h4>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#effbf7] px-3 py-1 text-xs font-semibold text-[#00a877]">
                <CheckCircle2 className="h-4 w-4" /> {t.dashboardReady}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#183028]">{t.dashboardNickname}</label>
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="!rounded-2xl !border-[#dff4ea] !bg-[#f9fdfb] !py-2.5"
                    placeholder="Nickname"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#183028]">{t.dashboardName}</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="!rounded-2xl !border-[#dff4ea] !bg-[#f9fdfb] !py-2.5"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#183028]">{t.dashboardUploadTitle}</label>
                <Upload.Dragger
                  multiple
                  listType="picture"
                  beforeUpload={() => false}
                  className="rounded-2xl border-dashed border-[#00a877]/30 bg-[#f9fdfb]"
                >
                  <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                    <div className="rounded-full bg-[#effbf7] p-3 text-[#00a877]">
                      <UploadCloud className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-[#183028]">{t.dashboardUploadHint}</p>
                    <p className="text-xs text-slate-500">{t.dashboardUploadSub}</p>
                  </div>
                </Upload.Dragger>
              </div>
            </div>

            <div className="mt-6 rounded-[20px] border border-[#dff4ea] bg-[#f9fdfb] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#183028]">
                <CalendarDays className="h-4 w-4 text-[#00a877]" /> {t.dashboardCalendar}
              </div>
              <AntCalendar className="tourguide-calendar w-full rounded-2xl border border-[#dff4ea] bg-white p-2" fullscreen={false} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
