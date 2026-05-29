import { useState } from 'react';
import { motion } from 'framer-motion';

const QiMenPage = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    location: '',
    questionType: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 模拟奇门遁甲计算结果
      const mockResult = {
        ninePalaces: Array(9).fill({}),
        heavenPlate: { value: '天辅' },
        earthPlate: { value: '地户' },
        humanPlate: { value: '人和' },
        spiritPlate: { value: '青龙' },
        fortuneTeller: '值符',
        fortuneBringer: '值使',
        interpretation: '奇门遁甲解析...',
      };
      
      // TODO: 替换为实际 API 调用
      // const response = await axios.post('/api/fortune/qimen', formData);
      // setResult(response.data.data);
      
      setTimeout(() => {
        setResult(mockResult);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('计算失败:', error);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const questionTypes = [
    '事业发展',
    '财运预测',
    '感情婚姻',
    '健康状况',
    '出行方向',
    '其他',
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">奇门遁甲</h1>
          <p className="text-xl text-[var(--gray-200)] mb-12">
            综合天时地利人和的高级占卜术
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

              <div>
                <label className="block text-sm font-medium mb-2">地点</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="省市区"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">问事类型</label>
                <select
                  name="questionType"
                  value={formData.questionType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                >
                  <option value="">请选择</option>
                  {questionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? '排盘中...' : '开始排盘'}
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
              <h2 className="text-2xl font-semibold mb-6">奇门遁甲盘</h2>
              
              {/* Nine Palaces Grid */}
              <div className="grid grid-cols-3 gap-3 mb-8 aspect-square max-w-md mx-auto">
                {result.ninePalaces.map((_: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-[var(--gray-50)] rounded-xl p-4 flex items-center justify-center text-center"
                  >
                    <div className="text-sm">
                      <div className="text-[var(--gray-200)] mb-1">宫位{index + 1}</div>
                      <div className="font-medium">信息加载中</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Four Plates Info */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white dark:bg-[var(--gray-50)] rounded-xl p-6">
                  <div className="text-sm text-[var(--gray-200)] mb-2">值符</div>
                  <div className="text-xl font-semibold">{result.fortuneTeller}</div>
                </div>
                <div className="bg-white dark:bg-[var(--gray-50)] rounded-xl p-6">
                  <div className="text-sm text-[var(--gray-200)] mb-2">值使</div>
                  <div className="text-xl font-semibold">{result.fortuneBringer}</div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">盘局解析</h3>
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
                <button className="flex-1 py-3 bg-[var(--accent)] text-white rounded-xl hover:opacity-90 transition-opacity">
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

export default QiMenPage;
