import React from 'react';
import TimePicker from '../components/TimePicker';

export default function Qimen() {
  const [time, setTime] = React.useState('');
  const [method, setMethod] = React.useState('zhuan'); // zhuan or fei
  const [qiju, setQiju] = React.useState('chaibu'); // chaibu, zhirun, yinpan

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">奇门遁甲（占位）</h2>
        <p className="text-sm text-[#64748b] mb-4">时间选择与排盘方式（转盘/飞盘）及起局方式（拆补/置润/阴盘）已预留。</p>

        <div>
          <label className="text-sm text-[#4b5563]">起局时间</label>
          <div style={{ maxWidth: 420 }}>
            <TimePicker value={time} onChange={setTime} />
          </div>

          <div className="mt-4">
            <label className="text-sm text-[#4b5563]">排盘方式</label>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setMethod('zhuan')} className={`px-3 py-2 rounded-lg ${method==='zhuan' ? 'bg-[#0f1724] text-white' : 'bg-[#f1f5f9]'}`}>转盘</button>
              <button onClick={() => setMethod('fei')} className={`px-3 py-2 rounded-lg ${method==='fei' ? 'bg-[#0f1724] text-white' : 'bg-[#f1f5f9]'}`}>飞盘</button>
            </div>
          </div>

          <div className="mt-3">
            <label className="text-sm text-[#4b5563]">起局方式</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2"><input type="radio" name="qiju" checked={qiju==='chaibu'} onChange={() => setQiju('chaibu')} /> 拆补</label>
              <label className="flex items-center gap-2"><input type="radio" name="qiju" checked={qiju==='zhirun'} onChange={() => setQiju('zhirun')} /> 置润</label>
              <label className="flex items-center gap-2"><input type="radio" name="qiju" checked={qiju==='yinpan'} onChange={() => setQiju('yinpan')} /> 阴盘</label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-[#0f1724] text-white rounded-lg">开始排盘（占位）</button>
        </div>
      </div>
    </div>
  );
}
