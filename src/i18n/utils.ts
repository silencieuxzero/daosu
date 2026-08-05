// ============================================================
// i18n 工具：语言识别、路径转换、文章 id 解析
// ============================================================
import { ui, defaultLang, languages, type Lang } from './ui';

export { languages, defaultLang };
export type { Lang };

/** 从 URL 路径中解析语言（en/it → 语言，其余 → 默认 zh） */
export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as Lang;
	return defaultLang;
}

/** 当前路径转换到目标语言（同路径换前缀） */
export function localizedPath(path: string, to: Lang): string {
	const rest = path.replace(/^\/(en|it)(?=\/|$)/, '');
	const clean = rest === '' ? '/' : rest;
	if (to === defaultLang) return clean;
	return `/${to}${clean === '/' ? '' : clean}`;
}

/** 文章 id 解析：zh 文章 id 无前缀，en/it 文章 id 带语言目录前缀 */
export function parsePostId(id: string): { lang: Lang; slug: string } {
	const parts = id.split('/');
	if (parts.length === 2 && (parts[0] === 'en' || parts[0] === 'it')) {
		return { lang: parts[0], slug: parts[1] };
	}
	return { lang: defaultLang, slug: id };
}

/** 日期格式化：2026.08.03（zh）/ Aug 3, 2026（en）/ 3 ago 2026（it） */
export function formatDate(d: Date, lang: Lang): string {
	if (lang === 'en') {
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}
	if (lang === 'it') {
		return d.toLocaleDateString('it-IT', { year: 'numeric', month: 'short', day: 'numeric' });
	}
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}.${m}.${day}`;
}
