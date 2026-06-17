'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

/**
 * next/image 的容错封装（自 legacy 融合而来）。
 *
 * 当图片加载失败时（资源缺失 / 图床不可达 / 优化失败），浏览器默认显示破图图标。
 * 这里改为渲染一个占据相同空间的优雅占位（品牌渐变 + 图片图标），与“优雅降级”
 * 理念一致。纯客户端处理（onError），不影响 SSR。
 */
export default function SafeImage({ className, fill, alt, width, height, ...rest }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span
        role="img"
        aria-label={typeof alt === 'string' && alt ? alt : undefined}
        className={[
          className ?? '',
          fill ? 'absolute inset-0 h-full w-full' : '',
          'inline-flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 text-blue-300',
        ]
          .filter(Boolean)
          .join(' ')}
        style={!fill && width && height ? { width: Number(width), height: Number(height) } : undefined}
      >
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m3 16.5 5-4.5 4 3.5 3-2.5 6 5" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      {...rest}
      width={width}
      height={height}
      fill={fill}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
