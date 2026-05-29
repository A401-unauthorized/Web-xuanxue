import { useState } from 'react';
import { motion } from 'framer-motion';

const BaZiPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: new Date().toISOString().split('T')[0],
    birthTime: '12:00',
    birthPlace: '',
    calendarType: 'solar' as 'solar' | 'lunar',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 模拟八字计算结果
      const mockResult = {
        yearPillar: { heavenlyStem: '甲', earthlyBranch: '子' },
        monthPillar: { heavenlyStem: '丙', earthlyBranch: '寅' },
        dayPillar: { heavenlyStem: '戊', earthlyBranch: '辰' },
        hourPillar: { heavenlyStem: '庚', earthlyBranch: '申' },
        fiveElements: { gold: 2, wood: 1, water: 3, fire: 1, earth: 1 },
        interpretation: '八字命盘分析结果...',
      };
      
      // TODO: 替换为实际 API 调用
      // const response = await axios.post('/api/fortune/bazi', formData);
      // setResult(response.data.data);
      
      setTimeout(() => {
        setResult(mockResult);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('计算失败:', error);
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">八字排盘</h1>
          <p className="text-xl text-[var(--gray-200)] mb-12">
            四柱八字，解读人生密码
          </p>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="bg-[var(--gray-50)] rounded-3xl p-8 md:p-10 card-shadow mb-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">性别</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">出生日期</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">出生时间</label>
                <input
                  type="time"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">出生地</label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="省市区"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[var(--gray-50)] border border-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">历法</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="calendarType"
                      value="solar"
                      checked={formData.calendarType === 'solar'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    公历
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="calendarType"
                      value="lunar"
                      checked={formData.calendarType === 'lunar'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    农历
                  </label>
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
              <h2 className="text-2xl font-semibold mb-6">八字命盘</h2>
              
              {/* Four Pillars */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {['年柱', '月柱', '日柱', '时柱'].map((pillar, index) => (
                  <div key={pillar} className="text-center">
                    <div className="text-sm text-[var(--gray-200)] mb-2">{pillar}</div>
                    <div className="text-3xl font-bold mb-1">
                      {result.yearPillar.heavenlyStem}
                    </div>
                    <div className="text-3xl font-bold">
                      {result.yearPillar.earthlyBranch}
                    </div>
                  </div>
                ))}
              </div>

              {/* Five Elements */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">五行分布</h3>
                <div className="grid grid-cols-5 gap-2">
                  {Object.entries(result.fiveElements).map(([element, count]) => (
                    <div key={element} className="text-center p-3 bg-white dark:bg-[var(--gray-50)] rounded-xl">
                      <div className="text-2xl mb-1">
                        {{ gold: '金', wood: '木', water: '水', fire: '火', earth: '土' }[element as keyof typeof result.fiveElements]}
                      </div>
                      <div className="text-lg font-bold">{String(count)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interpretation */}
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-3">命盘分析</h3>
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

export default BaZiPage;
