// ============================================================
// 站点配置加载器：读取根目录 config.toml，缺失键回退默认值
// 注：rolldown 不支持 .toml import，故用 fs 读取 + 轻量解析
// ============================================================
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** 轻量 TOML 解析：注释、[section] / [a.b] 嵌套表、[[array.table]] 数组表、字符串/布尔/数字/数组 */
function parseToml(src: string): any {
	const root: any = {};
	let current: any = root;

	for (const raw of src.split(/\r?\n/)) {
		const line = raw.trim();
		if (!line || line.startsWith('#')) continue;

		// [[a.b.c]] 数组表：创建/追加数组元素
		const arrSec = line.match(/^\[\[([^\]]+)\]\]/);
		if (arrSec) {
			const parts = arrSec[1].split('.');
			let parent: any = root;
			for (const p of parts.slice(0, -1)) {
				if (!parent[p] || typeof parent[p] !== 'object') parent[p] = {};
				parent = parent[p];
			}
			const key = parts[parts.length - 1];
			if (!Array.isArray(parent[key])) parent[key] = [];
			const obj: any = {};
			parent[key].push(obj);
			current = obj;
			continue;
		}

		// [section] / [a.b] 嵌套表
		const sec = line.match(/^\[([^\]]+)\]/);
		if (sec) {
			current = root;
			for (const p of sec[1].split('.')) {
				if (!current[p] || typeof current[p] !== 'object') current[p] = {};
				current = current[p];
			}
			continue;
		}

		const kv = line.match(/^([A-Za-z0-9_-]+)\s*=\s*(.+)$/);
		if (!kv) continue;
		current[kv[1]] = parseValue(kv[2]);
	}
	return root;
}

function parseValue(raw: string): any {
	const v = raw.trim();
	if (v.length >= 2 && (v.startsWith('"') || v.startsWith("'")) && v.endsWith(v[0])) {
		return v.slice(1, -1);
	}
	if (v === 'true') return true;
	if (v === 'false') return false;
	if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
	if (v.startsWith('[') && v.endsWith(']')) {
		return v
			.slice(1, -1)
			.split(',')
			.map((s) => parseValue(s.trim()))
			.filter((x) => x !== '');
	}
	return v;
}

const raw: any = parseToml(readFileSync(join(process.cwd(), 'config.toml'), 'utf-8'));

export interface SiteConfig {
	site: {
		name: string;
		title: Record<string, string>;
		tagline: Record<string, string>;
	};
	profile: {
		author: string;
		email: string;
		github: string;
	};
	nav: {
		items: { key?: string; label?: string; href: string }[];
	};
	social: {
		links: { label: string; href: string; icon?: string }[];
	};
	music: {
		songs: { title?: string; url?: string; bvid?: string }[];
	};
	gallery: {
		images: { src: string; alt?: string }[];
	};
	theme: {
		default: string;
		accent: string;
		ancient_accent: string;
		enable_textures: boolean;
	};
}

export const config: SiteConfig = {
	site: {
		name: raw.site?.name ?? 'DAOSU',
		title: raw.site?.title ?? {},
		tagline: raw.site?.tagline ?? {},
	},
	profile: {
		author: raw.profile?.author ?? 'DAOSU',
		email: raw.profile?.email ?? '',
		github: raw.profile?.github ?? '',
	},
	theme: {
		default: raw.theme?.default === 'ancient' ? 'ancient' : 'modern',
		accent: raw.theme?.accent ?? '#0000e0',
		ancient_accent: raw.theme?.ancient_accent ?? '#ffffff',
		enable_textures: raw.theme?.enable_textures ?? true,
	},
	nav: {
		items: Array.isArray(raw.nav?.items)
			? raw.nav.items
					.filter((i: any) => i && typeof i.href === 'string')
					.map((i: any) => ({ key: i.key, label: i.label, href: i.href }))
			: [],
	},
	social: {
		links: Array.isArray(raw.social?.links)
			? raw.social.links
					.filter((l: any) => l && typeof l.href === 'string')
					.map((l: any) => ({ label: l.label ?? l.href, href: l.href, icon: typeof l.icon === 'string' ? l.icon : undefined }))
			: [],
	},
	music: {
		songs: Array.isArray(raw.music?.songs)
			? raw.music.songs
					.filter((x: any) => x && (typeof x.url === 'string' || typeof x.bvid === 'string'))
					.map((x: any) => ({
						title: typeof x.title === 'string' ? x.title : undefined,
						url: typeof x.url === 'string' ? x.url : undefined,
						bvid: typeof x.bvid === 'string' ? x.bvid : undefined,
					}))
			: [],
	},
	gallery: {
		images: Array.isArray(raw.gallery?.images)
			? raw.gallery.images
					.filter((x: any) => x && typeof x.src === 'string')
					.map((x: any) => ({
						src: x.src,
						alt: typeof x.alt === 'string' ? x.alt : undefined,
					}))
			: [],
	},
};

/** 按语言取站点标题/副标题（缺省回退空串，由调用方回退翻译字典） */
export function siteText(locale: string, key: 'title' | 'tagline'): string {
	return config.site[key][locale] ?? '';
}
