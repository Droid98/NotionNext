// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/article/how-to-config-notion-next#c4768010ae7d44609b744e79e2f9959a

const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ||
    '02ab3b8678004aa69e9e415905ef32a5,en:7c1d570661754c8fbc568e00a01fd70e',
  THEME: process.env.NEXT_PUBLIC_THEME || 'plog', // 当前主题，在themes文件夹下可找到所有支持的主题；主题名称就是文件夹名，例如 example,fukasawa,gitbook,heo,hexo,landing,matery,medium,next,nobelium,plog,simple
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2017, // e.g if leave this empty, current year will be used.

  PSEUDO_TITLE: process.env.NEXT_PUBLIC_PSEUDO_TITLE || 'MK写真馆', // 显示在网页标签的标题
  META_KEYWORDS: process.env.NEXT_PUBLIC_META_KEYWORDS || 'MK写真馆, 旅拍, 摄影, 个人写真', // 网站关键词
  // 页脚展示的版权
  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || 'MK写真馆', // e.g 'Justin Mason'
  EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'tangly1024@gmail.com', // 邮箱
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://www.notion.so/mk-photo', // 链接
  BIO: process.env.NEXT_PUBLIC_BIO || 'A developer that loves reading, traveling and cooking', // 个人简介
  DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION || 'A website built with Next.js and Notion API', // 网站描述

  // 社交媒体链接，留空将不显示；所有图标皆可在这里找到 https://fontawesome.com/icons?d=gallery&s=brands&m=free
  SOCIAL_LINK: process.env.NEXT_PUBLIC_SOCIAL_LINK || 'https://github.com/tangly1024/NotionNext',
  SOCIAL_WEIBO: process.env.NEXT_PUBLIC_SOCIAL_WEIBO || '',
  SOCIAL_X: process.env.NEXT_PUBLIC_SOCIAL_X || '',
  SOCIAL_MASTODON: process.env.NEXT_PUBLIC_SOCIAL_MASTODON || '',
  SOCIAL_DOUBAN: process.env.NEXT_PUBLIC_SOCIAL_DOUBAN || '',
  SOCIAL_LINKEDIN: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
  SOCIAL_TWITCH: process.env.NEXT_PUBLIC_SOCIAL_TWITCH || '',
  SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || 'https://www.instagram.com/notion.next.js',
  SOCIAL_QUORA: process.env.NEXT_PUBLIC_SOCIAL_QUORA || '',
  SOCIAL_YOUTUBE: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || '',
  SOCIAL_BILIBILI: process.env.NEXT_PUBLIC_SOCIAL_BILIBILI || 'https://space.bilibili.com/12971253',
  SOCIAL_REDDIT: process.env.NEXT_PUBLIC_SOCIAL_REDDIT || '',
  SOCIAL_RSS: process.env.NEXT_PUBLIC_SOCIAL_RSS || '/feed/rss.xml',
  SOCIAL_ZHIHU: process.env.NEXT_PUBLIC_SOCIAL_ZHIHU || '',
  SOCIAL_TELEGRAM: process.env.NEXT_PUBLIC_SOCIAL_TELEGRAM || '',
  SOCIAL_EMAIL: process.env.NEXT_PUBLIC_SOCIAL_EMAIL || 'droid1998a@gmail.com',
  SOCIAL_TIKTOK: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || '',
  SOCIAL_PINTEREST: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST || '',
  SOCIAL_STACK_OVERFLOW: process.env.NEXT_PUBLIC_SOCIAL_STACK_OVERFLOW || '',
  SOCIAL_WECHAT: process.env.NEXT_PUBLIC_SOCIAL_WECHAT || '',
  SOCIAL_TWITTER: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '',
  SOCIAL_FACEBOOK: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || '',
  SOCIAL_JUEJIN: process.env.NEXT_PUBLIC_SOCIAL_JUEJIN || '',
  SOCIAL_XIAOHONGSHU: process.env.NEXT_PUBLIC_SOCIAL_XIAOHONGSHU || '',
  SOCIAL_QQ: process.env.NEXT_PUBLIC_SOCIAL_QQ || '',

  // 站点配置
  ...require('./conf/site.config'), // 站点
  ...require('./conf/menu.config'), // 菜单
  ...require('./conf/map.config'), // 地图
  ...require('./conf/lang.config'), // 语言
  ...require('./conf/notion.config'), // Notion 相关

  // 模板配置
  ...require('./conf/theme.config'), // 主题
  ...require('./conf/image.config'), // 网站图片相关配置
  ...require('./conf/font.config'), // 网站字体
  ...require('./conf/right-click-menu'), // 自定义右键菜单相关配置
  ...require('./conf/code.config'), // 网站代码块样式
  ...require('./conf/animation.config'), // 动效美化效果
  ...require('./conf/widget.config'), // 悬浮在网页上的挂件，聊天客服、宠物挂件、音乐播放器等
  ...require('./conf/ad.config'), // 广告营收插件
  ...require('./conf/plugin.config'), // 其他第三方插件 algolia全文索引
  ...require('./conf/performance.config'), // 性能优化配置

  // 高级用法
  ...require('./conf/layout-map.config'), // 路由与布局映射自定义，例如自定义特定路由的页面布局
  ...require('./conf/notion.config'), // 读取notion数据库相关的扩展配置，例如自定义表头
  ...require('./conf/dev.config'), // 开发、调试时需要关注的配置

  // 自定义外部脚本，外部样式
  CUSTOM_EXTERNAL_JS: [''], // e.g. ['http://xx.com/script.js','http://xx.com/script.js']
  CUSTOM_EXTERNAL_CSS: [''], // e.g. ['http://xx.com/style.css','http://xx.com/style.css']

  // 自定义菜单
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, // 支持Menu类型的菜单，替代了3.12版本前的Page类型

  // 文章列表相关设置
  POST_LIST_STYLE: process.env.NEXT_PUBLIC_POST_LIST_STYLE || 'page', // ['page', 'scroll']
  POSTS_PER_PAGE: process.env.NEXT_PUBLIC_POSTS_PER_PAGE || 12, // 每一页展示的博客文章数
}

module.exports = BLOG
