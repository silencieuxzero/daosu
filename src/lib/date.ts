// ============================================================
// 日期格式化（固定中文格式，无国际化）
// ============================================================

/** 日期格式化：2026.08.03 */
export function formatDate(d: Date): string {
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}.${m}.${day}`;
}
