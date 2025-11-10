/**
 * 文章批量操作API
 * 支持批量发布、删除、状态更新等操作
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 导入模拟数据（实际项目中应从数据库模块导入）
// 注意：这里为了演示使用了全局变量，生产环境应该使用数据库
declare global {
  var __articles: any[] | undefined;
}

// 获取文章数据（模拟）
function getArticles(): any[] {
  if (!global.__articles) {
    global.__articles = [
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
  }
  return global.__articles;
}

// POST: 批量操作文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, action, data } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '请提供有效的文章ID列表',
          },
        },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '请指定操作类型',
          },
        },
        { status: 400 }
      );
    }

    const articles = getArticles();
    let successCount = 0;
    let failedCount = 0;
    const errors: any[] = [];

    // 执行批量操作
    for (const id of ids) {
      try {
        const articleIndex = articles.findIndex(article => article.id === id);

        if (articleIndex === -1) {
          errors.push({ id, message: '文章不存在' });
          failedCount++;
          continue;
        }

        const article = articles[articleIndex];
        const now = new Date().toISOString();

        switch (action) {
          case 'publish':
            article.status = 'published';
            article.publishTime = now;
            break;

          case 'unpublish':
            article.status = 'draft';
            article.publishTime = null;
            break;

          case 'delete':
            articles.splice(articleIndex, 1);
            break;

          case 'archive':
            article.status = 'archived';
            break;

          case 'draft':
            article.status = 'draft';
            article.publishTime = null;
            break;

          case 'update_tags':
            if (data?.tags) {
              article.tags = data.tags;
            }
            break;

          case 'update_account':
            if (data?.accountId) {
              article.accountId = data.accountId;
            }
            break;

          default:
            errors.push({ id, message: `不支持的操作: ${action}` });
            failedCount++;
            continue;
        }

        if (action !== 'delete') {
          article.updatedAt = now;
        }

        successCount++;
      } catch (error) {
        console.error(`批量操作失败 - ID: ${id}`, error);
        errors.push({ id, message: '操作失败' });
        failedCount++;
      }
    }

    // 记录操作日志
    console.log(`批量操作完成 - 操作: ${action}, 成功: ${successCount}, 失败: ${failedCount}`);

    return NextResponse.json({
      success: true,
      data: {
        success: successCount,
        failed: failedCount,
        total: ids.length,
        errors: errors.length > 0 ? errors : undefined,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('批量操作API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '批量操作失败',
        },
      },
      { status: 500 }
    );
  }
}

// GET: 获取批量操作状态（用于长时间操作）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const operationId = searchParams.get('operationId');

    if (!operationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '缺少操作ID',
          },
        },
        { status: 400 }
      );
    }

    // 这里应该从缓存或数据库中获取操作状态
    // 为了演示，返回一个模拟状态
    return NextResponse.json({
      success: true,
      data: {
        operationId,
        status: 'completed', // pending, running, completed, failed
        progress: 100,
        result: {
          total: 10,
          processed: 10,
          success: 9,
          failed: 1,
        },
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('获取批量操作状态错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取操作状态失败',
        },
      },
      { status: 500 }
    );
  }
}