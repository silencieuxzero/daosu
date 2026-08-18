// ============================================================
// 谜题通用工具：答案归一化（含容错）+ localStorage 进度 + 打字机
// 服务端（.astro frontmatter）与客户端 <script> 均可 import（构建时打包）
// 存储键统一命名空间：daosu.puzzle.<id>.v2（v2：跨页寻宝版，重置旧进度）
// ============================================================

/** 全角 → 半角（ASCII 区：！＂＃…Ａ-Ｚａ-ｚ０-９） */
const FULLWIDTH_RE = /[\uFF01-\uFF5E]/g;
const toHalfWidth = (s: string) =>
	s.replace(FULLWIDTH_RE, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));

/** 答案归一化：全角转半角、忽略大小写、首尾空格与连续空白 */
export function normalize(s: string): string {
	return toHalfWidth(s)
		.trim()
		.toLowerCase()
		.replace(/\u3000/g, ' ')
		.replace(/\s+/g, ' ');
}

/** 口令归一化：连空白一起去掉（口令可拆开输入，如「不忘 凉茶」） */
export function collapse(s: string): string {
	return normalize(s).replace(/\s+/g, '');
}

/** 校验答案：命中 expected 或任一别名（均已归一化比较） */
export function matches(v: string, expected: string, aliases: string[] = []): boolean {
	const n = normalize(v);
	return n !== '' && (n === normalize(expected) || aliases.some((a) => normalize(a) === n));
}

/** 进度存储键（v2：跨页寻宝版，旧 v1 进度作废） */
export function storageKey(id: string, domain = 'puzzle'): string {
	return `daosu.${domain}.${id}.v2`;
}

/** 读取已解出的序号数组（谜题链 / 寻物进度），异常时回退空数组 */
export function loadSolved(key: string): number[] {
	try {
		const raw = JSON.parse(localStorage.getItem(key) ?? '[]');
		return Array.isArray(raw) ? raw.filter((n): n is number => typeof n === 'number') : [];
	} catch {
		return [];
	}
}

/** 读取布尔标记（地下室解锁等） */
export function loadFlag(key: string): boolean {
	try {
		return localStorage.getItem(key) === '1';
	} catch {
		return false;
	}
}

/** 读取对象进度表（文字密室：objectId → 已推进步数），异常时回退空表 */
export function loadMap(key: string): Record<string, number> {
	try {
		const raw = JSON.parse(localStorage.getItem(key) ?? '{}');
		return raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, number>) : {};
	} catch {
		return {};
	}
}

/**
 * 文字冒险命令解析：输入命中对象标签或任一关键词（归一化后子串匹配），
 * 返回命中的对象下标；未命中返回 -1。多个命中时取靠前者。
 */
export function findCommand(
	v: string,
	objects: { label: string; keywords: string[] }[]
): number {
	const n = normalize(v);
	if (!n) return -1;
	for (let i = 0; i < objects.length; i++) {
		const o = objects[i];
		if (n === normalize(o.label)) return i;
		if (o.keywords.some((k) => k && n.includes(k))) return i;
	}
	return -1;
}

/**
 * 打字机：把 text 逐字写入 el，返回"立即完成"函数（点击跳过用）
 */
export function typewrite(el: HTMLElement, text: string, speed = 26): () => void {
	let i = 0;
	let timer = 0;
	const tick = () => {
		i += 1;
		el.textContent = text.slice(0, i);
		if (i < text.length) timer = window.setTimeout(tick, speed);
	};
	tick();
	return () => {
		window.clearTimeout(timer);
		el.textContent = text;
	};
}
