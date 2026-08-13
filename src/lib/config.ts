// ============================================================
// 站点配置加载器：读取根目录 config.mjs，缺失键回退默认值
// ============================================================
import rawModule from '../../config.mjs';

const raw: any = rawModule;

export interface SiteConfig {
	site: {
		name: string;
		title: string;
		tagline: string;
	};
	profile: {
		author: string;
		email: string;
		github: string;
	};
	nav: {
		items: { label: string; href: string }[];
		groups: {
			label: string;
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
		modern: { src: string; alt?: string }[];
		ancient: { src: string; alt?: string }[];
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
		title: string;
		text: string;
	};
}

export const config: SiteConfig = {
	site: {
		name: raw.site?.name ?? 'DAOSU',
		title: typeof raw.site?.title === 'string' ? raw.site.title : '悼溯茶馆',
		tagline: typeof raw.site?.tagline === 'string' ? raw.site.tagline : '世界深处的一处茶馆。',
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
					.map((i: any) => ({ label: typeof i.label === 'string' ? i.label : i.href, href: i.href }))
			: [],
		groups: Array.isArray(raw.nav?.groups)
			? raw.nav.groups
					.filter((g: any) => g && typeof g.label === 'string' && Array.isArray(g.items))
					.map((g: any) => ({
						label: g.label,
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
		// 兼容旧格式：仅配置 images 时两套共用
		modern: Array.isArray(raw.gallery?.modern)
			? raw.gallery.modern
					.filter((x: any) => x && typeof x.src === 'string')
					.map((x: any) => ({ src: x.src, alt: typeof x.alt === 'string' ? x.alt : undefined }))
			: Array.isArray(raw.gallery?.images)
				? raw.gallery.images
						.filter((x: any) => x && typeof x.src === 'string')
						.map((x: any) => ({ src: x.src, alt: typeof x.alt === 'string' ? x.alt : undefined }))
				: [],
		ancient: Array.isArray(raw.gallery?.ancient)
			? raw.gallery.ancient
					.filter((x: any) => x && typeof x.src === 'string')
					.map((x: any) => ({ src: x.src, alt: typeof x.alt === 'string' ? x.alt : undefined }))
			: Array.isArray(raw.gallery?.images)
				? raw.gallery.images
						.filter((x: any) => x && typeof x.src === 'string')
						.map((x: any) => ({ src: x.src, alt: typeof x.alt === 'string' ? x.alt : undefined }))
				: [],
	},
	decor: {
		home: typeof raw.decor?.home === 'string' ? raw.decor.home : 'swiss',
	},
	preface: {
		title: typeof raw.preface?.title === 'string' ? raw.preface.title : '序',
		text: typeof raw.preface?.text === 'string' ? raw.preface.text : '',
	},
};
