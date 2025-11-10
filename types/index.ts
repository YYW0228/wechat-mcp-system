/**
 * 系统核心类型定义
 * 遵循TypeScript严格模式，确保类型安全
 */

// ==================== 基础类型 ====================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

// ==================== 业务实体 ====================

export interface User extends BaseEntity {
  email: string;
  username: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  profile: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    company?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
  };
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export interface WeChatAccount extends BaseEntity {
  name: string;
  appId: string;
  accountType: 'service' | 'subscription';
  category: string;
  description?: string;
  avatar?: string;
  qrCode?: string;
  status: AccountStatus;
  ownerId: string;
  settings: {
    autoPublish: boolean;
    publishTime: string; // HH:mm format
    tags: string[];
  };
  metrics: {
    followers: number;
    avgReadCount: number;
    engagementRate: number;
  };
}

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  VERIFICATION_PENDING = 'verification_pending',
  SUSPENDED = 'suspended',
}

export interface Content extends BaseEntity {
  title: string;
  content: string;
  summary?: string;
  type: ContentType;
  status: ContentStatus;
  accountId: string;
  authorId: string;
  publishedAt?: Date;
  scheduledAt?: Date;
  tags: string[];
  seo: {
    keywords: string[];
    description?: string;
    ogImage?: string;
  };
  metrics: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    readTime: number; // estimated reading time in minutes
  };
  aiAnalysis?: {
    qualityScore: number;
    suggestions: string[];
    optimizedContent?: string;
  };
}

export enum ContentType {
  ARTICLE = 'article',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  LINK = 'link',
}

export enum ContentStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface ContentTemplate extends BaseEntity {
  name: string;
  description?: string;
  type: ContentType;
  structure: TemplateStructure;
  variables: TemplateVariable[];
  createdBy: string;
  isPublic: boolean;
  usageCount: number;
}

export interface TemplateStructure {
  sections: {
    id: string;
    type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote';
    content: string;
    order: number;
    isRequired: boolean;
  }[];
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  label: string;
  description?: string;
  required: boolean;
  options?: string[]; // for select/multiselect types
  defaultValue?: any;
}

// ==================== MCP 服务类型 ====================

export interface MCPService {
  id: string;
  name: string;
  version: string;
  status: MCPServiceStatus;
  capabilities: string[];
  endpoint?: string;
  config: Record<string, any>;
  healthCheck: {
    lastChecked: Date;
    isHealthy: boolean;
    responseTime?: number;
    error?: string;
  };
}

export enum MCPServiceStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ERROR = 'error',
  MAINTENANCE = 'maintenance',
}

export interface MCPRequest<T = any> {
  serviceId: string;
  method: string;
  params?: T;
  timeout?: number;
}

export interface MCPResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    serviceId: string;
    method: string;
    executionTime: number;
    timestamp: Date;
  };
}

// ==================== 分析和报告类型 ====================

export interface Analytics {
  period: {
    start: Date;
    end: Date;
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  };
  accounts: {
    total: number;
    active: number;
    growth: number;
  };
  content: {
    total: number;
    published: number;
    scheduled: number;
    draft: number;
  };
  engagement: {
    totalViews: number;
    totalLikes: number;
    totalShares: number;
    totalComments: number;
    avgEngagementRate: number;
  };
  performance: {
    avgReadTime: number;
    topPerformingContent: Content[];
    worstPerformingContent: Content[];
  };
}

export interface ContentPerformance {
  contentId: string;
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    views: number;
    newViews: number;
    likes: number;
    newLikes: number;
    shares: number;
    newShares: number;
    comments: number;
    newComments: number;
  };
  trends: {
    viewsTrend: 'up' | 'down' | 'stable';
    engagementTrend: 'up' | 'down' | 'stable';
    growthRate: number;
  };
}

// ==================== 工作流和自动化类型 ====================

export interface Workflow extends BaseEntity {
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  status: WorkflowStatus;
  createdBy: string;
  executionCount: number;
  lastExecuted?: Date;
}

export interface WorkflowTrigger {
  type: 'manual' | 'schedule' | 'event' | 'webhook';
  config: Record<string, any>;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition' | 'delay' | 'mcp_service';
  order: number;
  config: Record<string, any>;
  nextStep?: string;
  conditionStep?: string;
}

export enum WorkflowStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
}

export interface WorkflowExecution extends BaseEntity {
  workflowId: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  triggeredBy: string;
  input: Record<string, any>;
  output?: Record<string, any>;
  steps: {
    stepId: string;
    status: ExecutionStatus;
    startedAt: Date;
    completedAt?: Date;
    input?: any;
    output?: any;
    error?: string;
  }[];
}

export enum ExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// ==================== UI 和用户交互类型 ====================

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  customCSS?: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: {
    content: boolean;
    analytics: boolean;
    system: boolean;
    mcp: boolean;
  };
}

export interface UserSession {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  permissions: string[];
}

export interface DashboardWidget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'list' | 'custom';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  config: Record<string, any>;
  dataSource: string;
}

export interface SearchFilters {
  query?: string;
  type?: ContentType;
  status?: ContentStatus;
  accountId?: string;
  authorId?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt' | 'title' | 'views';
  sortOrder?: 'asc' | 'desc';
}