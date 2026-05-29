# Fortune Telling Platform 排盘网站

一个提供梅花易数、奇门遁甲、八字、神卜四种传统占卜功能的排盘网站。

## 技术栈

### 前端
- **Vite 5.x** - 构建工具
- **React 18.x** - UI 框架
- **TypeScript 5.x** - 类型系统
- **TailwindCSS 3.x** - 样式框架
- **Framer Motion** - 动画库
- **React Router 6.x** - 路由管理
- **Axios** - HTTP 客户端

### 后端
- **Python 3.11+** - 编程语言
- **FastAPI 0.100+** - Web 框架
- **SQLAlchemy 2.x** - ORM
- **PostgreSQL** - 数据库
- **Uvicorn** - ASGI 服务器

## 项目结构

```
/workspace
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── pages/         # 页面组件
│   │   ├── styles/        # 样式文件
│   │   └── App.tsx        # 应用入口
│   ├── package.json
│   └── vite.config.ts
│
├── backend/               # 后端项目
│   ├── app/
│   │   ├── algorithms/    # 排盘算法
│   │   ├── models/        # 数据模型
│   │   ├── routers/       # API 路由
│   │   ├── schemas/       # Pydantic 模型
│   │   └── main.py        # FastAPI 应用
│   ├── requirements.txt
│   └── .env.example       # 环境变量示例
│
└── start.sh               # 启动脚本
```

## 快速开始

### 1. 启动开发服务

```bash
# 启动前端
cd /workspace/frontend
npm run dev

# 启动后端（新终端）
cd /workspace/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. 配置数据库（可选）

创建 `.env` 文件在 `backend/` 目录：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fortune_db
```

### 3. 访问应用

- 前端：http://localhost:5173
- 后端 API：http://localhost:8000
- API 文档：http://localhost:8000/docs

## 功能模块

### 主页
- 四个功能模块入口
- Apple 风格极简设计
- 响应式布局

### 梅花易数
- 基于数字和时间起卦
- 显示本卦、互卦、变卦
- 卦辞爻辞解析

### 八字排盘
- 四柱计算（年月日时）
- 五行分布分析
- 十神关系展示
- 支持公历/农历输入

### 奇门遁甲
- 九宫格布局
- 天盘地盘人盘神盘
- 值符值使计算
- 问事类型选择

### 神卜
- 框架已创建
- 功能待实现

## API 接口

### 梅花易数
```http
POST /api/fortune/meihua
Content-Type: application/json

{
  "date": "2026-05-28",
  "time": "12:00",
  "number1": 8,
  "number2": 15
}
```

### 八字排盘
```http
POST /api/fortune/bazi
Content-Type: application/json

{
  "name": "张三",
  "gender": "male",
  "birthDate": "1990-01-01",
  "birthTime": "08:30",
  "birthPlace": "北京市",
  "calendarType": "solar"
}
```

### 奇门遁甲
```http
POST /api/fortune/qimen
Content-Type: application/json

{
  "date": "2026-05-28",
  "time": "12:00",
  "location": "北京市",
  "questionType": "事业发展"
}
```

## 开发计划

### Phase 1 (已完成)
- ✅ 项目框架搭建
- ✅ 主页和导航
- ✅ 前端页面实现
- ✅ 后端 API 框架
- ✅ Apple 风格 UI

### Phase 2 (待实现)
- ⏳ 完整排盘算法实现
  - 梅花易数算法
  - 八字排盘算法
  - 奇门遁甲算法
- ⏳ 数据库持久化
- ⏳ 用户系统

### Phase 3 (未来)
- ⏳ 神卜功能
- ⏳ 历史记录功能
- ⏳ 结果分享功能
- ⏳ 移动端 APP 封装

## 注意事项

1. **算法准确性**：当前版本使用示例数据，实际排盘算法需要进一步完善
2. **数据库**：PostgreSQL 需要手动安装和配置
3. **真太阳时**：八字排盘的真太阳时计算功能待实现
4. **农历支持**：农历转换功能需要额外库支持

## 许可证

MIT License
