// @ts-check
import { defineConfig } from 'astro/config';
import { i18n } from './config.mjs';

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: i18n.default_locale,
		locales: i18n.locales,
		// defaultLocale（zh）无前缀：/ 、/about、/blog/xxx
		// 其他语言带前缀：/en/、/it/、/en/about …
	},
	markdown: {
		shikiConfig: {
			// css-variables：颜色由 global.css 按 data-theme 定义（--astro-code-*），
			// 使代码块随现代/古代主题切换，且避免默认 github-dark 与浅色背景冲突
			theme: 'css-variables',
		},
	},
});
