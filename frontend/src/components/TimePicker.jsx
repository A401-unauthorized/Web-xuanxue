import React, { useState, useEffect } from 'react';

// Props:
// value: string in format 'YYYY-MM-DDTHH:MM' (datetime-local style) or empty
// onChange: (value) => void
export default function TimePicker({ value, onChange, minYear = 1900, maxYear }) {
  const now = new Date();
  const defaultYear = now.getFullYear();
  maxYear = maxYear || defaultYear + 10;

  const parseValue = (v) => {
    if (!v) return {
      year: defaultYear,
      month: now.getMonth() + 1,
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes()
    };
    const parts = v.split('T');
    const date = parts[0].split('-').map(Number);
    const time = (parts[1] || '').split(':').map(Number);
    return {
      year: date[0] || defaultYear,
      month: date[1] || (now.getMonth() + 1),
      day: date[2] || now.getDate(),
      hour: time[0] ?? now.getHours(),
      minute: time[1] ?? now.getMinutes()
    };
  };

  const init = parseValue(value);

  const [mode, setMode] = useState('wheel'); // 'wheel' or 'manual'
  const [year, setYear] = useState(init.year);
  const [month, setMonth] = useState(init.month);
  const [day, setDay] = useState(init.day);
  const [hour, setHour] = useState(init.hour);
  const [minute, setMinute] = useState(init.minute);

  useEffect(() => {
    // when external value changes, update local state
    const p = parseValue(value);
    setYear(p.year); setMonth(p.month); setDay(p.day); setHour(p.hour); setMinute(p.minute);
  }, [value]);

  useEffect(() => {
    if (typeof onChange === 'function') {
      const mm = String(month).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      const hh = String(hour).padStart(2, '0');
      const min = String(minute).padStart(2, '0');
      onChange(`${year}-${mm}-${dd}T${hh}:${min}`);
    }
  }, [year, month, day, hour, minute]);

  const years = [];
  for (let y = maxYear; y >= minYear; y--) years.push(y);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const daysInMonth = (y, m) => new Date(y, m, 0).getDate();
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const setToNow = () => {
    const n = new Date();
    setYear(n.getFullYear()); setMonth(n.getMonth() + 1); setDay(n.getDate()); setHour(n.getHours()); setMinute(n.getMinutes());
  };

  return (
    <div className="timepicker w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className={`mode-pill ${mode === 'wheel' ? 'active' : ''}`} onClick={() => setMode('wheel')}>转盘选择</div>
        <div className={`mode-pill ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>手动输入</div>
        <button className="ml-auto text-sm text-[#6b7280]" onClick={setToNow}>现在</button>
      </div>

      {mode === 'manual' ? (
        <input
          type="datetime-local"
          value={`${String(year).padStart(4,'0')}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`}
          onChange={(e) => {
            const v = e.target.value; if (!v) return; const p = parseValue(v);
            setYear(p.year); setMonth(p.month); setDay(p.day); setHour(p.hour); setMinute(p.minute);
          }}
          className="w-full p-3 rounded-lg border border-[#e6eef8] bg-white text-[#0f1724]"
        />
      ) : (
        <div className="flex gap-2 justify-center items-center w-full select-none">
          <select className="wheel-select" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {years.map(y => <option key={y} value={y}>{y}年</option>)}
          </select>
          <select className="wheel-select" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {months.map(m => <option key={m} value={m}>{String(m).padStart(2,'0')}月</option>)}
          </select>
          <select className="wheel-select" value={day} onChange={(e) => setDay(Number(e.target.value))}>
            {days.map(d => <option key={d} value={d}>{String(d).padStart(2,'0')}日</option>)}
          </select>
          <select className="wheel-select" value={hour} onChange={(e) => setHour(Number(e.target.value))}>
            {hours.map(h => <option key={h} value={h}>{String(h).padStart(2,'0')}</option>)}
          </select>
          <select className="wheel-select" value={minute} onChange={(e) => setMinute(Number(e.target.value))}>
            {minutes.map(m => <option key={m} value={m}>{String(m).padStart(2,'0')}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}
