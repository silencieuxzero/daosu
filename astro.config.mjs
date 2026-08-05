// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

// 从根目录 config.toml 读取 i18n 配置（轻量解析，仅提取 [i18n] 段）
const toml = readFileSync(new URL('./config.toml', import.meta.url), 'utf-8');
const i18nRaw = toml.split('[i18n]')[1] ?? '';
const defaultLocale = i18nRaw.match(/default_locale\s*=\s*"([^"]+)"/)?.[1] ?? 'zh';
const locales =
	i18nRaw
		.match(/locales\s*=\s*\[(.*?)\]/s)?.[1]
		.matchAll(/"([^"]+)"/g)
		.map((m) => m[1])
		.toArray() ?? ['zh'];

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale,
		locales,
		// defaultLocale（zh）无前缀：/ 、/about、/blog/xxx
		// 其他语言带前缀：/en/、/it/、/en/about …
	},
});
