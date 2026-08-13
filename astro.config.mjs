// @ts-check
import { defineConfig } from 'astro/config';
import remarkSpoiler from './src/lib/remark-spoiler.mjs';

// https://astro.build/config
export default defineConfig({
	markdown: {
		// 黑幕语法：%%文字%% → .spoiler（悬停/点击显示）
		remarkPlugins: [remarkSpoiler],
		shikiConfig: {
			// css-variables：颜色由 global.css 按 data-theme 定义（--astro-code-*），
			// 使代码块随现代/古代主题切换，且避免默认 github-dark 与浅色背景冲突
			theme: 'css-variables',
		},
	},
});
