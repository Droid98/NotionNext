import BLOG from '@/blog.config'
import { getDateValue, getTextContent } from 'notion-utils'
import formatDate from '../utils/formatDate'
import md5 from 'js-md5'
import { siteConfig } from '../config'
import { convertUrlStartWithOneSlash, getLastSegmentFromUrl, isHttpLink, isMailOrTelLink } from '../utils'
import { extractLangPrefix } from '../utils/pageId'
import { mapImgUrl } from './mapImage'
import notionAPI from '@/lib/notion/getNotionAPI'

/**
 * 获取页面元素成员属性
 * @param {*} id
 * @param {*} value
 * @param {*} schema
 * @param {*} authToken
 * @param {*} tagOptions
 * @returns
 */
export default async function getPageProperties(
  id,
  value,
  schema,
  authToken,
  tagOptions
) {
  const rawProperties = Object.entries(value?.properties || [])
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const properties = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i]
    properties.id = id
    
    // 检查 val 是否有值，并处理标题
    if (schema[key]?.type === 'title') {
      properties[schema[key].name] = getTextContent(val)
    } else if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val)
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case 'select': {
          const select = getTextContent(val)
          properties[schema[key].name] = select
          break
        }
        case 'multi_select': {
          properties[schema[key].name] = val[0][0].split(',')
          break
        }
        case 'person': {
          const persons = val
            .filter(v => v[0] === '‣')
            .map(v => v[1].split(','))
          properties[schema[key].name] = persons
          break
        }
        case 'file': {
          const files = val
            .filter(v => v[0][1] === 'a')
            .map(v => v[0][0])
          properties[schema[key].name] = files
          break
        }
        default: {
          properties[schema[key].name] = getTextContent(val)
        }
      }
    }
  }
  const pageIcon = mapImgUrl(value?.format?.page_icon, 'pageicon')
  const pageCover = mapImgUrl(value?.format?.page_cover, 'pagecover')
  const pageCoverThumbnail = mapImgUrl(
    pageCover,
    'pageCoverThumbnail',
    value.format
  )
  properties.pageIcon = pageIcon
  properties.pageCover = pageCover
  properties.pageCoverThumbnail = pageCoverThumbnail

  const isArticle = Object.entries(properties).some(([key, value]) => {
    return key === 'slug' && value
  })
  const lastEditTime = formatDate(
    new Date(value?.last_edited_time).toString(),
    BLOG.LANG
  )
  properties.lastEditedDate = lastEditTime
  properties.slug =
    properties.slug ||
    (properties.title && getLastSegmentFromUrl(properties.title)) ||
    (isArticle && id)
  properties.type = properties.type || (isArticle ? 'Post' : 'Page')
  properties.id = id
  properties.summary =
    properties.summary ||
    Object.values(properties)
      .filter(p => typeof p === 'string' && p.length > 10)
      .join(' ')
      .substring(0, 140)

  // 处理URL
  properties.fullWidth = value?.format?.page_full_width || false
  properties.password = properties.password || ''
  properties.tags = properties.tags || []
  properties.publishDate = properties.date?.start_date || properties.createdTime
  properties.date = {
    start_date: properties.date?.start_date || properties.createdTime,
    created_time: value?.created_time
  }
  // properties.createdTime = value.created_time
  properties.createdTime = formatDate(
    new Date(value.created_time).toString(),
    BLOG.LANG
  )
  properties.lastEditedTime = formatDate(
    new Date(value.last_edited_time).toString(),
    BLOG.LANG
  )

  const tag = properties?.tags?.[0]
  if (tag) {
    const locale = extractLangPrefix(tag)
    if (locale) {
      properties.lang = locale
    }
  }
  // 将 Notion URL 的路径前缀重写
  const { POST_URL_PREFIX, POST_URL_PREFIX_MAPPING_CATEGORY } =
    siteConfig('POST_URL_PREFIX')
  if (POST_URL_PREFIX && POST_URL_PREFIX.length && properties.type === 'Post') {
    let fullPrefix = ''
    const allSlugPatterns = POST_URL_PREFIX.split('/')
    allSlugPatterns.forEach((pattern, idx) => {
      // 检查路径中是否包含变量
      if (pattern === '%year%' && properties.publishDate) {
        const formatPostCreatedDate = new Date(properties.publishDate)
        fullPrefix += formatPostCreatedDate.getUTCFullYear()
      } else if (pattern === '%month%' && properties.publishDate) {
        const formatPostCreatedDate = new Date(properties.publishDate)
        fullPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(
          2,
          0
        )
      } else if (pattern === '%day%' && properties.publishDate) {
        const formatPostCreatedDate = new Date(properties.publishDate)
        fullPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0)
      } else if (pattern === '%slug%') {
        fullPrefix += properties.slug ?? properties.id
      } else if (pattern === '%category%' && properties?.category) {
        let categoryPrefix = properties.category
        // 允许映射分类名，通常用来将中文分类映射成英文，美化url.
        if (POST_URL_PREFIX_MAPPING_CATEGORY[properties?.category]) {
          categoryPrefix =
            POST_URL_PREFIX_MAPPING_CATEGORY[properties?.category]
        }
        fullPrefix += categoryPrefix
      } else if (!pattern.includes('%')) {
        fullPrefix += pattern
      } else {
        return
      }
      if (idx !== allSlugPatterns.length - 1) {
        fullPrefix += '/'
      }
    })
    if (fullPrefix.startsWith('/')) {
      fullPrefix = fullPrefix.substring(1) // 去掉头部的"/"
    }
    if (fullPrefix.endsWith('/')) {
      fullPrefix = fullPrefix.substring(0, fullPrefix.length - 1)
    }
    properties.href = `/${fullPrefix}/${properties.slug}`
  } else {
    properties.href = `/${properties.slug}`
  }

  // notion链接
  properties.notionUrl = `https://www.notion.so/${properties.id.replace(
    /-/g,
    ''
  )}`

  // 封面
  if (
    properties?.page_cover?.indexOf('res.notion.so') > -1 &&
    BLOG.IMG_URL_TYPE &&
    properties.type === 'Post'
  ) {
    const isSina = BLOG.IMG_URL_TYPE === 'sina'
    const newImage = await notionAPI.fetch(
      `https://api.tangly1024.com/api/getNotionImage?url=${encodeURIComponent(
        properties.page_cover
      )}&type=${BLOG.IMG_URL_TYPE}`
    )
    if (isSina) {
      properties.page_cover_sina = newImage
    }
  }

  return properties
}
