import React, { useState } from "react";

// ==================== 1. 结果展示组件 (原 BaziResultView) ====================
function BaziResultView({ data }) {
  const [activeDayunIdx, setActiveDayunIdx] = useState(0);

  if (!data || !data.success) return <div style={{ color: "#fff", textAlign: 'center' }}>请输入正确的开盘数据</div>;

  const { bazi, dayun, qi_yun } = data;
  const columns = [bazi.year_col, bazi.month_col, bazi.day_col, bazi.hour_col];
  const columnNames = ["年柱", "月柱", "日柱", "时柱"];

  return (
    <div className="bazi-container" style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px", marginTop: "20px" }}>
      {/* 四柱主盘区域 */}
      <div className="bazi-main-grid" style={{ display: "flex", justifyContent: "space-around", background: "#fff", padding: "15px", borderRadius: "8px" }}>
        {columns.map((col, idx) => (
          <div key={idx} className="bazi-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "22%" }}>
            <span style={{ color: "#999", fontSize: "12px" }}>{columnNames[idx]}</span>
            <b style={{ color: "#e67e22", margin: "5px 0" }}>{col.shishen_gan}</b>
            <h1 style={{ margin: "2px 0", color: "#2c3e50" }}>{col.gan}</h1>
            <h1 style={{ margin: "2px 0", color: "#2c3e50" }}>{col.zhi}</h1>
            
            <div className="zanggan-zone" style={{ marginTop: "10px", fontSize: "12px", borderTop: "1px dashed #eee", width: "100%", textAlign: "center", paddingTop: "5px" }}>
              {col.zang_gan.map((zg, i) => (
                <div key={i} style={{ color: zg.type === "本" ? "#c0392b" : "#7f8c8d" }}>
                  {zg.gan}({zg.shishen})
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", margin: "15px 0", color: "#666", fontWeight: "bold" }}>起运时间：{qi_yun}</p>

      {/* 大运横向选择条 */}
      <h3 style={{ borderLeft: "4px solid #e67e22", paddingLeft: "8px", color: "#333" }}>大运流年盘</h3>
      <div className="dayun-bar" style={{ display: "flex", overflowX: "auto", gap: "10px", padding: "10px 0" }}>
        {dayun.map((dy, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveDayunIdx(idx)}
            style={{
              padding: "10px 15px",
              background: activeDayunIdx === idx ? "#e67e22" : "#fff",
              color: activeDayunIdx === idx ? "#fff" : "#333",
              borderRadius: "6px", cursor: "pointer", textAlign: "center", minWidth: "80px",
              border: "1px solid #ddd"
            }}
          >
            <div>{dy.start_age}岁</div>
            <strong>{dy.ganzhi}</strong>
            <div style={{ fontSize: "11px", opacity: 0.8 }}>{dy.shishen}</div>
          </div>
        ))}
      </div>

      {/* 流年动态网格 */}
      <div className="liunian-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginTop: "15px" }}>
        {dayun[activeDayunIdx]?.liunians.map((ln, i) => (
          <div key={i} style={{ background: "#fff", padding: "10px", borderRadius: "6px", textAlign: "center", border: "1px solid #eaeaea", color: "#333" }}>
            <div style={{ fontSize: "12px", color: "#666" }}>{ln.year}年</div>
            <b style={{ fontSize: "16px", color: "#2980b9" }}>{ln.ganzhi}</b>
            <div style={{ fontSize: "12px", color: "#e67e22" }}>{ln.shishen}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== 2. 主页面入口组件 ====================
export default function Bazi() {
  const [formData, setFormData] = useState({
    year: 2026,
    month: 5,
    day: 7,
    hour: 8,
    minute: 0,
    gender: 1
  });

  const [baziData, setBaziData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handlePaipan = async () => {
    setLoading(false);
    setLoading(true);
    setErrorMsg("");
    try {
      // 使用相对路径，以支持代理或同源部署
      const url = `/bazi?year=${formData.year}&month=${formData.month}&day=${formData.day}&hour=${formData.hour}&minute=${formData.minute}&gender=${formData.gender}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.success) {
        setBaziData(data);
      } else {
        setErrorMsg(data.detail || "排盘失败，请检查参数");
      }
    } catch (error) {
      setErrorMsg("网络请求失败，请确认后端服务器已启动！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>专业八字排盘系统</h2>
      
      {/* 表单输入区 */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center", color: "#333" }}>
        <label>年: <input name="year" type="number" value={formData.year} onChange={handleChange} style={{ width: "60px", padding: "4px" }} /></label>
        <label>月: <input name="month" type="number" value={formData.month} onChange={handleChange} style={{ width: "40px", padding: "4px" }} /></label>
        <label>日: <input name="day" type="number" value={formData.day} onChange={handleChange} style={{ width: "40px", padding: "4px" }} /></label>
        <label>时: <input name="hour" type="number" value={formData.hour} onChange={handleChange} style={{ width: "40px", padding: "4px" }} /></label>
        <label>分: <input name="minute" type="number" value={formData.minute} onChange={handleChange} style={{ width: "40px", padding: "4px" }} /></label>
        <label>性别: 
          <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: "4px" }}>
            <option value={1}>男(乾造)</option>
            <option value={0}>女(坤造)</option>
          </select>
        </label>
        
        <button 
          onClick={handlePaipan} 
          disabled={loading}
          style={{ padding: "6px 20px", background: "#e67e22", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
        >
          {loading ? "计算中..." : "开始排盘"}
        </button>
      </div>

      {errorMsg && <div style={{ color: "#e74c3c", textAlign: "center", margin: "10px 0", fontWeight: "bold" }}>{errorMsg}</div>}

      {/* 结果展示区 */}
      {baziData ? (
        <BaziResultView data={baziData} />
      ) : (
        <div style={{ color: "#aaa", textAlign: "center", marginTop: "50px" }}>
          请在上方输入出生时间并点击“开始排盘”按钮
        </div>
      )}
    </div>
  );
}
