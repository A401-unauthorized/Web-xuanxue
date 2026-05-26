import React from 'react';
import TimePicker from './TimePicker';

export default function Qimen() {
  const [time, setTime] = React.useState('');

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">奇门遁甲（占位）</h2>
        <p className="text-sm text-[#64748b] mb-4">此处为奇门遁甲页面占位，时间选择支持转盘与手动输入（样式已预留）。</p>

        <div>
          <label className="text-sm text-[#4b5563]">起局时间</label>
          <div style={{ maxWidth: 420 }}>
            <TimePicker value={time} onChange={setTime} />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-[#0f1724] text-white rounded-lg">开始排盘（占位）</button>
        </div>
      </div>
    </div>
  );
}
