// ============================================================
// 茶客状态取色：frontmatter 的 status 字段 → 徽章/文字颜色
// 常见状态走语义色（global.css 中按双主题定义 --status-* 变量）；
// 未知状态按文字哈希生成稳定色相（全自动，新增状态无需改代码）。
// ============================================================

// 语义色映射：值为 global.css 中定义的 CSS 变量
export const STATUS_COLORS: Record<string, string> = {
	'活跃': 'var(--status-active)',
	'不活跃': 'var(--status-undead)',
	'休眠': 'var(--status-dormant)',
	'失踪': 'var(--status-missing)',
	'已故': 'var(--status-dead)',
	'停更': 'var(--status-stopped)',
};

/** 按文字生成稳定色相（0-359），同一状态永远同色 */
export function statusHue(text: string): number {
	let h = 0;
	for (const ch of text) {
		h = (h * 31 + (ch.codePointAt(0) ?? 0)) % 360;
	}
	return h;
}

/** 状态背景色：语义色优先，未知状态哈希回退 */
export function statusBg(text: string): string {
	if (!text) return 'var(--status-unknown)';
	if (text in STATUS_COLORS) return STATUS_COLORS[text];
	return `hsl(${statusHue(text)} 42% 40%)`;
}

/** 状态徽章完整 inline style（深色底 + 白字，深浅色均清晰） */
export function statusBadgeStyle(text: string): string {
	return `background: ${statusBg(text)}; color: #fff;`;
}

/** 状态文字颜色（索引页 meta 用，仅文字色） */
export function statusTextStyle(text: string): string {
	return `color: ${statusBg(text)};`;
}
