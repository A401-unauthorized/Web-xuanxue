# Requirements Document

## Introduction

本项目是一个排盘网站，提供梅花易数、奇门遁甲、八字、神卜四种传统占卜功能的前端展示和后端计算。网站采用极简主义设计风格，类似 Apple 官网的视觉体验。项目采用前后端分离架构，前端使用 Vite + React，后端使用 FastAPI + PostgreSQL 的技术栈。

## Glossary

- **排盘**: 根据用户输入的时间、地点等信息，计算并展示传统占卜结果的术语
- **梅花易数**: 一种基于数字和时间的占卜方法
- **奇门遁甲**: 一种复杂的古代占卜术，包含天盘、地盘、人盘等多个维度
- **八字**: 根据出生年月日时计算的命理系统，包含年柱、月柱、日柱、时柱
- **神卜**: 一种占卜方法（本期仅创建文件，不实现功能）
- **年柱/月柱/日柱/时柱**: 八字系统中的四个时间维度，每个包含天干地支
- **天干地支**: 中国传统历法系统，天干 10 个，地支 12 个

## Requirements

### Requirement 1: 主页与导航系统

**User Story:** AS 访客，I want 清晰直观的导航系统，so that 能够快速找到并访问所需的排盘功能。

#### Acceptance Criteria

1. WHEN 用户访问首页，系统 SHALL 展示包含四个功能模块的主界面
2. WHILE 用户浏览页面，系统 SHALL 显示固定在顶部的导航栏，包含网站 Logo 和功能链接
3. WHEN 用户点击任意功能模块，系统 SHALL 跳转到对应的功能页面
4. IF 页面加载失败，系统 SHALL 显示友好的错误提示并建议用户刷新
5. WHILE 页面滚动时，系统 SHALL 保持导航栏固定在顶部
6. 导航栏 SHALL 包含：Logo（左侧）、四个功能入口（中间）、联系/关于（右侧）
7. 四个功能模块 SHALL 以网格布局展示，每个模块包含名称和简短描述

### Requirement 2: 梅花易数排盘功能

**User Story:** AS 命理爱好者，I want 使用梅花易数排盘功能，so that 获得基于数字和时间的占卜结果。

#### Acceptance Criteria

1. WHEN 用户进入梅花易数页面，系统 SHALL 展示输入表单，包含：日期、时间、数字输入项
2. WHEN 用户提交有效输入，系统 SHALL 计算并展示：卦象、变卦、卦辞、爻辞
3. IF 输入数据不完整或不合法，系统 SHALL 提示用户补充或修正信息
4. WHILE 计算过程中，系统 SHALL 显示加载状态（不超过 2 秒）
5. 结果展示 SHALL 包含：本卦、互卦、变卦、卦辞解析、爻辞解析
6. 系统 SHALL 自动保存用户的计算记录（需要登录）
7. 结果页面 SHALL 提供"重新排盘"和"保存结果"功能

### Requirement 3: 八字排盘功能

**User Story:** AS 命理师，I want 使用八字排盘功能，so that 获得完整的四柱八字命盘分析。

#### Acceptance Criteria

1. WHEN 用户进入八字排盘页面，系统 SHALL 展示输入表单，包含：姓名、性别、出生日期（公历/农历选项）、出生时间、出生地点
2. WHEN 用户提交有效输入，系统 SHALL 计算并展示：年柱、月柱、日柱、时柱（含天干地支）
3. WHEN 八字排盘计算完成，系统 SHALL 展示：十神、五行、大运、流年
4. IF 输入数据不完整或不合法，系统 SHALL 高亮显示错误字段并提示修正
5. WHILE 计算过程中，系统 SHALL 显示进度指示器（不超过 3 秒）
6. 结果展示 SHALL 包含：四柱信息、五行分布、十神关系、大运排盘
7. 系统 SHALL 支持公历和农历两种日期输入方式
8. 系统 SHALL 根据出生地自动计算真太阳时

### Requirement 4: 奇门遁甲排盘功能

**User Story:** AS 风水师，I want 使用奇门遁甲排盘功能，so that 获得天时地利人和的综合占卜信息。

#### Acceptance Criteria

1. WHEN 用户进入奇门遁甲页面，系统 SHALL 展示输入表单，包含：日期、时间、地点、问事类型
2. WHEN 用户提交有效输入，系统 SHALL 排布：天盘、地盘、人盘、神盘
3. WHEN 奇门遁甲排盘完成，系统 SHALL 展示：九宫格布局、各宫位信息、吉凶判断
4. IF 输入数据不合法，系统 SHALL 提示用户修正
5. WHILE 计算过程中，系统 SHALL 显示加载状态（不超过 5 秒）
6. 结果展示 SHALL 包含：值符、值使、九星、八门、八神信息
7. 系统 SHALL 提供九宫格可视化展示

### Requirement 5: 神卜功能模块

**User Story:** AS 项目维护者，I want 预留神卜功能模块，so that 后续可以添加该功能。

#### Acceptance Criteria

1. 系统 SHALL 创建神卜功能的前端页面框架文件
2. 系统 SHALL 创建神卜功能的后端路由文件
3. 系统 SHALL 在主页展示神卜模块入口，但标记为"即将推出"
4. 神卜模块的具体实现内容 SHALL 留空，待后续开发

### Requirement 6: Apple 风格 UI 设计

**User Story:** AS 用户，I want 享受极简优雅的视觉体验，so that 在使用过程中获得愉悦感。

#### Acceptance Criteria

1. 系统 SHALL 使用极简的白色/深色主题（支持自动切换）
2. 系统 SHALL 使用大面积留白设计元素
3. 系统 SHALL 实现精致的过渡动画（页面切换、按钮点击、数据加载）
4. 系统 SHALL 使用大圆角卡片设计（border-radius: 16-24px）
5. 系统 SHALL 使用大号无衬线字体（类似 SF Pro）
6. 系统 SHALL 支持响应式布局，适配桌面端和移动端
7. WHILE 用户交互时，系统 SHALL 提供平滑的微动画反馈
8. 系统 SHALL 在滚动时实现视差效果和渐变透明效果

### Requirement 7: 数据库持久化

**User Story:** AS 用户，I want 保存我的排盘历史，so that 可以随时查看和对比之前的占卜结果。

#### Acceptance Criteria

1. 系统 SHALL 使用 PostgreSQL 数据库存储用户数据
2. 系统 SHALL 提供数据库连接配置管理
3. 系统 SHALL 实现数据库健康检查接口
4. IF 数据库连接失败，系统 SHALL 降级为临时计算模式并提示用户
5. 系统 SHALL 设计数据模型以支持未来用户系统扩展

### Requirement 8: 前后端 API 接口

**User Story:** AS 前端开发者，I want 清晰定义的后端 API，so that 实现前后端数据交互。

#### Acceptance Criteria

1. 系统 SHALL 提供 RESTful API 接口用于各排盘功能
2. 系统 SHALL 使用 JSON 格式进行数据交换
3. 系统 SHALL 提供统一的错误响应格式
4. 系统 SHALL 提供 API 文档（OpenAPI/Swagger）
5. 系统 SHALL 实现 CORS 配置以支持前后端分离部署
