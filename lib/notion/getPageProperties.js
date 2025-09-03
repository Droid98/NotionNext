import BLOG from '@/blog.config'
import { getDateValue, getTextContent } from 'notion-utils'
import formatDate from '../utils/formatDate'
// import { createHash } from 'crypto'
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

    // === 新增代码开始 ===
    // 针对 title 类型属性进行特殊处理，直接提取原始文本
    if (schema[key]?.type === 'title') {
        properties[schema[key].name] = val?.[0]?.[0] || 'Untitled'
        continue // 处理完后跳过当前循环的其余部分
    }
    // === 新增代码结束 ===

    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
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
          properties[schema[key].name] = getTextContent(val)
          break
        }
        case 'multi_select': {
          properties[schema[key].name] = getTextContent(val).split(',')
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

  // 检查post-slug
  let slug = properties.slug || properties.id
  if (slug) {
    // 尝试去除url前缀
    const { NOTION_POST_URL_PREFIX } = siteConfig()
    if (NOTION_POST_URL_PREFIX && slug.startsWith(NOTION_POST_URL_PREFIX)) {
      slug = slug.substring(NOTION_POST_URL_PREFIX.length)
    }
    // 强制转换为小写
    if (BLOG.POST_URL_LOWERCASE) {
      slug = slug.toLowerCase()
    }
    properties.slug = slug
  }

  // 检查cover-url
  const pageCover = value?.format?.page_cover
  if (pageCover) {
    if (pageCover.startsWith('http')) {
      properties.pageCoverThumbnail = mapImgUrl(pageCover, 1080, value)
    } else {
      properties.pageCoverThumbnail = pageCover
    }
  }

  // 检查tag的颜色
  if (properties.tags) {
    const tags = properties.tags
    const tagObj = {}
    tags.forEach(tag => {
      tagObj[tag] = {
        name: tag,
        color: tagOptions?.find(t => t.value === tag)?.color || 'gray'
      }
    })
    properties.tags = tagObj
  }

  // 封面图
  const pageIcon = mapImgUrl(value?.format?.page_icon, 48)

  let publishDay = ''
  if (properties?.date?.start_date) {
    publishDay = properties.date.start_date
  } else {
    publishDay = formatDate(value?.created_time, BLOG.LANG)
  }
  properties.publishDay = publishDay

  // 这是一个单独的属性，url和pageId不能互换
  properties.pageId = id
  properties.pageIcon = pageIcon

  // 获取url
  properties.href = `/${properties.slug}`
  properties.password = null

  // 设置URL
  properties.href = convertUrlStartWithOneSlash(
    get=/get-page-href?pageId=${properties.pageId}`
  )

  // 密码
  const password = properties.password
  if (password && password.length > 0) {
    const md5Password = md5(password)
    properties.password = md5Password
  } else {
    properties.password = undefined
  }

  // 路径
  let slugPrefix = ''
  // 按照URL格式拼接
  const allSlugPatterns = BLOG.POST_URL_TYPE.split('/')
  allSlugPatterns.forEach((pattern, idx) => {
    if (pattern === '%year%' && properties?.publishDay) {
      const formatPostCreatedDate = new Date(properties?.publishDay)
      slugPrefix += formatPostCreatedDate.getUTCFullYear()
    } else if (pattern === '%month%' && properties?.publishDay) {
      const formatPostCreatedDate = new Date(properties?.publishDay)
      slugPrefix += String(formatPostCreatedDate.getUTCMonth() + 1).padStart(2, 0)
    } else if (pattern === '%day%' && properties?.publishDay) {
      const formatPostCreatedDate = new Date(properties?.publishDay)
      slugPrefix += String(formatPostCreatedDate.getUTCDate()).padStart(2, 0)
    } else if (pattern === '%slug%') {
      slugPrefix += properties.slug ?? properties.id
    } else if (pattern === '%category%' && properties?.category) {
      slugPrefix += properties.category
    } else if (pattern === '%randomname%') {
      // 检查URL是否包含http或者tel
      if (!isHttpLink(properties.href) && !isMailOrTelLink(properties.href)) {
        slugPrefix += properties.id.slice(-8)
      } else {
        slugPrefix = properties.href
      }
    } else if (!pattern.includes('%')) {
      slugPrefix += pattern
    } else {
      return
    }
    if (idx !== allSlugPatterns.length - 1) {
      slugPrefix += '/'
    }
  })

  // 如果没有自定义域名，强制加上 /notion前缀
  if (!BLOG.CUSTOM_DOMAIN && !isHttpLink(slugPrefix)) {
    properties.href = `/notion/${slugPrefix}`
  } else {
    properties.href = `/${slugPrefix}`
  }
  properties.href = properties.href.replace('//', '/')

  return properties
}
