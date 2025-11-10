/**
 * 微信公众号内容管理系统 - 静态演示版
 * WeChat Public Account Content Management System - Static Demo Version
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bot,
  Image,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Rocket,
  Eye,
  Download,
  Share,
  Globe,
  Code,
  FileText
} from 'lucide-react';

interface MCPService {
  name: string;
  status: 'online' | 'offline' | 'busy';
  capabilities: string[];
  last_used?: string;
}

const WeChatContentManager: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('chrome-devtools');
  const [contentTopic, setContentTopic] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 模拟MCP服务状态
  const mcpServices: MCPService[] = [
    {
      name: 'chrome-devtools',
      status: 'online',
      capabilities: ['性能分析', '截图', '网络监控'],
      last_used: '刚刚'
    },
    {
      name: 'zai-vision',
      status: 'online',
      capabilities: ['图像分析', 'UI/UX评估', '色彩分析'],
      last_used: '2分钟前'
    },
    {
      name: 'prompt-house',
      status: 'online',
      capabilities: ['提示词优化', '模板管理', 'AI协作'],
      last_used: '5分钟前'
    },
    {
      name: 'context7',
      status: 'busy',
      capabilities: ['技术文档', '代码示例', 'API查询'],
      last_used: '10分钟前'
    }
  ];

  // 模拟内容生成
  const handleGenerateContent = async () => {
    if (!contentTopic.trim()) return;

    setIsGenerating(true);

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sampleContent = `# ${contentTopic}

## 引言
在这个数字化时代，${contentTopic}已经成为了一个重要的话题。本文将深入探讨相关内容。

## 主要观点
1. **技术发展**: 随着技术的不断进步，${contentTopic}正在经历快速变革。
2. **市场趋势**: 当前市场对${contentTopic}的需求持续增长。
3. **未来展望**: 展望未来，${contentTopic}有着广阔的发展前景。

## 结论
${contentTopic}是一个值得我们持续关注和投入的领域。通过不断的创新和优化，我们能够在这个领域取得更大的成就。

---
*本文由AI辅助生成，基于MCP服务集成*
`;

    setGeneratedContent(sampleContent);
    setIsGenerating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'chrome-devtools': return <Globe className="w-4 h-4" />;
      case 'zai-vision': return <Image className="w-4 h-4" />;
      case 'prompt-house': return <Bot className="w-4 h-4" />;
      case 'context7': return <Code className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            微信公众号矩阵管理系统
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            MCP服务集成演示 - 静态版本
          </p>
          <Badge variant="secondary" className="text-sm">
            <Zap className="w-3 h-3 mr-1" />
            4个MCP服务在线
          </Badge>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">服务概览</TabsTrigger>
            <TabsTrigger value="content">内容生成</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
            <TabsTrigger value="demo">功能演示</TabsTrigger>
          </TabsList>

          {/* 服务概览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mcpServices.map((service) => (
                <Card key={service.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center">
                        {getServiceIcon(service.name)}
                        <span className="ml-2">{service.name}</span>
                      </CardTitle>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">
                        最后使用: {service.last_used}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.capabilities.map((capability, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  系统状态
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">MCP服务在线</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">92/100</div>
                    <div className="text-sm text-gray-600">性能评分</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">6.94kB</div>
                    <div className="text-sm text-gray-600">页面大小</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 内容生成 */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  AI内容生成
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    文章主题
                  </label>
                  <Input
                    placeholder="输入您想要生成的文章主题..."
                    value={contentTopic}
                    onChange={(e) => setContentTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    选择MCP服务
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {mcpServices.map((service) => (
                      <Button
                        key={service.name}
                        variant={selectedService === service.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedService(service.name)}
                        className="flex items-center"
                      >
                        {getServiceIcon(service.name)}
                        <span className="ml-1 text-xs">{service.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateContent}
                  disabled={!contentTopic.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      正在生成内容...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4 mr-2" />
                      生成内容
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">
                      生成结果
                    </label>
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={10}
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        下载
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4 mr-1" />
                        分享
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  性能分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">页面性能指标</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>LCP</span>
                          <span className="text-green-600">478ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>FCP</span>
                          <span className="text-green-600">320ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>CLS</span>
                          <span className="text-yellow-600">0.05</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">SEO优化建议</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 优化图片加载速度</li>
                        <li>• 减少JavaScript包大小</li>
                        <li>• 提高服务器响应时间</li>
                        <li>• 添加结构化数据标记</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 功能演示 */}
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  MCP服务演示
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    这是MCP服务集成的静态演示版本。在实际部署中，这些服务将提供：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Chrome DevTools MCP
                      </h4>
                      <p className="text-sm text-gray-600">
                        网站性能分析、截图、网络监控等功能
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Image className="w-4 h-4 mr-2" />
                        ZAI Vision MCP
                      </h4>
                      <p className="text-sm text-gray-600">
                        图像分析、UI/UX评估、色彩分析
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Bot className="w-4 h-4 mr-2" />
                        Prompt House MCP
                      </h4>
                      <p className="text-sm text-gray-600">
                        AI提示词优化、模板管理
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Code className="w-4 h-4 mr-2" />
                        Context7 MCP
                      </h4>
                      <p className="text-sm text-gray-600">
                        技术文档查询、代码示例获取
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WeChatContentManager;