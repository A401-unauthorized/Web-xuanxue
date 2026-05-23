import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // 模拟 ChatGPT 的系统初始化提示
  const systemLogs = [
    "System initialized. Ready for metaphysical computations.",
    "输入出生时空坐标或随机念头，即可开始推演。"
  ];

  const features = [
    {
      id: '01',
      title: '四柱八字分析',
      desc: '解析天干地支、五行损益与大运流年。基于传统命理矩阵算法。',
      badge: 'BAZI-CORE v1.0',
      action: () => navigate('/bazi'),
      buttonText: '开始分析',
    },
    {
      id: '02',
      title: '梅花易数断事',
      desc: '以心动念，捕捉当前时空节点随机起卦，推演事件吉凶演变。',
      badge: 'MEIHUA-ENGINE',
      action: () => navigate('/meihua'),
      buttonText: '启动起卦',
    },
  ];

  return (
    // 使用 ChatGPT 标志性的极暗碳黑背景 (bg-[#202123] 或 bg-[#0d0d0d])
    <div className="min-h-screen bg-[#0d0d0d] text-[#ececf1] font-sans selection:bg-[#5436da]">
      
      {/* 极简主容器 */}
      <div className="mx-auto max-w-2xl px-6 py-12 md:py-24">
        
        {/* 顶部 Header：学 ChatGPT 保持极度低调 */}
        <header className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
          <div className="flex items-center gap-3">
            {/* 类似 GPT 的简洁几何 Logo */}
            <div className="w-8 h-8 rounded-sm bg-[#10a37f] text-white flex items-center justify-center font-semibold text-sm tracking-tighter">
              ☯
            </div>
            <div>
              <div className="text-sm font-medium tracking-wide text-white">MysticAI</div>
              <div className="text-xs text-zinc-500">Models: Bazi-Matrix & Meihua-v1</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#10a37f] bg-[#10a37f]/10 px-2.5 py-1 rounded-md border border-[#10a37f]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10a37f] animate-pulse"></span>
            Ready
          </div>
        </header>

        {/* 主欢迎语：ChatGPT 经典的居中大字与干净介绍 */}
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-4">
            今天想推演什么？
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400 max-w-md">
            融汇传统数术与现代极简交互。请选择下方的核心模块，或直接通过控制台查看系统状态。
          </p>
        </section>

        {/* 功能列表：改用 ChatGPT 经典对话框/提示卡片样式（单色、微高亮、硬朗边框） */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={item.action}
              className="group relative rounded-xl border border-white/10 bg-[#171717] p-5 hover:bg-[#212121] hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                  {item.badge}
                </div>
                <h2 className="text-base font-medium text-white flex items-center justify-between">
                  {item.title}
                  {/* 右侧微小箭头，ChatGPT 提示词卡片常见设计 */}
                  <span className="text-zinc-500 group-hover:translate-x-0.5 group-hover:text-white transition-all text-xs">
                    →
                  </span>
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6">
                <span className="inline-flex items-center text-xs font-medium text-[#10a37f] group-hover:underline">
                  {item.buttonText}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 控制台/日志区：模仿 ChatGPT 代码块/系统提示的硬核极简感 */}
        <section className="rounded-xl border border-white/10 bg-[#171717] p-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3 text-zinc-500">
            <span>TERMINAL LOGS</span>
            <span>SECURE CHANNEL</span>
          </div>
          <div className="space-y-1.5 text-zinc-400">
            {systemLogs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-[#10a37f] select-none">&gt;</span>
                <p className="truncate">{log}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 底部版权/免责提示：模仿 OpenAI 底部的小字提示 */}
        <footer className="mt-16 text-center text-[11px] text-zinc-600">
          MysticAI may provide traditional philosophical guidance. Use with logic and discretion.
        </footer>

      </div>
    </div>
  );
}