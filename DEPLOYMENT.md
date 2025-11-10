# 🚀 部署指南

本文档提供了微信公众号管理系统的完整部署指南。

## 📋 部署前置要求

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本
- Git

### 账户要求
- GitHub 账户（用于代码托管和CI/CD）
- Cloudflare 账户（用于网站托管）
- Cloudflare Pages 访问权限

## 🔧 部署步骤

### 1. 准备代码仓库

#### 1.1 Fork 或克隆仓库
\`\`\`bash
# 克隆到本地
git clone <your-repository-url>
cd wechat-matrix-mcp-system

# 或者如果是新项目，创建新仓库
git init
git add .
git commit -m "Initial commit: 微信公众号管理系统"
git remote add origin <your-repository-url>
git push -u origin main
\`\`\`

#### 1.2 安装依赖
\`\`\`bash
npm install
\`\`\`

### 2. Cloudflare Pages 配置

#### 2.1 创建 Cloudflare 账户
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 注册或登录账户
3. 完成邮箱验证

#### 2.2 获取必要的密钥
1. 进入 Cloudflare Dashboard
2. 点击右上角用户头像 → "My Profile"
3. 在 "API Tokens" 页面创建新令牌
4. 设置权限：
   - Zone:Zone:Read
   - Account:Account Settings:Edit
   - Account:Cloudflare Pages:Edit
   - Custom Hostnames:Custom Hostnames:Edit
   - User:User Details:Read
   - Zone:Zone:Edit
5. 复制生成的 API Token

#### 2.3 获取 Account ID
在 Cloudflare Dashboard 右侧边栏或 "My Profile" 页面找到您的 Account ID。

### 3. GitHub Secrets 配置

#### 3.1 配置 GitHub 仓库密钥
1. 进入您的 GitHub 仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 添加以下 Repository Secrets：

\`\`\`
CLOUDFLARE_API_TOKEN=<your-cloudflare-api-token>
CLOUDFLARE_ACCOUNT_ID=<your-cloudflare-account-id>
GITHUB_TOKEN=<your-github-personal-access-token>
\`\`\`

#### 3.2 生成 GitHub Token
1. 进入 GitHub Settings → Developer settings → Personal access tokens
2. 点击 "Generate new token"
3. 设置权限：
   - repo (Full control)
   - workflow (Read and write)
4. 复制生成的 token

### 4. 部署配置

#### 4.1 验证构建配置
项目已配置为静态导出，适合 Cloudflare Pages：

\`\`\`javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // ... 其他配置
};
\`\`\`

#### 4.2 本地测试构建
\`\`\`bash
# 测试构建
npm run build

# 验证静态文件生成
ls -la out/
\`\`\`

### 5. 自动部署设置

#### 5.1 GitHub Actions
项目已配置完整的 CI/CD 流水线：

- ✅ 自动代码检查
- ✅ 依赖安装
- ✅ 项目构建
- ✅ 自动部署到 Cloudflare Pages
- ✅ 构建产物管理

#### 5.2 触发部署
推送到 \`main\` 或 \`master\` 分支时自动触发部署：

\`\`\`bash
git add .
git commit -m "🚀 Ready for production deployment"
git push origin main
\`\`\`

### 6. Cloudflare Pages 项目设置

#### 6.1 连接 GitHub 仓库
1. 登录 Cloudflare Dashboard
2. 进入 "Pages" 部分
3. 点击 "Create application"
4. 选择 "Connect to Git"
5. 授权 GitHub 并选择您的仓库
6. 设置构建配置：
   - Framework preset: Next.js
   - Build command: \`npm run build\`
   - Build output directory: \`out\`
   - Root directory: \`\`

#### 6.2 环境变量配置（如需要）
如果需要生产环境特定配置，可以在 Cloudflare Pages 设置中添加环境变量。

## 🔄 部署流程

### 自动部署流程
1. **代码推送** → 开发者推送代码到 GitHub
2. **触发 Actions** → GitHub Actions 自动触发
3. **环境准备** → 设置 Node.js 环境，安装依赖
4. **代码检查** → 运行 linting 和测试（如果配置）
5. **项目构建** → 执行 \`npm run build\` 生成静态文件
6. **文件上传** → 将构建产物上传到 Cloudflare Pages
7. **全球部署** → Cloudflare 全球 CDN 分发

### 部署状态监控
- **GitHub Actions**: 在仓库的 "Actions" 标签页查看部署日志
- **Cloudflare Pages**: 在 Pages Dashboard 查看部署状态和统计

## 🌐 访问您的网站

部署完成后，您将获得：
- **Cloudflare Pages URL**: \`https://your-project.pages.dev\`
- **自定义域名**（可选）：可配置自定义域名

## 🔍 故障排除

### 常见问题

#### 构建失败
\`\`\`bash
# 检查依赖
npm install

# 检查构建
npm run build

# 检查类型错误
npm run type-check
\`\`\`

#### 部署失败
1. 检查 GitHub Secrets 是否正确配置
2. 验证 Cloudflare API 权限
3. 查看 GitHub Actions 日志获取详细错误信息

#### 静态导出问题
确保 \`next.config.js\` 中：
\`\`\`javascript
output: 'export'
\`\`\`

#### 图像优化问题
静态导出模式下，图像优化已禁用：
\`\`\`javascript
images: {
  unoptimized: true,
}
\`\`\`

### 获取帮助

- **项目文档**: 查看项目根目录的 \`README.md\`
- **GitHub Issues**: 在仓库中创建 Issue
- **Cloudflare 文档**: [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

## 🎉 部署成功！

恭喜！您的微信公众号管理系统现已成功部署到 Cloudflare Pages。

### 下一步
1. 访问您的网站测试功能
2. 配置自定义域名（可选）
3. 设置域名 SSL 证书
4. 配置分析和监控（可选）
5. 根据需要更新内容和功能

## 📊 项目特色

- ✅ **现代化 UI/UX 设计**
- ✅ **完全响应式布局**
- ✅ **富文本编辑器**
- ✅ **数据可视化图表**
- ✅ **表单验证系统**
- ✅ **MCP 服务集成**
- ✅ **企业级架构**
- ✅ **高性能优化**

---

🎯 **享受您的微信公众号管理体验！**
