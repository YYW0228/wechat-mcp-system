/**
 * Excel导入API
 * 支持.xlsx, .xls, .csv文件批量导入
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 模拟Excel解析结果
function parseMockExcelData(file: File): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟从Excel文件解析出的数据
      const mockData = [
        {
          title: 'Excel导入示例文章1',
          content: '这是从Excel文件导入的第一篇文章内容。文章内容丰富，包含多个段落和重要信息。',
          author: 'Excel用户',
          status: 'draft',
          tags: ['Excel导入', '自动生成'],
          readCount: 0,
        },
        {
          title: 'Excel导入示例文章2',
          content: '这是第二篇从Excel导入的文章。内容结构清晰，重点突出。',
          author: 'Excel用户',
          status: 'draft',
          tags: ['Excel导入', '技术分享'],
          readCount: 0,
        },
        {
          title: 'Excel导入示例文章3',
          content: '第三篇文章主要介绍了Excel导入功能的强大之处，支持批量处理大量数据。',
          author: 'Excel用户',
          status: 'draft',
          tags: ['Excel导入', '功能介绍'],
          readCount: 0,
        },
      ];
      resolve(mockData);
    }, 1000);
  });
}

// POST: Excel文件导入
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const options = JSON.parse(formData.get('options') as string);

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: '请选择要导入的Excel文件',
          },
        },
        { status: 400 }
      );
    }

    // 验证文件类型
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls|csv)$/i)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE_TYPE',
            message: '不支持的文件格式，请选择 .xlsx, .xls 或 .csv 文件',
          },
        },
        { status: 400 }
      );
    }

    // 验证文件大小 (10MB限制)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_TOO_LARGE',
            message: '文件大小超过限制，最大支持10MB',
          },
        },
        { status: 400 }
      );
    }

    // 解析Excel文件
    const articles = await parseMockExcelData(file);

    // 应用导入选项
    const { accountId = 'default', skipDuplicates = true, updateExisting = false, status = 'draft' } = options;

    let imported = 0;
    let skipped = 0;
    const errors: Array<{ row: number; message: string }> = [];

    // 模拟导入过程
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];

      try {
        // 创建新文章
        const newArticle = {
          ...article,
          accountId,
          type: 'article',
          seo: { keywords: article.tags },
          metrics: { views: 0, likes: 0, shares: 0, comments: 0, readTime: Math.ceil(article.content.length / 200) },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // 这里应该保存到数据库
        // await saveArticle(newArticle);
        imported++;

      } catch (error) {
        errors.push({
          row: i + 2, // Excel行号（通常从第2行开始是数据）
          message: `导入失败: ${error instanceof Error ? error.message : '未知错误'}`,
        });
        skipped++;
      }
    }

    // 记录导入日志
    console.log(`Excel导入完成 - 文件: ${file.name}, 导入: ${imported}, 跳过: ${skipped}, 错误: ${errors.length}`);

    return NextResponse.json({
      success: true,
      data: {
        total: articles.length,
        imported,
        skipped,
        errors: errors.length > 0 ? errors : undefined,
        fileName: file.name,
        fileSize: file.size,
        options,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('Excel导入API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Excel导入失败',
          details: error instanceof Error ? error.message : '未知错误',
        },
      },
      { status: 500 }
    );
  }
}

// GET: 获取导入模板
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // template 或 example

    if (type === 'template') {
      // 返回Excel模板下载链接
      return NextResponse.json({
        success: true,
        data: {
          templateUrl: '/templates/article-import-template.xlsx',
          templateDescription: '微信公众号文章批量导入模板',
          columns: [
            { name: 'title', label: '文章标题', required: true, example: '如何提升内容质量' },
            { name: 'content', label: '文章内容', required: true, example: '详细的文章内容...' },
            { name: 'author', label: '作者', required: false, example: '张三' },
            { name: 'tags', label: '标签', required: false, example: '标签1,标签2' },
            { name: 'status', label: '状态', required: false, example: 'draft', options: ['draft', 'published'] },
          ],
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: headers().get('x-request-id') || 'unknown',
          version: '1.0.0',
        },
      });
    }

    if (type === 'example') {
      // 返回示例数据
      return NextResponse.json({
        success: true,
        data: {
          examples: [
            {
              title: 'Excel导入示例数据',
              content: '这是一篇示例文章内容，展示了从Excel导入的基本格式。',
              author: '示例用户',
              tags: ['示例', 'Excel导入'],
              status: 'draft',
            },
          ],
          downloadUrl: '/examples/article-import-example.csv',
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestId: headers().get('x-request-id') || 'unknown',
          version: '1.0.0',
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Excel导入API就绪',
        supportedFormats: ['.xlsx', '.xls', '.csv'],
        maxSize: '10MB',
        maxRows: 1000,
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: headers().get('x-request-id') || 'unknown',
        version: '1.0.0',
      },
    });
  } catch (error) {
    console.error('Excel导入API错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: '获取导入信息失败',
        },
      },
      { status: 500 }
    );
  }
}