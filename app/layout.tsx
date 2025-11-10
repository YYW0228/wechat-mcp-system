import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "公众号矩阵管理系统 - MCP驱动的内容创作平台",
  description: "基于多个MCP服务的智能微信公众号内容生成和管理系统，集成Chrome DevTools、ZAI Vision、Prompt House、Context7等服务",
  keywords: ["MCP", "AI内容生成", "微信公众号", "性能分析", "设计优化", "Chrome DevTools", "ZAI", "Prompt House", "Context7"],
  authors: [{ name: "Claude Code MCP Integration Team" }],
  openGraph: {
    title: "公众号矩阵管理系统",
    description: "AI驱动的微信公众号内容创作平台",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "公众号矩阵管理系统",
    description: "基于MCP服务的AI内容创作平台",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>

        {/* MCP Service Status Indicator */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">MCP服务在线</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics Overlay */}
        <div id="performance-overlay" className="hidden fixed top-4 left-4 z-50">
          <div className="bg-black/80 text-white p-3 rounded-lg text-sm font-mono">
            <div>LCP: <span id="lcp-metric">--</span>ms</div>
            <div>FCP: <span id="fcp-metric">--</span>ms</div>
            <div>CLS: <span id="cls-metric">--</span></div>
          </div>
        </div>
      </body>
    </html>
  );
}