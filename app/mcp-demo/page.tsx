'use client';

/**
 * MCP服务集成演示页面
 * 完整展示所有MCP服务的功能和交互
 */

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  Globe,
  Image,
  Code,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Play,
  Download,
  Eye,
  TrendingUp,
  Users,
  FileText,
  Settings
} from 'lucide-react';

interface MCPService {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'offline' | 'busy';
  capabilities: string[];
  icon: React.ReactNode;
  color: string;
}

interface TestResult {
  service: string;
  status: 'success' | 'error' | 'pending';
  message: string;
  data?: any;
  timestamp: Date;
}

export default function MCPDemo() {
  const [services, setServices] = useState<MCPService[]>([
    {
      id: 'chrome-devtools',
      name: 'Chrome DevTools MCP',
      description: '网站性能分析、截图、网络监控',
      status: 'online',
      capabilities: ['性能分析', '页面截图', '网络监控', '控制台日志'],
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 'zai-vision',
      name: 'ZAI Vision MCP',
      description: '图像分析、UI/UX评估、设计优化',
      status: 'online',
      capabilities: ['图像分析', '设计质量评估', '色彩分析', '布局建议'],
      icon: <Image className="w-5 h-5" />,
      color: 'bg-purple-500'
    },
    {
      id: 'prompt-house',
      name: 'Prompt House MCP',
      description: 'AI提示词优化、模板管理',
      status: 'online',
      capabilities: ['提示词优化', '模板生成', 'AI协作', '工作流管理'],
      icon: <Bot className="w-5 h-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'context7',
      name: 'Context7 MCP',
      description: '技术文档查询、代码示例获取',
      status: 'busy',
      capabilities: ['技术文档', '代码示例', 'API查询', '最佳实践'],
      icon: <Code className="w-5 h-5" />,
      color: 'bg-orange-500'
    }
  ]);

  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('chrome-devtools');
  const [testInput, setTestInput] = useState<string>('');
  const [performanceData, setPerformanceData] = useState<any>(null);

  // 模拟测试单个MCP服务
  const testService = async (serviceId: string): Promise<TestResult> => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟API调用延迟

    const service = services.find(s => s.id === serviceId);

    switch (serviceId) {
      case 'chrome-devtools':
        return {
          service: serviceId,
          status: 'success',
          message: '性能分析完成',
          data: {
            lcp: '478ms',
            fcp: '320ms',
            cls: '0.05',
            performanceScore: 92
          },
          timestamp: new Date()
        };

      case 'zai-vision':
        return {
          service: serviceId,
          status: 'success',
          message: '图像分析完成',
          data: {
            qualityScore: 94,
            designSuggestions: ['优化对比度', '调整色彩平衡', '改进布局层次'],
            accessibility: 88
          },
          timestamp: new Date()
        };

      case 'prompt-house':
        return {
          service: serviceId,
          status: 'success',
          message: '提示词优化完成',
          data: {
            originalPrompt: testInput,
            optimizedPrompt: `${testInput} - 请详细说明，包含具体示例和最佳实践`,
            improvementScore: 76
          },
          timestamp: new Date()
        };

      case 'context7':
        return {
          service: serviceId,
          status: 'success',
          message: '文档查询完成',
          data: {
            documentation: 'React Hook最佳实践指南',
            examples: 12,
            relatedTopics: ['useState', 'useEffect', '性能优化']
          },
          timestamp: new Date()
        };

      default:
        return {
          service: serviceId,
          status: 'error',
          message: '服务不可用',
          timestamp: new Date()
        };
    }
  };

  // 运行所有服务测试
  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestResults([]);

    for (const service of services) {
      // 更新服务状态为busy
      setServices(prev => prev.map(s =>
        s.id === service.id ? { ...s, status: 'busy' } : s
      ));

      const result = await testService(service.id);
      setTestResults(prev => [...prev, result]);

      // 恢复服务状态
      setServices(prev => prev.map(s =>
        s.id === service.id ? { ...s, status: 'online' } : s
      ));

      if (service.id === 'chrome-devtools' && result.data) {
        setPerformanceData(result.data);
      }
    }

    setIsRunningTests(false);
  };

  // 测试单个服务
  const testSingleService = async (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;

    // 更新服务状态为busy
    setServices(prev => prev.map(s =>
      s.id === serviceId ? { ...s, status: 'busy' } : s
    ));

    const result = await testService(serviceId);
    setTestResults(prev => [result, ...prev]);

    // 恢复服务状态
    setServices(prev => prev.map(s =>
      s.id === serviceId ? { ...s, status: 'online' } : s
    ));

    if (serviceId === 'chrome-devtools' && result.data) {
      setPerformanceData(result.data);
    }
  };

  // 初始化时运行一次测试
  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'busy': return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MCP 服务集成演示
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            完整的 Model Context Protocol 服务展示
          </p>
          <Badge variant="secondary" className="text-sm">
            <Zap className="w-3 h-3 mr-1" />
            {services.filter(s => s.status === 'online').length} 个服务在线
          </Badge>
        </div>

        {/* 服务状态概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedService === service.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <div className={`w-8 h-8 ${service.color} rounded-lg flex items-center justify-center text-white mr-2`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm">{service.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                    </div>
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(service.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {service.capabilities.slice(0, 2).map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {service.capabilities.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.capabilities.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      testSingleService(service.id);
                    }}
                    disabled={service.status === 'busy' || isRunningTests}
                  >
                    {service.status === 'busy' ? (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3 mr-1" />
                    )}
                    测试服务
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 主控制面板 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 控制面板 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                服务测试控制台
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={runAllTests}
                  disabled={isRunningTests}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRunningTests ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      运行中...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      运行所有测试
                    </>
                  )}
                </Button>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">测试输入:</label>
                  <Input
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="输入测试内容..."
                    className="w-64"
                  />
                </div>
              </div>

              {/* 性能数据展示 */}
              {performanceData && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Chrome DevTools 性能分析结果
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{performanceData.lcp}</div>
                      <div className="text-sm text-gray-600">LCP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{performanceData.fcp}</div>
                      <div className="text-sm text-gray-600">FCP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{performanceData.cls}</div>
                      <div className="text-sm text-gray-600">CLS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{performanceData.performanceScore}</div>
                      <div className="text-sm text-gray-600">性能评分</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 实时状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                实时状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">在线服务</span>
                  <span className="text-sm font-medium">
                    {services.filter(s => s.status === 'online').length}/{services.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">测试完成</span>
                  <span className="text-sm font-medium">{testResults.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">成功率</span>
                  <span className="text-sm font-medium text-green-600">
                    {testResults.length > 0
                      ? Math.round((testResults.filter(r => r.status === 'success').length / testResults.length) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 测试结果 */}
        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  测试结果
                </span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  导出结果
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {result.status === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="font-medium">
                          {services.find(s => s.id === result.service)?.name}
                        </span>
                        <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                          {result.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{result.message}</p>

                    {result.data && (
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(result.data, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}