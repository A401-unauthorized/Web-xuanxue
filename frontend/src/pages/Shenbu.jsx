import React, { useState } from "react";

export default function Shenbu() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);

  const handleSave = async () => {
    if (!title || !content) {
      alert("请填写标题和内容");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/shenbu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });
      const data = await response.json();
      setResp({ ok: response.ok, data });
    } catch (e) {
      setResp({ ok: false, data: { error: e.message } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-[#1e293b] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold mb-4">神卜 · 新建占卜（占位）</h2>
        <p className="text-sm text-[#64748b] mb-4">此界面为神卜入口占位。后续会接入问真八字算法并保存到 MongoDB。</p>

        <div className="space-y-3">
          <input
            className="w-full p-3 border rounded-lg"
            placeholder="标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded-lg"
            placeholder="署名（可选）"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            className="w-full p-3 border rounded-lg min-h-[140px]"
            placeholder="占卜内容 / 问题描述"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-[#1e293b] text-white rounded-lg disabled:opacity-60"
            >
              {loading ? '保存中...' : '保存'}
            </button>

            <button
              onClick={() => { setTitle(''); setAuthor(''); setContent(''); setResp(null); }}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              重置
            </button>
          </div>

          {resp && (
            <div className="mt-4 p-3 bg-[#f1f5f9] rounded">
              <div className="text-sm text-[#0f172a] font-medium">响应信息：</div>
              <pre className="text-xs mt-2 whitespace-pre-wrap">{JSON.stringify(resp, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
