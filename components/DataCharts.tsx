/**
 * 数据可视化图表组件
 * 基于Recharts构建，支持响应式设计
 */

'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp, Users, Eye, FileText } from 'lucide-react';

interface DataChartsProps {
  stats: {
    total: number;
    today: number;
    published: number;
    views: number;
  };
}

export default function DataCharts({ stats }: DataChartsProps) {
  // 模拟历史数据
  const weeklyData = [
    { day: '周一', articles: 12, views: 240, engagement: 180 },
    { day: '周二', articles: 19, views: 320, engagement: 280 },
    { day: '周三', articles: 15, views: 280, engagement: 220 },
    { day: '周四', articles: 25, views: 450, engagement: 380 },
    { day: '周五', articles: 22, views: 380, engagement: 320 },
    { day: '周六', articles: 18, views: 300, engagement: 250 },
    { day: '周日', articles: 20, views: 350, engagement: 290 },
  ];

  // 内容类型分布
  const contentTypeData = [
    { name: '链接导入', value: 45, color: '#3b82f6' },
    { name: '手写素材', value: 30, color: '#10b981' },
    { name: 'Excel导入', value: 25, color: '#f59e0b' },
  ];

  // 账号表现数据
  const accountPerformance = [
    { account: '账号A', articles: 25, views: 1200, likes: 89 },
    { account: '账号B', articles: 18, views: 890, likes: 67 },
    { account: '账号C', articles: 32, views: 1560, likes: 123 },
    { account: '账号D', articles: 15, views: 670, likes: 45 },
  ];

  // 响应式配置
  const chartMargin = { top: 5, right: 5, bottom: 5, left: 5 };
  const mobileChartMargin = { top: 5, right: 5, bottom: 40, left: 40 };

  return (
    <div className="space-y-6">
      {/* 核心统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总素材数</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">今日新增</p>
              <p className="text-2xl font-bold text-green-600">{stats.today}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">已发布</p>
              <p className="text-2xl font-bold text-blue-600">{stats.published}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总浏览</p>
              <p className="text-2xl font-bold text-purple-600">{stats.views}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 图表网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 周趋势图表 */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">本周表现趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData} margin={window.innerWidth < 640 ? mobileChartMargin : chartMargin}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorViews)"
                strokeWidth={2}
                name="浏览量"
              />
              <Area
                type="monotone"
                dataKey="engagement"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorEngagement)"
                strokeWidth={2}
                name="互动量"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 内容类型分布 */}
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">内容类型分布</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {contentTypeData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 账号表现排行 */}
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">账号表现排行</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={accountPerformance} margin={window.innerWidth < 640 ? mobileChartMargin : chartMargin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="account"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Bar
              dataKey="views"
              fill="#3b82f6"
              name="浏览量"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="likes"
              fill="#10b981"
              name="点赞数"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 实时数据统计 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
        <h3 className="text-xl font-semibold mb-4">实时数据统计</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">89%</p>
            <p className="text-sm opacity-90">内容质量评分</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">4.8</p>
            <p className="text-sm opacity-90">平均互动率</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">2.3k</p>
            <p className="text-sm opacity-90">今日新增粉丝</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">95%</p>
            <p className="text-sm opacity-90">发布成功率</p>
          </div>
        </div>
      </div>
    </div>
  );
}