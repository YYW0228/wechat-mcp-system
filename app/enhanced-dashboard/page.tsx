'use client';

/**
 * 增强版微信公众号管理主页面 - 简化版本
 * Enhanced WeChat Public Account Management Dashboard - Simplified Version
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  AlertCircle
} from 'lucide-react';

// 模拟数据
const mockStats = {
  totalMaterials: 1248,
  publishedWorks: 892,
  totalViews: 125840,
  totalEngagement: 15632,
  averageEngagement: 12.4
};

const mockMaterials = [
  {
    id: '1',
    title: 'AI技术在公众号运营中的应用前景',
    sourceType: 'link' as const,
    status: 'completed' as const,
    rewrittenCount: 3,
    publishedCount: 1,
    createTime: '2025-01-10',
    originalUrl: 'https://example.com/ai-wechat'
  },
  {
    id: '2',
    title: '微信公众号内容创作的10个技巧',
    sourceType: 'manual' as const,
    status: 'processing' as const,
    rewrittenCount: 0,
    publishedCount: 0,
    createTime: '2025-01-09'
  }
];

export default function EnhancedDashboard() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">微信公众号管理系统</h1>
          <p className="text-gray-600">企业级内容管理与数据分析平台</p>
        </div>

        {/* Stats Cards */}
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Material Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  创建素材
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

            {/* Materials Table */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>素材列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">标题</th>
                        <th className="text-left py-2">类型</th>
                        <th className="text-left py-2">状态</th>
                        <th className="text-left py-2">改写数</th>
                        <th className="text-left py-2">发布数</th>
                        <th className="text-left py-2">创建时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMaterials.map((material) => (
                        <tr key={material.id} className="border-b">
                          <td className="py-2">
                            <div>
                              <p className="font-medium">{material.title}</p>
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
                            </div>
                          </td>
                          <td className="py-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                              {material.sourceType === 'link' && '链接导入'}
                              {material.sourceType === 'manual' && '手写素材'}
                            </span>
                          </td>
                          <td className="py-2">
                            <Badge variant={material.status === 'completed' ? 'default' : 'secondary'}>
                              {material.status === 'completed' && '已完成'}
                              {material.status === 'processing' && '处理中'}
                            </Badge>
                          </td>
                          <td className="py-2">{material.rewrittenCount}</td>
                          <td className="py-2">{material.publishedCount}</td>
                          <td className="py-2 text-gray-500">{material.createTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Tools Section */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI工具
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
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
                </div>
                <Button className="w-full">
                  <Bot className="h-4 w-4 mr-2" />
                  配置AI策略
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  定时发布
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">待发布</span>
                    <Badge variant="outline">3篇</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">下次发布</span>
                    <Badge variant="outline">今天 18:00</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  管理计划
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Status Footer */}
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
    </div>
  );
}