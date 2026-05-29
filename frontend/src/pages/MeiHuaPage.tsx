import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const MeiHuaPage = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    number1: '',
    number2: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 模拟计算结果（实际应调用后端 API）
      const mockResult = {
        hexagram: { name: '乾为天', symbol: '☰' },
        mutualHexagram: { name: '天风姤', symbol: '☰' },
        transformedHexagram: { name: '泽天夬', symbol: '☱' },
        interpretation: '此卦象显示...',
      };
      
      // TODO: 替换为实际 API 调用
      // const response = await axios.post('/api/fortune/meihua', formData);
      // setResult(response.data.data);
      
      setTimeout(() => {
        setResult(mockResult);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('计算失败:', error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">梅花易数</h1>
          <p className="text-xl text-[var(--gray-200)] mb-12">
            以数字和时间起卦，解读事物变化规律
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="bg-[var(--gray-50)] rounded-3xl p-8 md:p-10 card-shadow mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">日期</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">时间</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">数字一</label>
                  <input
                    type="number"
                    name="number1"
                    value={formData.number1}
                    onChange={handleChange}
                    placeholder="1-99"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">数字二</label>
                  <input
                    type="number"
                    name="number2"
                    value={formData.number2}
                    onChange={handleChange}
                    placeholder="1-99"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? '计算中...' : '开始排盘'}
              </button>
            </div>
          </form>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--gray-50)] rounded-3xl p-8 md:p-10 card-shadow"
            >
              <h2 className="text-2xl font-semibold mb-6">排盘结果</h2>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-6xl mb-2">{result.hexagram.symbol}</div>
                  <div className="text-sm text-[var(--gray-200)] mb-1">本卦</div>
                  <div className="text-lg font-medium">{result.hexagram.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{result.mutualHexagram.symbol}</div>
                  <div className="text-sm text-[var(--gray-200)] mb-1">互卦</div>
                  <div className="text-lg font-medium">{result.mutualHexagram.name}</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-2">{result.transformedHexagram.symbol}</div>
                  <div className="text-sm text-[var(--gray-200)] mb-1">变卦</div>
                  <div className="text-lg font-medium">{result.transformedHexagram.name}</div>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">卦辞解析</h3>
                <p className="text-[var(--gray-200)] leading-relaxed">
                  {result.interpretation}
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 border border-[var(--gray-100)] rounded-xl hover:bg-[var(--gray-50)] transition-colors"
                >
                  重新排盘
                </button>
                <button
                  className="flex-1 py-3 bg-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  保存结果
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MeiHuaPage;
