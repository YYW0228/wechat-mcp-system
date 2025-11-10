# 贡献指南

感谢你对公众号矩阵管理系统的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题
- 使用 [GitHub Issues](https://github.com/yourusername/wechat-mcp-system/issues) 报告bug
- 提供详细的重现步骤和环境信息
- 包含相关的错误日志

### 功能请求
- 在Issues中描述你希望添加的功能
- 说明使用场景和预期行为
- 讨论实现方案

### 代码贡献
1. Fork 这个仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 🛠️ 开发环境设置

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装和运行
```bash
# 克隆你的fork
git clone https://github.com/yourusername/wechat-mcp-system.git
cd wechat-mcp-system

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行类型检查
npm run type-check

# 构建项目
npm run build
```

## 📝 代码规范

### TypeScript
- 使用TypeScript进行类型安全开发
- 为所有函数和组件添加类型注解
- 避免使用`any`类型

### React组件
- 使用函数组件和Hooks
- 组件名使用PascalCase
- Props接口以`Props`结尾

### 文件命名
- 组件文件: `PascalCase.tsx`
- 工具文件: `camelCase.ts`
- 页面文件: `kebab-case.tsx`

### 提交信息
使用约定式提交格式：
```
type(scope): description

[optional body]

[optional footer]
```

类型包括：
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 🧪 测试

### 运行测试
```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 编写测试
- 为新功能编写单元测试
- 为组件编写集成测试
- 保持测试覆盖率在80%以上

## 📚 MCP服务集成

### 添加新的MCP服务
1. 在 `app/api/mcp/route.ts` 中添加新的服务处理逻辑
2. 更新MCP服务状态显示
3. 在演示页面中添加测试功能
4. 更新文档

### 服务集成示例
```typescript
// 在 app/api/mcp/route.ts 中添加新服务
case 'new-mcp-service':
  return await handleNewMCPService(action, params);
```

## 🎨 UI/UX 贡献

### 设计系统
- 使用现有的shadcn/ui组件
- 保持设计一致性
- 遵循响应式设计原则

### 样式规范
- 使用Tailwind CSS类
- 保持组件的可复用性
- 添加适当的动画和过渡效果

## 📖 文档

### 更新文档
- 新功能需要更新相关文档
- API变更需要更新API文档
- 保持文档的准确性

### 文档结构
- `README.md`: 项目概述和快速开始
- `DEPLOYMENT_GUIDE.md`: 部署指南
- `CONTRIBUTING.md`: 贡献指南

## 🔍 代码审查

### 审查清单
- [ ] 代码符合项目规范
- [ ] 包含适当的类型注解
- [ ] 有相应的测试覆盖
- [ ] 文档已更新
- [ ] 构建成功

### 审查流程
1. 自动化检查通过
2. 至少一个维护者审查
3. 所有讨论已解决
4. 合并到主分支

## 🚀 发布流程

### 版本号
使用语义化版本控制：
- `MAJOR.MINOR.PATCH`
- 主版本号：不兼容的API修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 发布步骤
1. 更新版本号
2. 更新CHANGELOG
3. 创建发布标签
4. 自动部署到生产环境

## 💬 沟通渠道

- GitHub Issues: 报告问题和功能请求
- GitHub Discussions: 一般讨论和问答
- Pull Request: 代码审查和讨论

## 📜 行为准则

### 社区准则
- 尊重不同的观点和经验
- 使用友好和包容的语言
- 专注于对社区最有利的事情
- 对其他社区成员表现出同理心

### 预期行为
- 建设性的反馈和批评
- 接受反馈和批评而不采取防御姿态
- 专注于对社区最有利的事情，而不仅仅是对自己有利
- 对社区的其他成员表现出同理心

## 📞 联系方式

如果你有任何问题或建议，请通过以下方式联系我们：

- GitHub Issues: [问题反馈](https://github.com/yourusername/wechat-mcp-system/issues)
- GitHub Discussions: [讨论区](https://github.com/yourusername/wechat-mcp-system/discussions)

---

感谢你的贡献！🎉