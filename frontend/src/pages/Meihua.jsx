// frontend/src/pages/Meihua.jsx
import { useState } from "react";
import TimePicker from "./TimePicker";

function Meihua() {
  const [time, setTime] = useState(""); // stores datetime-local value (e.g. 2026-05-22T13:30)
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatForBackend = (value) => {
    if (!value) return "";
    // convert datetime-local (2026-05-22T13:30) to backend format (2026-05-22 13:30)
    return value.includes("T") ? value.replace("T", " ") : value;
  };

  const handleSubmit = async () => {
    if (!time) {
      alert("请选择或输入时间");
      return;
    }

    const timeForApi = formatForBackend(time);

    setLoading(true);
    try {
      // use relative path so frontend works with proxy or same-origin deployments
      const response = await fetch(`/meihua?time=${encodeURIComponent(timeForApi)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("排盘失败:", error);
      setResult({ error: "请求失败，请检查后端服务是否启动或网络设置" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wider">梅花易数</h1>

        <div className="space-y-3">
          <label className="block text-sm text-zinc-400">时间（本地）：</label>
          <div style={{ maxWidth: 420 }}>
            <TimePicker value={time} onChange={setTime} />
          </div>
          <p className="text-xs text-zinc-500">输入示例：2026-05-22 13:30（或使用上面选择器）</p>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black rounded-xl p-3 text-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "排盘中..." : "起卦"}
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="border-t border-zinc-700 pt-6">
              <h2 className="text-2xl font-bold mb-4 text-center">排盘结果</h2>

              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl">
                  {(result.upper_symbol || "☰") + " " + (result.lower_symbol || "☵")}
                </div>
              </div>

              {result.error ? (
                <p className="text-red-500 text-center">{result.error}</p>
              ) : (
                <div className="space-y-2 text-lg text-zinc-300">
                  <p>上卦：<span className="text-white">{result.upper_trigram || result.upper || "—"}</span></p>
                  <p>下卦：<span className="text-white">{result.lower_trigram || result.lower || "—"}</span></p>
                  <p>动爻：<span className="text-white">{result.moving_line ?? "—"}</span></p>

                  {result.extra && (
                    <div className="mt-3 text-sm text-zinc-400">
                      <div>说明：</div>
                      <div>{result.extra}</div>
                    </div>
                  )}

                  <details className="mt-4 bg-zinc-800 p-3 rounded-md text-sm text-zinc-400">
                    <summary className="cursor-pointer">查看原始返回（JSON）</summary>
                    <pre className="whitespace-pre-wrap mt-2 text-xs">{JSON.stringify(result, null, 2)}</pre>
                  </details>
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