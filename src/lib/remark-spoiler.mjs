// ============================================================
// remark-spoiler：黑幕语法支持
// %%文字%% → <span class="spoiler">文字</span>
// 悬停/点击后显示（样式见 global.css 的 .spoiler）
// 零依赖：手写 mdast 遍历，不引入 unist-util-visit
// ============================================================

export default function remarkSpoiler() {
	return (tree) => {
		walk(tree);
	};

	function walk(node) {
		if (!node || !Array.isArray(node.children)) return;
		const next = [];
		for (const child of node.children) {
			if (child.type === 'text' && typeof child.value === 'string' && child.value.includes('%%')) {
				next.push(...splitSpoiler(child.value));
			} else {
				walk(child);
				next.push(child);
			}
		}
		node.children = next;
	}

	// 把文本按 %%...%% 拆成 text / html 交替节点（非黑幕部分保持 text，避免转义问题）
	function splitSpoiler(value) {
		const parts = [];
		const re = /%%([\s\S]+?)%%/g;
		let last = 0;
		let m;
		while ((m = re.exec(value)) !== null) {
			if (m.index > last) {
				parts.push({ type: 'text', value: value.slice(last, m.index) });
			}
			parts.push({ type: 'html', value: `<span class="spoiler">${m[1]}</span>` });
			last = re.lastIndex;
		}
		if (last < value.length) {
			parts.push({ type: 'text', value: value.slice(last) });
		}
		return parts;
	}
}
