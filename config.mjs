// ============================================================
// DAOSU · 站点配置文件
// 修改后重新构建生效：npm run build
// ============================================================

// ---------- 站点 ----------
// 站点名（顶栏品牌、Footer 版权行、标签页标题）
export const site = {
	name: '悼溯',
	// 首页大标题（站点内容：固定中文，不随语言切换）
	title: { zh: '悼溯茶馆' },
	// 首页副标题（站点内容：固定中文，不随语言切换）
	tagline: { zh: '世界深处的一处茶馆。' },
};

// ---------- 导航 ----------
// 顶栏导航链接。两种标签方式：
//   key   —— i18n 字典键（三语标签自动适配，如 "nav.home"）
//   label —— 直接写死的标签（可选，优先于 key）
// href 为站内路径（自动加当前语言前缀），也可以放外部链接（https://...）
export const nav = {
	items: [
		{ key: 'nav.home', href: '/' },
		{ key: 'nav.archive', href: '/archive' },
		{ key: 'nav.about', href: '/about' },
	],
	// 顶栏下拉组：
	//   label  —— 按钮显示文字
	//   locales —— 限定显示的语言（缺省 = 全部语言显示）
	//   items  —— 下拉链接（label 直接显示，href 站内路径自动加语言前缀）
	groups: [
		{
			label: '茶馆',
			locales: ['zh'],
			items: [
				{ label: '茶客设定', href: '/guests' },
				{ label: '茶馆故事', href: '/stories' },
				{ label: '多媒体库', href: '/media' },
			],
		},
	],
};

// ---------- 社交链接 ----------
// 顶栏社交下拉菜单；label 为显示文字，href 为链接地址（外部链接新窗口打开）
// icon 可选，指定图标：bilibili / github / email / rss / x / telegram / youtube / link
// 不填 icon 时按 href 自动识别（bilibili.com / github.com / mailto:），识别不到用通用链接图标
export const social = {
	links: [
//		{ label: 'GitHub', href: 'https://github.com/yourname', icon: 'github' },
//		{ label: 'Email', href: 'mailto:you@example.com', icon: 'email' },
		{ label: 'Bilibili', href: 'https://space.bilibili.com/3707029029914854', icon: 'bilibili' },
	],
};

// ---------- 作者 ----------
// 作者名（文章页作者信息栏显示）；关于页的联系方式
export const profile = {
	author: '花束',
	email: 'you@example.com',
	github: 'github.com/yourname',
};

// ---------- 主题 ----------
// 默认主题：modern（黑白灰）/ ancient（黛蓝 · 低饱和深蓝）
// 代表色 · 现代主题强调色（#3f63c0：比纯蓝浅一档、降饱和，与黑白灰更协调）
// 古代主题强调色（黛蓝底上的点缀）
// 古代主题纹理开关（回纹底纹 / 铭文水印 / 回纹条带 / 兽面纹）
export const theme = {
	default: 'modern',
	accent: '#3f63c0',
	ancient_accent: '#8aaacf',
	enable_textures: true,
};

// ---------- 音乐播放器 ----------
// 曲目来源一：public/music/ 目录（自动扫描，构建时生效）
// 曲目来源二：外部歌曲（url = 直链；bvid = B 站视频，构建时解析为音频流）
export const music = {
	songs: [
		{ title: '默然 · UNDERFATE', bvid: 'BV1dafiBVEWF' },

		// ただ声一つ：网易云外链已失效、API 直链 20 分钟过期，故用 B 站官方 MV 音频流
		{ title: 'ただ声一つ · ロクデナシ', bvid: 'BV1VF41147Rx' },

		// ---------- 来自 luoshulv 歌单（本地文件） ----------
		{
			title: '说谎的马卡龙 - 风巡妄想',
			url: '/music/《说谎的马卡龙》中文填词，但是伴奏重制🧊🧊🧊【重音テト】-风巡妄想 [VBR 高质量].mp3',
		},
		{
			title: '不可淹没的三峡游记 - 山城Mors',
			url: '/music/【不可淹没的三峡游记】“请按下快门，在她被消失以前”-山城Mors.mp3',
		},
		{
			title: '反乌托邦·拼接版 - Ciyo / 见过夏天P / 乌托邦P',
			url: '/music/Ciyo-拼接乌托邦 (反乌托邦拼接版).m4a',
		},
		{
			title: 'サイエンス(科学) - MIMI feat. 重音テトSV',
			url: '/music/【本家投稿】サイエンス(科学) _ MIMI feat. 重音テトSV【Official Video】-MIMI_music.mp3',
		},
		{
			title: 'ハナタバ - MIMI feat. 可不',
			url: '/music/【本家投稿】ハナタバ _ MIMI feat. 可不 【official video】-MIMI_music.mp3',
		},
		{
			title: 'ミュージック(音乐) - MIMI feat. 可不',
			url: '/music/【本家投稿】ミュージック (音乐) _ MIMI feat. 可不-MIMI_music.mp3',
		},
		{
			title: '少年幻想总是诗 - Utopia_乌托邦P',
			url: '/music/【星尘原创】少年幻想总是诗  “一直被困在夏天自从你离开之后，直到发现我所拥有的自由”【新世代音乐人】-Utopia_乌托邦P.mp3',
		},
	],
};

// ---------- 画廊 ----------
// 图片列表：src 为 public 下的路径或外部 URL；alt 为说明文字
// 主题分套：modern（现代主题显示）与 ancient（古代主题显示）各一套图集
export const gallery = {
	// 现代主题图集
	modern: [
		{ src: '/gallery/01-rect.svg', alt: '回纹 · 现代几何' },
		{ src: '/gallery/02-grid.svg', alt: '瑞士网格' },
		{ src: '/gallery/03-bronze.svg', alt: '青铜纹样' },
		{ src: '/gallery/04-bars.svg', alt: '垂直条带' },
		{ src: '/gallery/05-target.svg', alt: '同心圆' },
		{ src: '/gallery/06-diagonal.svg', alt: '斜线构成' },
	],
	// 古代主题图集
	ancient: [
		{ src: '/gallery/07-meander.svg', alt: '回纹连缀' },
		{ src: '/gallery/08-thunder.svg', alt: '云雷纹' },
		{ src: '/gallery/09-taotie.svg', alt: '兽面纹' },
		{ src: '/gallery/10-rings.svg', alt: '重环纹' },
		{ src: '/gallery/11-quchi.svg', alt: '窃曲纹' },
		{ src: '/gallery/12-lattice.svg', alt: '菱形格纹' },
	],
};

// ---------- 首页几何装饰 ----------
// 站点头部右侧的几何图形组合（平面主义装饰语言）
// 可选值：
//   swiss   方块 + 圆环 + 横条（默认）
//   rings   同心圆 + 实心点
//   cross   十字 + 方块
//   minimal 单个小方块
//   off     关闭装饰
export const decor = {
	home: 'swiss',
};

// ---------- 前言（首页介绍语板块） ----------
// 标题与正文：三语可选（缺省语言回退内置翻译字典）；
// 修改后重新构建生效。
export const preface = {
	title: { zh: '序', en: 'Preface', it: 'Prefazione' },
	text: {
		zh: `茶馆······茶馆？

外观是坐落于街角的名为“悼湖茶馆”的古风茶馆，内部装饰很朴素，木桌椅被打理得很干净。摇椅静静的待在窗边的位置，柜子上摆放着各种茶罐与茶包等。桌上放着白瓷茶具。

名为“琈予”的“投影”长居在此，照料着茶馆。

后院环境优美，各种花卉与植物攀附在墙园上，被打理干净的鱼缸被放在离前门最近的地方，一旁的水车源源不断的流淌着水流，下方是某位茶客所饲养的各种观赏鱼……石桌椅安静的待在水池旁；后院的老槐树上总是会有小动物待着，木柴被堆放在角落。

茶馆有时安静，有时热闹。但琈予总是在那。`,
		en: 'This teahouse hides deep in the world. Between flat design and Pre-Qin ornament, between modern and ancient, lie some words, notes and records. The tea is ready — come in and sit down.',
		it: "Questa casa da tè si nasconde nel profondo del mondo. Tra design piatto e ornamenti pre-Qin, tra moderno e antico, giacciono parole, appunti e racconti. Il tè è pronto: entra e siediti.",
	},
};

// ---------- 国际化 ----------
// 默认语言与语言列表由 astro.config.mjs 读取（构建期配置）
export const i18n = {
	default_locale: 'zh',
	locales: ['zh', 'en', 'it'],
};

// 聚合导出（供 src/lib/config.ts 读取）
export default {
	site,
	nav,
	social,
	profile,
	theme,
	music,
	gallery,
	decor,
	preface,
};
