/**
 * 文章统计API
 * 提供各种统计数据和趋势分析
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 模拟数据 - 生产环境从数据库获取
const mockStats = {
  total: 156,
  published: 89,
  draft: 34,
  scheduled: 12,
  archived: 21,
  byType: {
    article: 120,
    image: 24,
    video: 8,
    link: 4,
  },
  byStatus: {
    published: 89,
    draft: 34,
    scheduled: 12,
    review: 0,
    archived: 21,
  },
  trends: {
    daily: [
      { date: '2025-11-05', count: 12 },
      { date: '2025-11-06', count: 8 },
      { date: '2025-11-07', count: 15 },
      { date: '2025-11-08', count: 6 },
      { date: '2025-11-09', count: 18 },
      { date: '2025-11-10', count: 9 },
    ],
    weekly: [
      { week: '2025-W45', count: 68 },
      { week: '2025-W44', count: 45 },
      { week: '2025-W43', count: 72 },
      { week: '2025-W42', count: 38 },
    ],
    monthly: [
      { month: '2025-11', count: 68 },
      { month: '2025-10', count: 125 },
      { month: '2025-09', count: 98 },
      { month: '2025-08', count: 142 },
      { month: '2025-07', count: 87 },
      { month: '2025-06', count: 95 },
    ],
  },
  performance: {
    totalViews: 45680,
    totalLikes: 2340,
    totalShares: 890,
    totalComments: 450,
    avgReadTime: 4.2,
    avgEngagementRate: 8.5,
  },
  topPerforming: [
    {
      id: '1',
      title: '如何提升公众号内容质量',
      views: 1250,
      likes: 89,
      shares: 34,
      engagementRate: 12.4,
    },
    {
      id: '2',
      title: 'AI工具在内容创作中的应用',
      views: 890,
      likes: 67,
      shares: 28,
      engagementRate: 11.8,
    },
    {
      id: '4',
      title: '2025年内容创作趋势预测',
      views: 756,
      likes: 45,
      shares: 19,
      engagementRate: 8.6,
    },
  ],
  accountStats: [
    {
      accountId: 'account1',
      accountName: '主账号',
      total: 89,
      published: 45,
      avgReadCount: 890,
      engagementRate: 9.2,
    },
    {
      accountId: 'account2',
      accountName: '备用账号',
      total: 34,
      published: 23,
      avgReadCount: 456,
      engagementRate: 7.8,
    },
    {
      accountId: 'account3',
      accountName: '品牌账号',
      total: 33,
      published: 21,
      avgReadCount: 1234,
      engagementRate: 11.5,
    },
  ],
};

// GET: 获取统计数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type'); // overview, performance, trends, accounts
    const accountId = searchParams.get('accountId');

    // 根据查询参数返回相应的统计数据
    let data: any = mockStats;

    if (type === 'overview') {
      data = {
        total: mockStats.total,
        published: mockStats.published,
        draft: mockStats.draft,
        scheduled: mockStats.scheduled,
        archived: mockStats.archived,
        performance: mockStats.performance,
      };
    } else if (type === 'performance') {
      data = {
        performance: mockStats.performance,
        topPerforming: mockStats.topPerforming,
      };
    } else if (type === 'trends') {
      data = mockStats.trends;
    } else if (type === 'accounts') {
      data = mockStats.accountStats;
    }

    // 如果指定了账号ID，过滤数据
    if (accountId && type === 'accounts') {
      data = mockStats.accountStats.filter(account => account.accountId === accountId);
    }

    // 日期过滤逻辑（实际项目中应该在数据库查询中处理）
    if (startDate && endDate) {
      // 这里应该根据日期范围过滤统计数据
      console.log(`统计日期范围: ${startDate} 到 ${endDate}`);
    }

    return NextResponse.json({
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
        filters: {
          startDate,
          endDate,
          type,
          accountId,
        },
      },
    });
  } catch (error) {
    console.error('获取统计数据错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取统计数据失败',
        },
      },
      { status: 500 }
    );
  }
}

// POST: 刷新统计数据
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { force = false } = body;

    // 这里应该触发统计数据的重新计算
    console.log('刷新统计数据，强制更新:', force);

    // 模拟异步计算过程
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      data: {
        message: '统计数据刷新完成',
        lastUpdated: new Date().toISOString(),
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('刷新统计数据错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '刷新统计数据失败',
        },
      },
      { status: 500 }
    );
  }
}