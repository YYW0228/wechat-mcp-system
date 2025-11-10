# 🚀 微信公众号管理系统 - 企业级内容管理平台

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-blue.svg)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.4-blue.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**现代化企业级内容管理与数据分析平台**

</div>

## 📖 项目简介

微信公众号管理系统是一个现代化的企业级内容管理平台，基于Next.js 14构建，专为微信公众号的内容创作、数据分析和自动化管理而设计。系统采用静态导出架构，完美适配Cloudflare Pages等现代部署平台。

## ✨ 核心功能

### 📝 内容创作工具
- **链接批量导入** - 支持多个URL同时导入，实时格式验证
- **富文本编辑器** - 基于TipTap的专业编辑器，完整工具栏和格式化功能
- **Excel批量处理** - 支持.xlsx/.xls/.csv，文件验证和大小限制
- **智能表单验证** - 实时错误提示和状态反馈

### 📊 数据可视化
- **实时统计面板** - 总素材、今日新增、已发布、总浏览量等核心指标
- **交互式图表** - 基于Recharts的专业数据可视化
- **响应式设计** - 完美适配移动端和桌面端

### 🎨 企业级UI/UX
- **现代化界面** - 基于Tailwind CSS的专业设计
- **微交互动画** - 提升用户体验的细节设计
- **完全响应式布局** - 智能适配所有设备尺寸

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 访问应用
- **主页**: http://localhost:3000
- **简化仪表板**: http://localhost:3000/dashboard-simple
- **MCP服务演示**: http://localhost:3000/mcp-demo

### 构建生产版本
```bash
npm run build
```

## 📁 项目结构

```
wechat-management-system/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── articles/      # 文章管理API
│   ├── dashboard-simple/  # 简化仪表板
│   ├── mcp-demo/         # MCP服务演示
│   ├── page.tsx          # 主页面
│   └── layout.tsx        # 根布局
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── DataCharts.tsx    # 数据可视化组件
│   └── RichTextEditor.tsx # 富文本编辑器
├── lib/                  # 工具函数
│   ├── utils.ts         # 通用工具
│   └── validation-utils.ts # 表单验证
├── hooks/               # React Hooks
│   └── useFormValidation.ts # 表单验证Hook
├── .github/workflows/    # CI/CD配置
└── public/              # 静态资源
```

## 🔧 技术架构

### 核心技术栈
- **Next.js 14** - 现代化React框架，静态导出
- **React 18** - 用户界面构建库
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的CSS框架

### 开发工具
- **ESLint + Prettier** - 代码质量和格式化
- **TypeScript** - 静态类型检查
- **GitHub Actions** - 自动化CI/CD流水线

## 🚀 部署指南

### GitHub + Cloudflare Pages (推荐)

1. **创建GitHub仓库**
```bash
git init
git add .
git commit -m "feat: 初始提交 - 微绿流量宝微信公众号管理系统"
git remote add origin https://github.com/yourusername/wechat-mcp-system.git
git push -u origin main
```

2. **配置Cloudflare Pages**
- 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
- 进入 "Pages" → "Create application"
- 选择 "Connect to Git"
- 配置构建设置：
  - **Framework preset**: Next.js (Static HTML Export)
  - **Build command**: `npm run build`
  - **Build output directory**: `out`

3. **自动部署**
推送到main分支即可触发自动部署

## 📊 性能指标

- **Bundle Size**: 107 kB (First Load JS)
- **静态页面**: 11个页面预渲染完成
- **构建时间**: < 2分钟
- **Lighthouse评分**: 90+
- **SEO优化**: 100%静态内容

## 🎯 功能模块

### 1. 链接批量导入
- 支持多行URL输入
- 实时格式验证
- 批量处理进度反馈

### 2. 手写内容创作
- 富文本编辑器
- 实时内容预览
- 表单验证和错误处理

### 3. Excel文件上传
- 支持.xlsx/.xls/.csv格式
- 文件大小验证（最大10MB）
- 拖拽上传界面

### 4. 数据可视化
- 实时数据统计
- 交互式图表展示
- 响应式数据面板

## 🔒 API端点

- `GET /api/articles` - 获取文章列表
- `POST /api/articles` - 创建新文章
- `PUT /api/articles` - 更新文章
- `DELETE /api/articles` - 删除文章
- `POST /api/articles/bulk` - 批量操作
- `POST /api/articles/import` - Excel导入
- `GET /api/articles/stats` - 数据统计

## 🤝 贡献指南

我们欢迎所有形式的贡献！请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细信息。

### 开发流程
1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

### 代码规范
- 使用TypeScript进行类型安全开发
- 遵循ESLint和Prettier配置
- 编写清晰的提交信息
- 确保所有测试通过

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢以下开源项目：
- [Next.js](https://nextjs.org/) - 现代化的React Web框架
- [React](https://reactjs.org/) - 用户界面构建库
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [TypeScript](https://typescriptlang.org/) - JavaScript的超集
- [Recharts](https://recharts.org/) - React图表库

## 📞 联系我们

- **项目主页**: https://github.com/YYW0228/wechat-mcp-system
- **问题反馈**: https://github.com/YYW0228/wechat-mcp-system/issues
- **讨论区**: https://github.com/YYW0228/wechat-mcp-system/discussions

---

<div align="center">

如果这个项目对你有帮助，请给我们一个⭐️！

Made with ❤️ by [YYW0228](https://github.com/YYW0228)

</div>