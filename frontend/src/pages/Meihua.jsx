// frontend/src/pages/Meihua.jsx
import { useState } from "react";

function Meihua() {
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!time) {
      alert("请输入时间");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/meihua?time=${encodeURIComponent(time)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("排盘失败:", error);
      setResult({ error: "请求失败，请检查后端服务是否启动" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-[420px] bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">
        <h1 className="text-5xl font-bold text-center mb-8 tracking-widest">
          梅花易数
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="2026-05-22 13:30"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="
              w-full
              bg-zinc-800
              rounded-xl
              p-4
              text-lg
              outline-none
              border border-zinc-700
              focus:border-white
              placeholder:text-zinc-500
            "
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full
              bg-white
              text-black
              rounded-xl
              p-4
              text-lg
              font-bold
              hover:opacity-80
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "排盘中..." : "起卦"}
          </button>
        </div>

        {result && (
          <div className="mt-10">
            <div className="border-t border-zinc-700 pt-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                排盘结果
              </h2>

              <div className="text-center mb-6">
                <div className="text-6xl">
                  ☰ ☵
                </div>
              </div>

              {result.error ? (
                <p className="text-red-500 text-center">{result.error}</p>
              ) : (
                <div className="space-y-3 text-xl text-zinc-300">
                  <p>上卦：{result.upper_trigram || result.upper}</p>
                  <p>下卦：{result.lower_trigram || result.lower}</p>
                  <p>动爻：{result.moving_line}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Meihua;  // 确保这一行存在