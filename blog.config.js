// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/article/how-to-config-notion-next#c4768010ae7d44609b744e79e2f9959a

const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ||
    '02ab3b8678004aa69e9e415905ef32a5,en:7c1d570661754c8fbc568e00a01fd70e',
  THEME: process.env.NEXT_PUBLIC_THEME || 'plog', // 当前主题，在themes文件夹下可找到所有支持的主题；主题名称就是文件夹名，例如 example,fukasawa,gitbook,heo,hexo,landing,matery,medium,next,nobelium,plog,simple
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN', // e.g 'zh-CN','en-US'  see /lib/lang.js for more.
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2021, // e.g if leave this empty, current year will be used.

  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || false, // 伪静态路径，背景是notion API每次重新部署后url的id都会变化，通过伪静态可以在浏览器中显示静态路径，有利于SEO；同时也可以配合CDN进行缓存
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'light', // ['light', 'dark', 'auto'], // light 日间; dark 夜间; auto 根据系统设置
  FONT: process.env.NEXT_PUBLIC_FONT || 'font-sans', // ['font-sans', 'font-serif', 'font-mono'], // 字体； font-serif:衬线字体(宋体); font-sans:无衬线字体(黑体); font-mono:等宽字体
  FONT_AWESOME_PATH:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css', // font-awesome 字体图标引入，可以自己换成国内CDN
  FONT_URL: [''], // 外部字体
  FONT_STYLE: [], // font style
  FONT_DISPLAY: 'swap', // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  LIGHT_BG: '#F2F2F2', // 浅色模式，页面背景颜色
  DARK_BG: '#181818', // 深色模式，页面背景颜色

  // Notion相关
  NOTION_HOST: process.env.NEXT_PUBLIC_NOTION_HOST || 'https://www.notion.so',
  NOTION_API_QUERY_SINGLE_PAGE:
    'https://www.notion.so/api/v3/getPublicPageData', // 废弃 推荐使用 getSignedFileUrls
  NOTION_API_GET_SIGNED_FILE_URL:
    'https://www.notion.so/api/v3/getSignedFileUrls',
  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || '', // Useful if you prefer not to make your site public
  NOTION_ACTIVE_USER: process.env.NOTION_ACTIVE_USER || 'a9a83457-3f33-4355-9488-84226a27e02e', // 用不到
  NOTION_TOKEN_V2: process.env.NOTION_TOKEN_V2 || 'a68892f33e75e9273c5288593a203f160ef526553835f8e5627a85d2634e402ac37b01d37449a03b6028d0b2b8c991e0892095cf0d05c2a41d044f5dd30c33a9484df39c1b7484433292416f06a0',

  // 悬浮挂件
  WIDGET_PET: process.env.NEXT_PUBLIC_WIDGET_PET || false, // 是否显示宠物挂件
  WIDGET_PET_LINK:
    'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json', // 宠物挂件地址
  WIDGET_TO_TOP: process.env.NEXT_PUBLIC_WIDGET_TO_TOP || true, // 是否显示回顶
  WIDGET_DARK_MODE: process.env.NEXT_PUBLIC_WIDGET_DARK_MODE || true, // 是否显示深色模式切换

  // 评论
  COMMENT_WEBMENTION: process.env.NEXT_PUBLIC_COMMENT_WEBMENTION || false,
  COMMENT_WEBMENTION_USERNAME: 'tangly1024.com',
  COMMENT_WEBMENTION_AUTH: process.env.COMMENT_WEBMENTION_AUTH || '',
  COMMENT_WEBMENTION_HOST: 'webmention.io',

  COMMENT_ARTALK_LINK: process.env.NEXT_PUBLIC_COMMENT_ARTALK_LINK || '',
  COMMENT_ARTALK_JS:
    process.env.NEXT_PUBLIC_COMMENT_ARTALK_JS ||
    'https://cdn.jsdelivr.net/npm/artalk@2.0.2/dist/Artalk.js',

  // SEO
  SEO_TITLE: process.env.NEXT_PUBLIC_SEO_TITLE || 'NotionNext',
  SEO_DESCRIPTION:
    process.env.NEXT_PUBLIC_SEO_DESCRIPTION ||
    '一个由nextjs和notionapi搭建的静态博客',
  SEO_KEYWORDS:
    process.env.NEXT_PUBLIC_SEO_KEYWORDS ||
    'Notion, Next.js, SEO, notion-api, tangly1024',
  SEO_HOME_IMAGE: process.env.NEXT_PUBLIC_SEO_HOME_IMAGE || null, // 首页SEO图片
  SEO_URL: process.env.NEXT_PUBLIC_SEO_URL || 'https://blog.tangly1024.com',
  SEO_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION || null, // 用以谷歌站点验证，值是code
  SEO_BAIDU_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_BAIDU_SITE_VERIFICATION || null, // 百度站点验证
  SEO_NAVER_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_NAVER_SITE_VERIFICATION || null, // NAVER 站点验证
  SEO_YAHOO_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_SEO_YAHOO_SITE_VERIFICATION || null, // Yahoo 站点验证

  // RSS
  RSS_FEED_ENABLED: process.env.NEXT_PUBLIC_RSS_FEED_ENABLED || true, // 是否开启RSS订阅
  RSS_FEED_TTL: 24 * 60, // RSS 订阅的更新频率
  RSS_LINK: 'https://blog.tangly1024.com/feed/rss.xml',

  // 访问统计
  ANALYTICS_BUSUANZI_ENABLE:
    process.env.NEXT_PUBLIC_ANALYTICS_BUSUANZI_ENABLE || true, // 是否开启文章阅读量统计

  // 社交信息
  CONTACT_EMAIL:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'tangly1024@gmail.com', // 站点站长联系邮箱
  CONTACT_WEIBO: process.env.NEXT_PUBLIC_CONTACT_WEIBO || '',
  CONTACT_BILIBILI: process.env.NEXT_PUBLIC_CONTACT_BILIBILI || '',
  CONTACT_YOUTUBE: process.env.NEXT_PUBLIC_CONTACT_YOUTUBE || '',
  CONTACT_TWITTER: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',
  CONTACT_FACEBOOK: process.env.NEXT_PUBLIC_CONTACT_FACEBOOK || '',
  CONTACT_INSTAGRAM: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM || '',
  CONTACT_GITHUB:
    process.env.NEXT_PUBLIC_CONTACT_GITHUB || 'https://github.com/tangly1024',
  CONTACT_TELEGRAM: process.env.NEXT_PUBLIC_CONTACT_TELEGRAM || '',
  CONTACT_LINKEDIN: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || '',
  CONTACT_X: process.env.NEXT_PUBLIC_CONTACT_X || '', // 兼容 Twitter 和 X
  CONTACT_SOUNDCLOUD: process.env.NEXT_PUBLIC_CONTACT_SOUNDCLOUD || '',
  CONTACT_STACKOVERFLOW: process.env.NEXT_PUBLIC_CONTACT_STACKOVERFLOW || '',
  CONTACT_WECHAT: process.env.NEXT_PUBLIC_CONTACT_WECHAT || '', // 微信二维码图片地址

  // 其他独立页面
  ABOUT_PAGE_ENABLE: process.env.NEXT_PUBLIC_ABOUT_PAGE_ENABLE || true, // 是否开启关于页面
  ABOUT_PAGE_ID:
    process.env.NEXT_PUBLIC_ABOUT_PAGE_ID ||
    'a53565f4900a454d858e65893a77a9d3', // 关于页面ID
  COMMENT_PAGE_ENABLE: process.env.NEXT_PUBLIC_COMMENT_PAGE_ENABLE || false, // 是否开启留言页面
  COMMENT_PAGE_ID:
    process.env.NEXT_PUBLIC_COMMENT_PAGE_ID ||
    'c25f778a594c489280a986c738e411b7', // 留言页面ID
  CONTACT_PAGE_ENABLE: process.env.NEXT_PUBLIC_CONTACT_PAGE_ENABLE || false, // 是否开启联系我页面
  CONTACT_PAGE_ID:
    process.env.NEXT_PUBLIC_CONTACT_PAGE_ID ||
    '649492a5b172465c829e2f4a56a620b7', // 联系我页面ID
  TAG_PAGE_ENABLE: process.env.NEXT_PUBLIC_TAG_PAGE_ENABLE || true, // 是否开启标签页面
  TAG_PAGE_ID:
    process.env.NEXT_PUBLIC_TAG_PAGE_ID ||
    'c1f010f3c64c48f88753c12a784d169c', // 标签页面ID
  ARCHIVE_PAGE_ENABLE: process.env.NEXT_PUBLIC_ARCHIVE_PAGE_ENABLE || true, // 是否开启归档页面
  ARCHIVE_PAGE_ID:
    process.env.NEXT_PUBLIC_ARCHIVE_PAGE_ID ||
    'a88f7800742f4c9c8491c3d183d259c6', // 归档页面ID

  // 菜单相关
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, // 支持Menu类型的菜单，替代了3.12版本前的Page类型
  NAV_CATEGORY_VISIBLE: true, // 是否在导航条显示分类
  NAV_TAG_VISIBLE: true, // 是否在导航条显示标签
  NAV_ARCHIVE_VISIBLE: true, // 是否在导航条显示归档
  NAV_ABOUT_VISIBLE: true, // 是否在导航条显示关于
  NAV_SEARCH_VISIBLE: true, // 是否在导航条显示搜索

  // 文章列表相关设置
  POST_LIST_STYLE: process.env.NEXT_PUBLIC_POST_LIST_STYLE || 'plog', // ['page', 'plog', 'scroll'], // 文章列表样式
  POSTS_PER_PAGE: process.env.NEXT_PUBLIC_POSTS_PER_PAGE || 12, // 文章分页数

  // 文章内页
  POST_FULL_WIDTH: process.env.NEXT_PUBLIC_POST_FULL_WIDTH || false, // 文章内页是否全宽
  POST_SHARE_ENABLE: process.env.NEXT_PUBLIC_POST_SHARE_ENABLE || false, // 是否开启分享功能
  POST_RECOMMEND_ENABLE: process.env.NEXT_PUBLIC_POST_RECOMMEND_ENABLE || false, // 是否开启文章关联推荐
  POST_AUTHOR_INFO_ENABLE:
    process.env.NEXT_PUBLIC_POST_AUTHOR_INFO_ENABLE || false, // 是否开启文章作者信息
  POST_ANALYTICS_ENABLE:
    process.env.NEXT_PUBLIC_POST_ANALYTICS_ENABLE || true, // 是否开启文章字数统计、阅读时长统计
  POST_URL_PREFIX:
