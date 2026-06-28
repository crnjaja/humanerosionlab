export class HomeService {
  static startOfDay(date) {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  static getUpcomingAgenda(items = [], limit = 8, now = new Date()) {
    const today = HomeService.startOfDay(now)

    return items
      .map((item) => ({
        ...item,
        start: new Date(item.start),
        end: item.end ? new Date(item.end) : null,
      }))
      .filter((item) => item.start >= today)
      .sort((a, b) => a.start - b.start)
      .slice(0, limit)
  }

  static formatDay(date, timezone) {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: timezone }).format(date)
  }

  static formatMonth(date, timezone) {
    return new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: timezone }).format(date)
  }

  static formatTime(date, timezone) {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone,
      hour12: false,
    }).format(date)
  }

  static formatDateLong(date, timezone) {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: timezone,
    }).format(date)
  }

  static formatTimeRange(start, end, timezone) {
    if (!end) return HomeService.formatTime(start, timezone)
    return `${HomeService.formatTime(start, timezone)}–${HomeService.formatTime(end, timezone)}`
  }

  static getPopoverPosition(target) {
    const rect = target.getBoundingClientRect()
    return {
      top: Math.round(rect.bottom + 6),
      left: Math.round(rect.right - 180),
    }
  }

  static toUTCBlock(date) {
    const iso = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    return iso.replaceAll(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  }

  static googleCalendarURL(event) {
    if (!event) return '#'

    const text = encodeURIComponent(event.title || 'Event')
    const details = encodeURIComponent(
      (event.url || '') + (event.url ? '\n' : '') + (event.location || ''),
    )
    const location = encodeURIComponent(event.location || '')
    const start = HomeService.toUTCBlock(event.start)
    const end = HomeService.toUTCBlock(
      event.end || new Date(event.start.getTime() + 60 * 60 * 1000),
    )

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}%2F${end}&details=${details}&location=${location}`
  }

  static toICSDate(date, timezone) {
    const dtf = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const parts = Object.fromEntries(dtf.formatToParts(date).map((part) => [part.type, part.value]))
    return `${parts.year}${parts.month}${parts.day}T${parts.hour}${parts.minute}${parts.second}`
  }

  static buildICS(event, timezone) {
    if (!event) return ''

    const dtStart = HomeService.toICSDate(event.start, timezone)
    const dtEnd = HomeService.toICSDate(
      event.end || new Date(event.start.getTime() + 60 * 60 * 1000),
      timezone,
    )
    const uid = `agenda-${Math.random().toString(36).slice(2)}@site`

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Your Site//Agenda//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${HomeService.toICSDate(new Date(), 'UTC')}Z`,
      `DTSTART;TZID=${timezone}:${dtStart}`,
      `DTEND;TZID=${timezone}:${dtEnd}`,
      `SUMMARY:${String(event.title || '').replaceAll('\n', ' ')}`,
      event.location ? `LOCATION:${String(event.location).replaceAll('\n', ' ')}` : '',
      event.url ? `URL:${event.url}` : '',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(Boolean)
      .join('\r\n')
  }

  static filenameFromTitle(title = 'event') {
    return `${title
      .replaceAll(/[^\w\s-]+/g, '')
      .trim()
      .replaceAll(/\s+/g, '-')}.ics`
  }

  static downloadICS(event, timezone) {
    if (!event) return

    const content = HomeService.buildICS(event, timezone)
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const a = document.createElement('a')

    a.href = URL.createObjectURL(blob)
    a.download = HomeService.filenameFromTitle(event.title || 'event')
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a.href)
    a.remove()
  }

  static initReveal(selector, className = 'revealed') {
    const targets = document.querySelectorAll(selector)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    targets.forEach((target) => observer.observe(target))
    return observer
  }
}
