import type { APIRoute } from 'astro'
import keywords from '../content/keywords.json'
import notes from '../content/notes.json'

// 构建时生成站内搜索索引（纯静态 JSON，前端 fetch）
export const GET: APIRoute = () => {
  const index = keywords.map((k) => {
    const n = notes.find((x) => x.keywordId === k.id)
    const body = n
      ? [n.opening, ...(n.sections || []).map((s) => `${s.heading} ${s.body}`), ...(n.subTopics || []).map((s) => `${s.name} ${s.note}${s.body ? ' ' + s.body : ''}`)].join('\n')
      : ''
    return { id: k.id, title: k.title, category: k.category, tags: k.tags, summary: k.summary, body }
  })
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
