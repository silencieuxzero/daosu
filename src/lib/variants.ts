// ============================================================
// 主题内容变体工具：同一实体在现代/古代主题下各有一套内容
//
// 命名约定（ancient/ 子目录配对）：
//   xxx.md        → 现代版（默认，theme = modern）
//   ancient/xxx.md → 古代版（theme = ancient）
//
// 配对键 = 去掉 ancient/ 段后的 id。
// 只有现代版时，两个主题自动回退共用现代版（ancient 缺省）。
//
// 注意：不能用 .ancient 后缀——Astro glob loader 会用 githubSlug
// 生成 id，点号会被移除（chawelier.ancient → chawelierancient），
// 所以变体标识必须使用目录段。
// ============================================================

export type ContentTheme = 'modern' | 'ancient';
export const ANCIENT_SEGMENT = 'ancient';

/** 从内容 id 推断主题变体（ancient/ 或 xxx/ancient/ 段） */
export function themeOf(id: string): ContentTheme {
	return id.startsWith(`${ANCIENT_SEGMENT}/`) || id.includes(`/${ANCIENT_SEGMENT}/`)
		? 'ancient'
		: 'modern';
}

/** 配对键：去掉 ancient/ 段 */
export function pairKeyOf(id: string): string {
	return id
		.replace(new RegExp(`/${ANCIENT_SEGMENT}/`), '/')
		.replace(new RegExp(`^${ANCIENT_SEGMENT}/`), '');
}

export interface ThemePair<T> {
	key: string;
	modern?: T;
	ancient?: T;
}

/**
 * 集合条目按主题配对，返回去重后的配对列表。
 * 排序：modern 的 order 优先，缺省用 ancient 的 order。
 */
export function pairEntries<
	T extends { id: string; data: { order?: number; date?: Date } }
>(entries: T[]): ThemePair<T>[] {
	const map = new Map<string, ThemePair<T>>();
	for (const entry of entries) {
		const key = pairKeyOf(entry.id);
		const pair = map.get(key) ?? { key };
		if (themeOf(entry.id) === 'ancient') {
			pair.ancient = entry;
		} else {
			pair.modern = entry;
		}
		map.set(key, pair);
	}
	return [...map.values()].sort((a, b) => {
		const oa = a.modern?.data.order ?? a.ancient?.data.order ?? 99;
		const ob = b.modern?.data.order ?? b.ancient?.data.order ?? 99;
		return oa - ob;
	});
}

/** 类型谓词：过滤 undefined/null 后收窄类型（替代 .filter(Boolean)） */
export function isDefined<T>(x: T | null | undefined): x is T {
	return x != null;
}

/** 取配对中指定主题的条目；该主题缺省时回退另一主题 */
export function entryFor<T>(pair: ThemePair<T>, theme: ContentTheme): T | undefined {
	return theme === 'ancient' ? pair.ancient ?? pair.modern : pair.modern ?? pair.ancient;
}

/** 按日期降序排序（博客归档用）：modern 日期优先，缺省用 ancient */
export function pairEntriesByDate<
	T extends { id: string; data: { order?: number; date?: Date } }
>(entries: T[]): ThemePair<T>[] {
	return pairEntries(entries).sort((a, b) => {
		const da = a.modern?.data.date ?? a.ancient?.data.date ?? new Date(0);
		const db = b.modern?.data.date ?? b.ancient?.data.date ?? new Date(0);
		return db.valueOf() - da.valueOf();
	});
}
