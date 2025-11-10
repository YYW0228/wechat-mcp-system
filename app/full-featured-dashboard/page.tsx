'use client';

/**
 * 完整功能版微信公众号管理主页面
 * Full-Featured WeChat Public Account Management Dashboard
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Plus,
  Link as LinkIcon,
  Edit3,
  Upload,
  BarChart3,
  Users,
  Bot,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
  Settings,
  Menu,
  X,
  ArrowRight,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

// 完整的业务类型
interface Material {
  id: string;
  title: string;
  sourceType: 'link' | 'manual' | 'excel';
  originalUrl?: string;
  status: 'draft' | 'processing' | 'completed' | 'published';
  rewrittenCount: number;
  publishedCount: number;
  createTime: string;
  tags: string[];
}

// 完整的侧边栏导航
const navigation = [
  { name: '公众号创作', href: '#', icon: FileText, current: true },
  { name: '素材管理', href: '#', icon: FileText, current: false },
  { name: '发布中心', href: '#', icon: ArrowRight, current: false },
  { name: 'AI创作设置', href: '#', icon: Settings, current: false },
  { name: '文本提示词', href: '#', icon: Edit3, current: false },
  { name: '图片提示词', href: '#', icon: Edit3, current: false },
  { name: '智能体工作流', href: '#', icon: Bot, current: false },
  { name: '公众号管理', href: '#', icon: Users, current: false },
];

// 模拟完整数据
const mockUser = {
  username: 'demo_user',
  credits: 1250,
  avatar: null
};

const mockStats = {
  totalMaterials: 1248,
  publishedWorks: 892,
  totalViews: 125840,
  totalEngagement: 15632,
  averageEngagement: 12.4
};

const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'AI技术在公众号运营中的应用前景',
    sourceType: 'link',
    originalUrl: 'https://example.com/ai-wechat',
    status: 'completed',
    rewrittenCount: 3,
    publishedCount: 1,
    createTime: '2025-01-10',
    tags: ['AI', '公众号运营', '技术创新']
  },
  {
    id: '2',
    title: '微信公众号内容创作的10个技巧',
    sourceType: 'manual',
    status: 'processing',
    rewrittenCount: 0,
    publishedCount: 0,
    createTime: '2025-01-09',
    tags: ['内容创作', '写作技巧']
  },
  {
    id: '3',
    title: '如何提高公众号文章的阅读量和转发率',
    sourceType: 'excel',
    status: 'draft',
    rewrittenCount: 0,
    publishedCount: 0,
    createTime: '2025-01-08',
    tags: ['增长技巧', '数据分析']
  }
];

export default function FullFeaturedDashboard() {
  const [activeTab, setActiveTab] = useState('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 筛选逻辑
  const filteredMaterials = mockMaterials.filter(material =>
    material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 批量操作
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMaterials(mockMaterials.map(m => m.id));
    } else {
      setSelectedMaterials([]);
    }
  };

  const handleSelectMaterial = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials(prev => [...prev, id]);
    } else {
      setSelectedMaterials(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBatchOperation = (operation: string) => {
    alert(`批量操作: ${operation} - 选中 ${selectedMaterials.length} 个素材`);
  };

  const handleMaterialAction = (action: string, material: Material) => {
    alert(`操作: ${action} - ${material.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏 */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-400 mr-3" />
              <h1 className="text-xl font-bold">微绿流量宝</h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 用户信息 */}
          <div className="px-4 py-3 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{mockUser.username}</p>
                <p className="text-xs text-gray-400">积分: {mockUser.credits}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-gray-800 rounded">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 导航 */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    transition-colors duration-200
                    ${item.current
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 主内容区 */}
      <main className="flex-1 lg:ml-64">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">公众号创作</h1>
            <p className="text-gray-600">管理和优化您的微信公众号内容</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">总素材</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.totalMaterials}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">已发布</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.publishedWorks}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">总浏览</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.totalViews.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">平均互动</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.averageEngagement}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主要内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：素材创建和管理 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 创建素材 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>创建素材</span>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      新建素材
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                    >
                      <LinkIcon className="h-8 w-8 text-blue-500" />
                      <span>链接导入</span>
                      <span className="text-xs text-gray-500">批量导入URL素材</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                    >
                      <Edit3 className="h-8 w-8 text-green-500" />
                      <span>手写素材</span>
                      <span className="text-xs text-gray-500">手动创作内容</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-purple-500" />
                      <span>Excel导入</span>
                      <span className="text-xs text-gray-500">批量文件导入</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 素材列表 */}
              <Card>
                <CardHeader>
                  <CardTitle>素材列表</CardTitle>
                  {/* 搜索和筛选 */}
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜索素材..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* 批量操作栏 */}
                  {selectedMaterials.length > 0 && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">
                          已选择 {selectedMaterials.length} 个素材
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleBatchOperation('rewrite')}>
                            批量改写
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBatchOperation('publish')}>
                            批量发布
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleBatchOperation('delete')}>
                            批量删除
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 素材表格 */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">
                            <input
                              type="checkbox"
                              checked={selectedMaterials.length === mockMaterials.length}
                              onChange={(e) => handleSelectAll(e.target.checked)}
                              className="rounded"
                            />
                          </th>
                          <th className="text-left py-3 px-2">标题</th>
                          <th className="text-left py-3 px-2">类型</th>
                          <th className="text-left py-3 px-2">状态</th>
                          <th className="text-left py-3 px-2">改写数</th>
                          <th className="text-left py-3 px-2">发布数</th>
                          <th className="text-left py-3 px-2">创建时间</th>
                          <th className="text-left py-3 px-2">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMaterials.map((material) => (
                          <tr key={material.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-2">
                              <input
                                type="checkbox"
                                checked={selectedMaterials.includes(material.id)}
                                onChange={(e) => handleSelectMaterial(material.id, e.target.checked)}
                                className="rounded"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-medium text-gray-900">{material.title}</p>
                                {material.originalUrl && (
                                  <a
                                    href={material.originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-xs"
                                  >
                                    查看原文
                                  </a>
                                )}
                                <div className="flex gap-1 mt-1">
                                  {material.tags.map(tag => (
                                    <span key={tag} className="text-xs px-1 py-0.5 bg-gray-100 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                material.sourceType === 'link' ? 'bg-blue-100 text-blue-800' :
                                material.sourceType === 'manual' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {material.sourceType === 'link' && '链接导入'}
                                {material.sourceType === 'manual' && '手写素材'}
                                {material.sourceType === 'excel' && 'Excel导入'}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <Badge variant={
                                material.status === 'completed' ? 'default' :
                                material.status === 'processing' ? 'secondary' :
                                material.status === 'published' ? 'default' : 'outline'
                              }>
                                {material.status === 'completed' && '已完成'}
                                {material.status === 'processing' && '处理中'}
                                {material.status === 'published' && '已发布'}
                                {material.status === 'draft' && '草稿'}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 font-medium">{material.rewrittenCount}</td>
                            <td className="py-3 px-2 font-medium text-green-600">{material.publishedCount}</td>
                            <td className="py-3 px-2 text-gray-500">{material.createTime}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center space-x-1">
                                <Button size="sm" variant="ghost" onClick={() => handleMaterialAction('view', material)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleMaterialAction('edit', material)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleMaterialAction('delete', material)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：AI工具和设置 */}
            <div className="space-y-6">
              {/* AI工具 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI工具
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">内容改写</span>
                      <Badge variant="secondary">已启用</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">SEO优化</span>
                      <Badge variant="secondary">已启用</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">标题优化</span>
                      <Badge variant="secondary">已启用</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">内容扩写</span>
                      <Badge variant="outline">未启用</Badge>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    配置AI策略
                  </Button>
                </CardContent>
              </Card>

              {/* 定时发布 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    定时发布
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">待发布</span>
                      <Badge variant="outline">3篇</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">下次发布</span>
                      <Badge variant="outline">今天 18:00</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">发布频率</span>
                      <Badge variant="outline">每日1篇</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    管理计划
                  </Button>
                </CardContent>
              </Card>

              {/* 快速操作 */}
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    批量导入素材
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    查看数据报表
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    系统设置
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 状态指示器 */}
          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>系统正常运行</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>LCP: 741ms</span>
              <span>FCP: 550ms</span>
              <span>CLS: 0.00</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}