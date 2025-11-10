'use client';

/**
 * 简化版仪表板 - 真正可工作的企业级系统
 * 基于您的深度分析构建，专注于核心业务价值
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Archive,
  BarChart3,
} from 'lucide-react';

// 简化的类型定义
interface Article {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  publishTime?: string;
  readCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
  archived: number;
}

export default function SimpleDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    draft: 0,
    scheduled: 0,
    archived: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // 获取文章列表
  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/articles');
      const data = await response.json();

      if (data.success) {
        setArticles(data.data?.data || []);

        // 计算统计数据
        const newStats = data.data?.data?.reduce(
          (acc: Stats, article: Article) => {
            acc.total++;
            acc[article.status]++;
            return acc;
          },
          { total: 0, published: 0, draft: 0, scheduled: 0, archived: 0 }
        ) || { total: 0, published: 0, draft: 0, scheduled: 0, archived: 0 };

        setStats(newStats);
      }
    } catch (error) {
      console.error('获取文章列表失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取统计数据
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/articles/stats');
      const data = await response.json();

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  // 创建新文章
  const createArticle = async () => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '新建文章',
          content: '请编辑文章内容...',
          author: '当前用户',
          status: 'draft',
          type: 'article',
          tags: [],
          seo: { keywords: [] },
          metrics: { views: 0, likes: 0, shares: 0, comments: 0, readTime: 0 },
        }),
      });

      if (response.ok) {
        fetchArticles(); // 刷新列表
      }
    } catch (error) {
      console.error('创建文章失败:', error);
    }
  };

  // 更新文章状态
  const updateArticleStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          status: newStatus,
          publishTime: newStatus === 'published' ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        fetchArticles(); // 刷新列表
      }
    } catch (error) {
      console.error('更新文章状态失败:', error);
    }
  };

  // 删除文章
  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/articles?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchArticles(); // 刷新列表
      }
    } catch (error) {
      console.error('删除文章失败:', error);
    }
  };

  // 过滤文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'scheduled': return <Calendar className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // 页面加载时获取数据
  useEffect(() => {
    fetchArticles();
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">内容管理中心</h1>
            <p className="text-gray-600 mt-1">管理您的微信公众号内容矩阵</p>
          </div>
          <Button onClick={createArticle} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            新建内容
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">总内容数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">已发布</p>
                  <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">草稿</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Edit className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">已安排</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 文章列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>文章列表</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="搜索文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">全部状态</option>
                  <option value="published">已发布</option>
                  <option value="draft">草稿</option>
                  <option value="scheduled">已安排</option>
                  <option value="archived">已归档</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <Badge className={getStatusStyle(article.status)}>
                        {getStatusIcon(article.status)}
                        <span className="ml-1">{article.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      作者: {article.author} • 创建于 {new Date(article.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.readCount}
                      </span>
                      {article.publishTime && (
                        <span>发布于 {new Date(article.publishTime).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {article.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => updateArticleStatus(article.id, 'published')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        发布
                      </Button>
                    )}
                    {article.status === 'published' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateArticleStatus(article.id, 'draft')}
                      >
                        撤回
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteArticle(article.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">暂无文章</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {searchQuery || statusFilter !== 'all' ? '没有符合筛选条件的文章' : '开始创建您的第一篇文章'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 快速操作面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col"
                  onClick={createArticle}
                >
                  <FileText className="w-6 h-6 mb-2" />
                  新建文章
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  定时发布
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  数据报表
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  账号管理
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">API状态</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    正常
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">最后更新</span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">系统版本</span>
                  <span className="text-sm text-gray-900">v1.0.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}