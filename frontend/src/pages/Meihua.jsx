import React, { useState } from "react";
import TimePicker from "../components/TimePicker";

function Meihua() {
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatForBackend = (value) => (value ? value.replace('T', ' ') : '');

  const handleSubmit = async () => {
    if (!time) return alert('请选择或输入时间');
    setLoading(true);
    try {
      const res = await fetch(`/meihua?time=${encodeURIComponent(formatForBackend(time))}`);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: '请求失败，请检查后端或网络' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#0f1724] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-md border border-[#e6eef8]">
        <h1 className="text-3xl font-semibold text-center mb-4">梅花易数</h1>

        <div className="space-y-4">
          <label className="block text-sm text-[#6b7280]">时间</label>
          <div style={{ maxWidth: 420 }}>
            <TimePicker value={time} onChange={setTime} />
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#0f1724] text-white rounded-xl p-3 text-lg font-semibold">
            {loading ? '排盘中...' : '起卦'}
          </button>
        </div>

        {result && (
          <div className="mt-6">
            <div className="border-t border-[#eef2f6] pt-6">
              <h2 className="text-xl font-bold mb-3 text-center">排盘结果</h2>
              <div className="text-center mb-4 text-5xl">{(result.upper_symbol || '☰') + ' ' + (result.lower_symbol || '☵')}</div>
              {result.error ? (
                <p className="text-red-500 text-center">{result.error}</p>
              ) : (
                <div className="space-y-2 text-base text-[#334155]">
                  <p>上卦：<strong>{result.upper_trigram || result.upper || '—'}</strong></p>
                  <p>下卦：<strong>{result.lower_trigram || result.lower || '—'}</strong></p>
                  <p>动爻：<strong>{result.moving_line ?? '—'}</strong></p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Meihua;
