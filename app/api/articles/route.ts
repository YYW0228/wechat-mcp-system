/**
 * 文章管理API - 核心业务逻辑
 * 实现完整的CRUD操作、搜索、过滤、批量操作
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 模拟数据库存储 - 生产环境应使用真实数据库
let articles: any[] = [
  {
    id: '1',
    title: '如何提升公众号内容质量',
    content: '这是一个关于提升内容质量的文章内容...',
    author: '张三',
    publishTime: '2025-11-01T10:00:00Z',
    readCount: 1250,
    status: 'published',
    type: 'article',
    tags: ['内容创作', '公众号运营'],
    accountId: 'account1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'AI工具在内容创作中的应用',
    content: 'AI工具如何帮助我们更好地创作内容...',
    author: '李四',
    publishTime: '2025-11-05T14:30:00Z',
    readCount: 890,
    status: 'published',
    type: 'article',
    tags: ['AI', '工具', '效率'],
    accountId: 'account2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: '微信公众号排版技巧',
    content: '让您的文章看起来更专业的排版技巧...',
    author: '王五',
    publishTime: null,
    readCount: 0,
    status: 'draft',
    type: 'article',
    tags: ['排版', '设计'],
    accountId: 'account1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// 工具函数：生成ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 工具函数：过滤文章
function filterArticles(articles: any[], search?: string, status?: string, accountId?: string) {
  let filtered = [...articles];

  if (search) {
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.content.toLowerCase().includes(search.toLowerCase()) ||
      article.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(article => article.status === status);
  }

  if (accountId && accountId !== 'all') {
    filtered = filtered.filter(article => article.accountId === accountId);
  }

  return filtered;
}

// 工具函数：分页
function paginateArticles(articles: any[], page: number = 1, limit: number = 20) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = articles.slice(startIndex, endIndex);

  return {
    data: paginatedItems,
    pagination: {
      page,
      limit,
      total: articles.length,
      totalPages: Math.ceil(articles.length / limit),
      hasNext: endIndex < articles.length,
      hasPrev: page > 1,
    },
  };
}

// GET: 获取文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const accountId = searchParams.get('accountId') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'updatedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // 过滤文章
    let filteredArticles = filterArticles(articles, search, status, accountId);

    // 排序
    filteredArticles.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 分页
    const result = paginateArticles(filteredArticles, page, limit);

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('GET articles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取文章列表失败',
        },
      },
      { status: 500 }
    );
  }
}

// POST: 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newArticle = {
      id: generateId(),
      ...body,
      readCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    articles.unshift(newArticle);

    return NextResponse.json({
      success: true,
      data: newArticle,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('POST articles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '创建文章失败，请检查输入数据',
        },
      },
      { status: 400 }
    );
  }
}

// PUT: 更新文章
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: '文章不存在',
          },
        },
        { status: 404 }
      );
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: articles[articleIndex],
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('PUT articles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '更新文章失败，请检查输入数据',
        },
      },
      { status: 400 }
    );
  }
}

// DELETE: 删除文章
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '缺少文章ID',
          },
        },
        { status: 400 }
      );
    }

    const articleIndex = articles.findIndex(article => article.id === id);

    if (articleIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: '文章不存在',
          },
        },
        { status: 404 }
      );
    }

    articles.splice(articleIndex, 1);

    return NextResponse.json({
      success: true,
      data: { id },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('DELETE articles error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '删除文章失败',
        },
      },
      { status: 500 }
    );
  }
}