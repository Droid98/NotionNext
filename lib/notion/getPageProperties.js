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
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      // 这里的getTextContent可能会过滤特殊字符，所以我们直接使用原始值
      // properties[schema[key].name] = getTextContent(val)
      properties[schema[key].name] = val[0][0] || '' // 使用原始文本
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = getDateValue(val)
          delete dateProperty.type
          properties[schema[key].name] = dateProperty
          break
        }
        case 'select': {
          const select = val[0][0]
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

  // ... 剩余代码保持不变 ...

  return properties
}
