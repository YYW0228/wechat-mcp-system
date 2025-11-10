/**
 * 微信公众号管理系统 - 完整业务类型定义
 * WeChat Public Account Management System - Complete Business Types
 */

// 素材状态枚举
export type MaterialStatus = 'draft' | 'processing' | 'completed' | 'published';
export type SourceType = 'link' | 'manual' | 'excel';
export type Priority = 'low' | 'medium' | 'high';
export type Platform = 'wechat' | 'weibo' | 'xiaohongshu' | 'douyin';

// 素材接口
export interface Material {
  id: string;
  title: string;
  content?: string;
  sourceType: SourceType;
  originalUrl?: string;
  sourceFile?: string;
  status: MaterialStatus;
  rewrittenContent: RewrittenWork[];
  publishedCount: number;
  createTime: Date;
  updateTime: Date;
  tags: string[];
  priority: Priority;
  metadata: {
    wordCount?: number;
    readingTime?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    targetAudience?: string[];
  };
}

// 改写作品接口
export interface RewrittenWork {
  id: string;
  materialId: string;
  title: string;
  content: string;
  platform: Platform;
  status: 'draft' | 'published';
  publishTime?: Date;
  metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    engagement: number;
  };
  seoScore?: number;
  aiOptimized: boolean;
}

// 搜索和筛选接口
export interface SearchFilters {
  search: string;
  type: SourceType | 'all';
  status: MaterialStatus | 'all';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  countRange: {
    min: number;
    max: number;
  };
  tags: string[];
  priority: Priority | 'all';
}

// 分页接口
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// 用户系统接口
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  credits: number;
  level: 'free' | 'premium' | 'enterprise';
  subscription: {
    plan: string;
    expiresAt: Date;
    features: string[];
  };
  settings: {
    aiModel: string;
    language: string;
    timezone: string;
  };
}

// AI改写选项
export interface RewriteOptions {
  strategies: RewriteStrategy[];
  targetPlatform: Platform;
  tone: 'professional' | 'casual' | 'friendly' | 'formal';
  length: 'shorter' | 'same' | 'longer';
  includeSEO: boolean;
  maxVersions: number;
}

// 改写策略
export interface RewriteStrategy {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  settings: Record<string, any>;
}

// 发布配置
export interface PublishConfig {
  platforms: Platform[];
  scheduleTime?: Date;
  hashtags: string[];
  mentions: string[];
  location?: string;
  targetAudience: string[];
}

// 统计数据接口
export interface Statistics {
  totalMaterials: number;
  publishedWorks: number;
  totalViews: number;
  totalEngagement: number;
  averageEngagement: number;
  topPerforming: RewrittenWork[];
  recentActivity: Activity[];
  growthMetrics: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}

// 活动记录
export interface Activity {
  id: string;
  type: 'created' | 'rewritten' | 'published' | 'updated';
  description: string;
  timestamp: Date;
  relatedId: string;
}

// 导航菜单项
export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  badge?: number;
  children?: NavigationItem[];
}

// 表格列定义
export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

// 批量操作
export interface BatchOperation {
  type: 'delete' | 'publish' | 'rewrite' | 'export';
  selectedIds: string[];
  options?: Record<string, any>;
}

// 导出选项
export interface ExportOptions {
  format: 'excel' | 'csv' | 'json';
  fields: string[];
  filters: SearchFilters;
  includeMetrics: boolean;
}