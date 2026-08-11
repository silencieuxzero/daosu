# DAOSU · 悼溯

世界深处的一处茶馆。平面主义与先秦纹样之间的一座个人博客。

## 特性

- **双主题**：现代（黑白灰）／古代（黛蓝 · 先秦纹样），纯 CSS 变量驱动，切换无需重载
- **三语 i18n**：中文（默认，无前缀）／ English（`/en/`）／ Italiano（`/it/`）
- **内容集合**：Astro Content Layer（`glob` loader + zod schema）
- **音乐播放器**：构建时扫描 `public/music/` + B 站 bvid 构建期解析为音频直链
- **画廊**：config 驱动的几何纹样卡片 + 键盘可操作 lightbox
- **文章工具**：目录（scrollspy）、沉浸阅读模式、代码块折叠、阅读进度条、回到顶部
- **配置驱动**：站点名、导航、社交、音乐、画廊、主题色全部由根目录 `config.mjs` 控制

## 开发

```sh
npm install
npm run dev        # localhost:4321
npm run build      # 产物输出到 dist/（音乐 bvid 解析发生在构建期）
npm run preview    # 预览构建产物
npx astro check    # 类型检查
```

## 项目结构

```
config.mjs              ← 站点唯一配置源（ES Module）
astro.config.mjs        ← i18n 路由 + Shiki css-variables 主题
src/
  ├─ pages/            ← 页面（zh 无前缀，en/、it/ 带前缀）
  ├─ components/       ← 页面组件与交互组件
  ├─ layouts/          ← Layout.astro（顶栏/语言切换/页脚/全局组件）
  ├─ content/blog/     ← 博客文章（三语）
  ├─ i18n/             ← 翻译字典与工具
  ├─ lib/config.ts     ← 配置加载器（读取 config.mjs，缺失键回退默认值）
  └─ styles/global.css ← 双主题变量组 + 平面主义组件库
public/
  ├─ music/            ← 本地曲目（构建时自动扫描）
  └─ gallery/          ← 画廊图片
```

## 自定义

所有站点内容均通过根目录 `config.mjs` 配置：品牌名、导航、社交链接、音乐曲目、
画廊图片、主题默认值与强调色。修改后重新构建即可生效。

> 注：B 站音频直链在部分网络环境下可能因防盗链无法播放，可改用本地文件
> （`url = "/music/文件名"`）以获得稳定体验。
