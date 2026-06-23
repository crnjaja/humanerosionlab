export class PublicationsService {
  static keyOf(publication) {
    return `${publication.title}__${publication.date}__${publication.url || ''}`
  }

  static hasActiveFilters(filters = {}) {
    return Boolean(filters.q || filters.year || filters.author)
  }

  static getYears(publications = []) {
    return Array.from(
      new Set(publications.map((item) => (item.date || '').slice(0, 4)).filter(Boolean)),
    ).sort((a, b) => b.localeCompare(a))
  }

  static getAuthors(publications = []) {
    return Array.from(new Set(publications.flatMap((item) => item.authors || []))).sort((a, b) =>
      a.localeCompare(b),
    )
  }

  static filter(publications = [], filters = {}) {
    const q = String(filters.q || '').trim().toLowerCase()
    const year = filters.year || ''
    const author = filters.author || ''

    return publications
      .map((item) => ({ ...item, y: (item.date || '').slice(0, 4) }))
      .filter((item) => {
        const haystack = [
          item.title,
          item.summary || '',
          (item.tags || []).join(' '),
          (item.authors || []).join(' '),
        ]
          .join(' ')
          .toLowerCase()

        return (
          (!q || haystack.includes(q)) &&
          (!year || item.y === year) &&
          (!author || (item.authors || []).includes(author))
        )
      })
  }

  static sort(publications = [], sort = 'date-desc') {
    return [...publications].sort((a, b) => {
      if (sort === 'date-asc') return (a.date || '').localeCompare(b.date || '')
      if (sort === 'title-asc') return (a.title || '').localeCompare(b.title || '')
      if (sort === 'title-desc') return (b.title || '').localeCompare(a.title || '')
      return (b.date || '').localeCompare(a.date || '')
    })
  }

  static filterAndSort(publications = [], filters = {}) {
    return this.sort(this.filter(publications, filters), filters.sort)
  }

  static paginate(publications = [], page = 1, pageSize = 8) {
    return publications.slice(0, pageSize * page)
  }

  static isCollapsed(publication, expandedKeys = new Set()) {
    return !expandedKeys.has(this.keyOf(publication))
  }

  static toggleExpanded(publication, expandedKeys = new Set()) {
    const key = this.keyOf(publication)
    const next = new Set(expandedKeys)

    if (next.has(key)) next.delete(key)
    else next.add(key)

    return next
  }

  static formatDate(iso) {
    const date = new Date(iso)
    if (!Number.isFinite(date.getTime())) return iso

    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date)
  }
}
