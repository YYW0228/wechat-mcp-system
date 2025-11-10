'use client';

/**
 * 简化版微信公众号管理系统主页
 * 专注于可工作的核心功能
 */

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { validateUrl, validateTitle, validateContent, validateExcelFile } from '@/lib/validation-utils';
import { SimpleError, SimpleSuccess } from '@/components/ui/validation';
import {
  FileText,
  Link as LinkIcon,
  Edit3,
  Upload,
  BarChart3,
  Users,
  Bot,
  TrendingUp,
  Plus,
  CheckCircle
} from 'lucide-react';

export default function SimpleHomePage() {
  const [activeTab, setActiveTab] = useState('import');
  const [linkInput, setLinkInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const [stats] = useState({
    total: 1248,
    today: 32,
    published: 892,
    views: 125840
  });

  const handleLinkImport = async () => {
    const links = linkInput.trim().split('\n').filter(link => link.trim());

    if (links.length === 0) {
      setErrors({ link: '请输入至少一个链接' });
      return;
    }

    const invalidLinks = links.filter(link => !validateUrl(link));
    if (invalidLinks.length > 0) {
      setErrors({ link: `发现 ${invalidLinks.length} 个无效链接` });
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccessMessage(`成功导入 ${links.length} 个链接`);
      setLinkInput('');
    } catch (error) {
      setErrors({ link: '导入失败，请重试' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContentSubmit = async () => {
    const titleError = validateTitle(titleInput);
    const contentError = validateContent(contentInput);

    if (titleError || contentError) {
      setErrors({ title: titleError || '', content: contentError || '' });
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage('内容提交成功');
      setTitleInput('');
      setContentInput('');
    } catch (error) {
      setErrors({ submit: '提交失败，请重试' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      setErrors({ file: '请选择文件' });
      return;
    }

    const fileError = validateExcelFile(excelFile);
    if (fileError) {
      setErrors({ file: fileError });
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // 模拟文件上传
      await new Promise(resolve => setTimeout(resolve, 3000));

      setSuccessMessage(`文件 ${excelFile.name} 上传成功`);
      setExcelFile(null);
    } catch (error) {
      setErrors({ file: '文件上传失败，请重试' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            微信公众号管理系统
          </h1>
          <p className="text-xl text-gray-600">
            企业级微信公众号管理系统
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">总素材</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Plus className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">今日新增</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">已发布</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">总浏览</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2" />
                {successMessage}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={activeTab === 'import' ? 'default' : 'outline'}
                onClick={() => setActiveTab('import')}
                className="flex items-center gap-2"
              >
                <LinkIcon className="h-4 w-4" />
                链接导入
              </Button>
              <Button
                variant={activeTab === 'manual' ? 'default' : 'outline'}
                onClick={() => setActiveTab('manual')}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                手写素材
              </Button>
              <Button
                variant={activeTab === 'excel' ? 'default' : 'outline'}
                onClick={() => setActiveTab('excel')}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Excel上传
              </Button>
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <Link href="/dashboard-simple">
                  <BarChart3 className="h-4 w-4" />
                  数据分析
                </Link>
              </Button>
            </div>
            <CardTitle className="text-xl">
              {activeTab === 'import' && '链接批量导入'}
              {activeTab === 'manual' && '手写内容创作'}
              {activeTab === 'excel' && 'Excel文件上传'}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {activeTab === 'import' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    素材链接（支持批量，每行一个）
                  </label>
                  <textarea
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    className="w-full p-3 border rounded-lg h-32 resize-none"
                    placeholder="https://example.com/article1&#10;https://example.com/article2&#10;https://example.com/article3"
                  />
                  <SimpleError error={errors.link} />
                </div>
                <Button
                  onClick={handleLinkImport}
                  disabled={isProcessing}
                  className="w-full md:w-auto"
                >
                  {isProcessing ? '导入中...' : '导入链接'}
                </Button>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    文章标题
                  </label>
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    placeholder="输入文章标题"
                  />
                  <SimpleError error={errors.title} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    文章内容
                  </label>
                  <textarea
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    className="w-full p-3 border rounded-lg h-48 resize-none"
                    placeholder="输入文章内容..."
                  />
                  <SimpleError error={errors.content} />
                </div>
                <Button
                  onClick={handleContentSubmit}
                  disabled={isProcessing}
                  className="w-full md:w-auto"
                >
                  {isProcessing ? '提交中...' : '提交内容'}
                </Button>
              </div>
            )}

            {activeTab === 'excel' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    选择Excel文件
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">
                      支持 .xlsx, .xls, .csv 格式，最大 10MB
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="excel-upload"
                    />
                    <label htmlFor="excel-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>选择文件</span>
                      </Button>
                    </label>
                  </div>
                  {excelFile && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">
                        已选择：{excelFile.name}
                      </p>
                      <p className="text-xs text-blue-700">
                        大小：{(excelFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <SimpleError error={errors.file} />
                </div>
                <Button
                  onClick={handleExcelUpload}
                  disabled={isProcessing || !excelFile}
                  className="w-full md:w-auto"
                >
                  {isProcessing ? '上传中...' : '上传文件'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">智能优化</h3>
              <p className="text-gray-600">AI驱动的内容优化建议</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-semibold mb-2">数据分析</h3>
              <p className="text-gray-600">实时数据监控和趋势分析</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">多账号管理</h3>
              <p className="text-gray-600">统一管理多个公众号账号</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}