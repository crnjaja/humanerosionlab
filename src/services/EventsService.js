export class EventsService {
  static PAGE_SIZE = 8

  static keyOf(event) {
    return `${event.title}__${event.start}__${event.location || ''}`
  }

  static getYear(event) {
    return (event.start || '').slice(0, 4)
  }

  static categoryClass(event) {
    return `event-card--${String(event.category || 'event')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')}`
  }

  static summaryBalanceClass(event) {
    const length = (event.title || '').length

    if (length > 115) return 'summary-short'
    if (length > 75) return 'summary-medium'
    return 'summary-long'
  }

  static getSearchText(event) {
    return [
      event.title,
      event.summary,
      event.location,
      event.category,
      (event.speakers || []).join(' '),
    ]
      .join(' ')
      .toLowerCase()
  }

  static filter(events, { q = '', year = '', speaker = '' } = {}) {
    const search = q.trim().toLowerCase()

    return events.filter((event) => {
      const haystack = EventsService.getSearchText(event)

      return (
        (!search || haystack.includes(search)) &&
        (!year || EventsService.getYear(event) === year) &&
        (!speaker || (event.speakers || []).includes(speaker))
      )
    })
  }

  static sort(events, sort = 'date-desc') {
    return [...events].sort((a, b) => {
      if (sort === 'date-asc') return (a.start || '').localeCompare(b.start || '')
      if (sort === 'title-asc') return (a.title || '').localeCompare(b.title || '')
      if (sort === 'title-desc') return (b.title || '').localeCompare(a.title || '')
      return (b.start || '').localeCompare(a.start || '')
    })
  }

  static filterAndSort(events, filters = {}) {
    return EventsService.sort(EventsService.filter(events, filters), filters.sort)
  }

  static getYears(events) {
    return Array.from(new Set(events.map(EventsService.getYear).filter(Boolean))).sort((a, b) =>
      b.localeCompare(a),
    )
  }

  static getSpeakers(events) {
    return Array.from(new Set(events.flatMap((event) => event.speakers || []).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b),
    )
  }

  static getVisibleItems(events, page, expandedOrder = []) {
    const baseItems = events.slice(0, EventsService.PAGE_SIZE * page)
    return EventsService.putExpandedFirst(baseItems, expandedOrder)
  }

  static putExpandedFirst(events, expandedOrder = []) {
    const expanded = expandedOrder
      .map((key) => events.find((event) => EventsService.keyOf(event) === key))
      .filter(Boolean)

    const expandedSet = new Set(expanded.map(EventsService.keyOf))
    const normal = events.filter((event) => !expandedSet.has(EventsService.keyOf(event)))

    return [...expanded, ...normal]
  }

  static dateParts(startISO) {
    const date = new Date(startISO)
    if (!Number.isFinite(date.getTime())) return { day: '--', month: '', year: '' }

    return {
      day: new Intl.DateTimeFormat(undefined, { day: '2-digit' }).format(date),
      month: new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date),
      year: new Intl.DateTimeFormat(undefined, { year: 'numeric' }).format(date),
    }
  }

  static prettyDate(startISO) {
    const date = new Date(startISO)
    if (!Number.isFinite(date.getTime())) return ''

    return new Intl.DateTimeFormat(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
}
