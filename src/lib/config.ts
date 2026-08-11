// ============================================================
// 站点配置加载器：读取根目录 config.mjs，缺失键回退默认值
// ============================================================
import rawModule from '../../config.mjs';

const raw: any = rawModule;

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
		groups: {
			label: string;
			locales?: string[];
			items: { label: string; href: string }[];
		}[];
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
	decor: {
		home: string;
	};
	preface: {
		title: Record<string, string>;
		text: Record<string, string>;
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
		groups: Array.isArray(raw.nav?.groups)
			? raw.nav.groups
					.filter((g: any) => g && typeof g.label === 'string' && Array.isArray(g.items))
					.map((g: any) => ({
						label: g.label,
						locales: Array.isArray(g.locales)
							? g.locales.filter((x: any) => typeof x === 'string')
							: undefined,
						items: g.items
							.filter((i: any) => i && typeof i.label === 'string' && typeof i.href === 'string')
							.map((i: any) => ({ label: i.label, href: i.href })),
					}))
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
	decor: {
		home: typeof raw.decor?.home === 'string' ? raw.decor.home : 'swiss',
	},
	preface: {
		title:
			raw.preface?.title && typeof raw.preface.title === 'object'
				? raw.preface.title
				: {},
		text:
			raw.preface?.text && typeof raw.preface.text === 'object'
				? raw.preface.text
				: {},
	},
};

/** 按语言取站点标题/副标题（缺省回退空串，由调用方回退翻译字典） */
export function siteText(locale: string, key: 'title' | 'tagline'): string {
	return config.site[key][locale] ?? '';
}
