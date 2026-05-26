import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // ----- 实时时钟（精确到秒）-----
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const weekday = weekdays[now.getDay()];

  // ----- 导航项（点击跳转）-----
  const navItems = [
    { name: '个人中心', path: '/personal', icon: '👤' },
    { name: '我的案例', path: '/mycases', icon: '📚' },
    { name: '书籍参考', path: '/reference', icon: '📖' },
    { name: '联系我们', path: '/contact', icon: '☎️' },
  ];

  // ----- 四大功能按钮-----
  const mainButtons = [
    { name: '梅花易数', path: '/meihua', icon: '🌿', colorA: '#7dd3fc', colorB: '#38bdf8' },
    { name: '奇门遁甲', path: '/qimen', icon: '🌀', colorA: '#c7b2ff', colorB: '#8b5cf6' },
    { name: '八字', path: '/bazi', icon: '📜', colorA: '#ffd6a5', colorB: '#ffb86b' },
    { name: '神卜', path: '/shenbu', icon: '✨', colorA: '#c7f9cc', colorB: '#57dd8c' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#1e293b] font-sans">
      {/* 顶部导航栏 + 时钟 */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#e9edf2] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3">
          {/* Logo / 品牌（modernized 左侧） */}
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold bg-gradient-to-r from-[#1e2b3c] to-[#2c3e4e] bg-clip-text text-transparent">玄学·灵机</div>
            <div className="hidden sm:flex gap-2">
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 text-sm text-[#475569] bg-white border border-transparent hover:border-[#e6eef8] px-3 py-1 rounded-full shadow-sm transition-all"
                >
                  <span className="text-sm">{item.icon || ''}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 实时时钟区域 */}
          <div className="bg-[#f1f5f9] rounded-full px-4 py-1.5 text-sm font-mono shadow-inner">
            <span className="text-[#475569] mr-2">{formattedDate} {weekday}</span>
            <span className="font-semibold text-[#0f172a]">{formattedTime}</span>
          </div>
        </div>
      </div>

      <div className="main-bg-accent" />

      {/* 主要内容区：欢迎语 + 四宫格平分页面 */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 欢迎语 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-[#1f2a3e] to-[#2c3e50] bg-clip-text text-transparent">玄学排盘 · 洞悉天机</h1>
          <p className="text-[#5b6e8c] mt-2">梅花易数 · 奇门遁甲 · 八字命理 · 神卜灵签</p>
        </div>

        {/* 四宫格：每个按钮平分可视高度（减去头部与欢迎语），并带动效 */}
        <div style={{ height: 'calc(100vh - 220px)' }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainButtons.map((btn) => (
            <button
              key={btn.name}
              onClick={() => navigate(btn.path)}
              className="feature-btn h-full w-full flex flex-col items-center justify-center rounded-3xl p-6 text-white relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${btn.colorA || '#7dd3fc'}, ${btn.colorB || '#38bdf8'})` }}
            >
              <div className="feature-icon mb-4 text-5xl">{btn.icon}</div>
              <div className="text-xl font-bold drop-shadow-sm">{btn.name}</div>
              <div className="mt-3 text-sm opacity-90">点击进入 · 体验专业排盘</div>

              {/* small decorative floating dots */}
              <span className="float-dot" style={{ top: '10%', left: '15%' }} />
              <span className="float-dot" style={{ bottom: '12%', right: '12%', width: '14px', height: '14px' }} />
            </button>
          ))}
        </div>

        {/* 页脚提示 */}
        <div className="text-center text-xs text-[#94a3b8] border-t border-[#eef2f6] pt-4 mt-6">
          择时而起，感而遂通 —— 点击任一术数进入专属排盘界面
        </div>
      </div>
    </div>
  );
}