import {
  PROJECT,
  caseStudies,
  contributions,
  facts,
  mapPoints,
  mapRoutes as mapRouteData,
  outputs,
  overview,
  timeline,
  workPackages,
} from '@/data/hel.data.js'

const MAP_WIDTH = 1000
const MAP_HEIGHT = 520

function projectPoint(lon, lat) {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((90 - lat) / 180) * MAP_HEIGHT,
    xPercent: ((lon + 180) / 360) * 100,
    yPercent: ((90 - lat) / 180) * 100,
  }
}

function cubicPoint(start, c1, c2, end, t) {
  const mt = 1 - t

  return {
    x: mt ** 3 * start.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * end.x,

    y: mt ** 3 * start.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * end.y,
  }
}

function cubicLength(start, c1, c2, end, samples = 42) {
  let length = 0
  let previous = start

  for (let index = 1; index <= samples; index += 1) {
    const point = cubicPoint(start, c1, c2, end, index / samples)

    length += Math.hypot(point.x - previous.x, point.y - previous.y)

    previous = point
  }

  return Math.ceil(length)
}

function arcRoute(startLonLat, endLonLat, lift = 0.18) {
  const start = projectPoint(startLonLat[0], startLonLat[1])

  const end = projectPoint(endLonLat[0], endLonLat[1])

  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.hypot(dx, dy)

  const arcLift = Math.min(150, Math.max(48, distance * lift))

  const c1 = {
    x: start.x + dx * 0.33,
    y: start.y + dy * 0.33 - arcLift,
  }

  const c2 = {
    x: start.x + dx * 0.66,
    y: start.y + dy * 0.66 - arcLift,
  }

  /*
   * Important :
   * on conserve ici la précision complète des coordonnées.
   *
   * Les points de la carte utilisent les coordonnées projetées
   * en pourcentage sans arrondi. Arrondir le path SVG avec
   * toFixed(1) pouvait donc créer un léger décalage entre
   * l'extrémité de la route et le centre du point.
   */
  const path = [
    `M${start.x} ${start.y}`,
    `C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`,
  ].join(' ')

  return {
    path,
    length: cubicLength(start, c1, c2, end),
  }
}

function migrationRoute({
  key,
  className,
  from,
  to,
  waypoints = [],
  lift,
  duration = '6.4s',
  delay = '0s',
  label,
}) {
  const points = [from, ...waypoints, to]

  const segments = points
    .slice(0, -1)
    .map((point, index) => arcRoute(point, points[index + 1], lift))

  const path = segments
    .map((segment, index) => {
      if (index === 0) {
        return segment.path
      }

      /*
       * Pour les segments après le premier, on enlève uniquement
       * la commande M afin de continuer le même path SVG.
       */
      return segment.path.replace(/^M[\d.eE+-]+\s[\d.eE+-]+\s*/, '')
    })
    .join(' ')

  return {
    key,
    className,
    label,
    from,
    to,
    duration,
    delay,
    path,
    length: segments.reduce((total, segment) => total + segment.length, 0),
  }
}

export class HelService {
  static PROJECT = PROJECT

  static facts = facts

  static overview = overview

  static caseStudies = caseStudies

  static workPackages = workPackages

  static timeline = timeline

  static mapPoints = mapPoints

  static migrationFlows = mapPoints

  static mapRoutes = mapRouteData.map(migrationRoute)

  static outputs = outputs

  static contributions = contributions

  static years() {
    return Array.from(
      {
        length: HelService.PROJECT.duration,
      },
      (_, index) => index + 1,
    )
  }

  static timelineStyle(item) {
    const totalYears = HelService.PROJECT.duration

    const start = Number(item.start)
    const end = Number(item.end)

    const safeStart = Math.min(totalYears, Math.max(1, Number.isFinite(start) ? start : 1))

    const safeEnd = Math.min(
      totalYears + 1,
      Math.max(safeStart, Number.isFinite(end) ? end + 1 : safeStart),
    )

    return {
      '--timeline-left': `${((safeStart - 1) / totalYears) * 100}%`,

      '--timeline-width': `${((safeEnd - safeStart) / totalYears) * 100}%`,
    }
  }

  static workPackageClass(workPackage) {
    return `timeline-item--${String(workPackage || '')
      .toLowerCase()
      .replace(/\s+/g, '-')}`
  }

  static pointStyle(point) {
    const projected = projectPoint(point.lon, point.lat)

    const pointDelays = {
      'darien-gap': '0s',
      usa: '2.9s',
      bangladesh: '1.15s',
      italy: '4.45s',
      tuvalu: '2.3s',
      australia: '4.9s',
    }

    return {
      '--x': `${projected.xPercent}%`,

      '--y': `${projected.yPercent}%`,

      '--point-delay': pointDelays[point.key] || '0s',
    }
  }

  static routeStyle(route) {
    const length = Number(route.length)

    return {
      '--route-duration': route.duration || '6.4s',

      '--route-delay': route.delay || '0s',

      '--route-length': Number.isFinite(length) ? length : 900,
    }
  }

  static progress() {
    const start = new Date(HelService.PROJECT.period.start)

    const end = new Date(HelService.PROJECT.period.end)

    const now = new Date()

    const total = end.getTime() - start.getTime()

    const elapsed = now.getTime() - start.getTime()

    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  static durationYears() {
    return HelService.PROJECT.duration
  }

  static funding() {
    return HelService.PROJECT.funding
  }

  static formattedPeriod() {
    return 'July 2025 – June 2030'
  }
}
