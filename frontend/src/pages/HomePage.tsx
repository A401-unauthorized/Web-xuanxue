import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const moduleData = [
  {
    name: '梅花易数',
    path: '/meihua',
    description: '基于数字与时间的古老占卜智慧',
    icon: '☰',
  },
  {
    name: '奇门遁甲',
    path: '/qimen',
    description: '天时地利人和的综合推演系统',
    icon: '☵',
  },
  {
    name: '八字',
    path: '/bazi',
    description: '四柱命理，解读人生密码',
    icon: '☲',
  },
  {
    name: '神卜',
    path: '/shenbo',
    description: '即将推出',
    icon: '☱',
    comingSoon: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const HomePage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            传承千年的<br />
            <span className="text-[var(--accent)]">占卜智慧</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--gray-200)] max-w-2xl mx-auto leading-relaxed">
            汇集梅花易数、奇门遁甲、八字命理，
            为您揭示命运的奥秘
          </p>
        </motion.div>
      </section>

      {/* Feature Modules */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {moduleData.map((module) => (
            <motion.div key={module.name} variants={itemVariants}>
              <Link
                to={module.comingSoon ? '#' : module.path}
                className={`block group h-full ${
                  module.comingSoon ? 'pointer-events-none opacity-50' : ''
                }`}
              >
                <div className="bg-[var(--gray-50)] dark:bg-[var(--gray-50)] rounded-3xl p-8 md:p-10 card-shadow transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full">
                  <div className="text-5xl mb-6 text-[var(--accent)]">{module.icon}</div>
                  <h2 className="text-3xl font-semibold mb-3">{module.name}</h2>
                  <p className="text-[var(--gray-200)] text-lg leading-relaxed">
                    {module.description}
                  </p>
                  {!module.comingSoon && (
                    <div className="mt-6 flex items-center text-[var(--accent)] text-sm font-medium">
                      开始使用
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                  {module.comingSoon && (
                    <div className="mt-6 inline-block px-4 py-2 bg-[var(--gray-100)] rounded-full text-xs font-medium">
                      即将推出
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--gray-100)] py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[var(--gray-200)] text-sm">
            © 2026 排盘网站。传承东方智慧，探索命理奥秘。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
