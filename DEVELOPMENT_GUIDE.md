#!/bin/bash

# 排盘项目开发快速参考

# ==================== 前端命令 ====================

# 安装依赖（已完成）
# cd /workspace/frontend && npm install

# 启动开发服务器
cd /workspace/frontend && npm run dev

# 构建生产版本
# cd /workspace/frontend && npm run build

# 预览生产构建
# cd /workspace/frontend && npm run preview


# ==================== 后端命令 ====================

# 安装依赖（已完成）
# pip install -r /workspace/backend/requirements.txt

# 启动开发服务器
cd /workspace/backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 运行测试
# cd /workspace/backend && pytest


# ==================== 数据库命令 ====================

# 启动 PostgreSQL（需要手动安装）
# sudo systemctl start postgresql

# 创建数据库
# sudo -u postgres createdb fortune_db

# 执行数据库迁移
# cd /workspace/backend && alembic upgrade head


# ==================== 访问地址 ====================
# 前端：http://localhost:5173
# 后端 API：http://localhost:8000
# API 文档：http://localhost:8000/docs
# 在线预览：使用 deploy-website skill


# ==================== 开发提示 ====================
# 1. 前端修改自动热重载
# 2. 后端使用 --reload 参数自动重载
# 3. 查看 API 文档测试接口
# 4. 算法实现在 backend/app/algorithms/ 目录下


# ==================== 项目结构 ====================
# /workspace
# ├── frontend/              # 前端项目
# ├── backend/               # 后端项目
# ├── start.sh               # 启动脚本
# └── PROJECT_SUMMARY.md     # 项目总结

# ==================== 下一步开发建议 ====================
# 1. 优先实现八字排盘算法（backend/app/algorithms/bazi.py）
# 2. 接入 PostgreSQL 数据库
# 3. 前端接入真实 API（替换 mock 数据）
# 4. 完善错误处理和加载状态
