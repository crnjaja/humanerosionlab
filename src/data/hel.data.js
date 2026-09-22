// src/data/hel.js

export const PROJECT = {
  title: 'RESISTING HUMAN EROSION',
  funding: "CHF 1'744'177",
  period: {
    start: '2025-07-01',
    end: '2030-06-30',
  },
  duration: 5,
}

export const facts = [
  { label: 'Funding', value: 'SNSF Consolidator Grants' },
  { label: 'Duration', value: '01.07.2025 – 30.06.2030' },
  { label: 'Institute', value: 'UniBE Faculty of Law' },
  { label: 'Case studies', value: 'South Asia · Latin America · Pacific' },
]

export const overview = [
  {
    title: 'Mission',
    text: 'HUMAN EROSION reimagines the role of international law in addressing climate migration.',
  },
  {
    title: 'Research Focus',
    text: 'The project studies how migrants experience time throughout their migration journeys.',
  },
  {
    title: 'Objective',
    text: 'Develop innovative legal frameworks that better safeguard human dignity.',
  },
]

export const caseStudies = [
  {
    key: 'south-asia',
    index: '01',
    region: 'South Asia',
    title: 'South Asia',
    description:
      'Capturing temporal experiences of climate migrants and how these intersect with access to rights.',
  },
  {
    key: 'latin-america',
    index: '02',
    region: 'Latin Amer.',
    title: 'Latin Amer.',
    description:
      'Studying climate mobility trajectories, legal responses and lived experiences of slow displacement.',
  },
  {
    key: 'pacific',
    index: '03',
    region: 'Pacific',
    title: 'Pacific',
    description:
      'Examining mobility, disappearing territories and protection needs in oceanic climate futures.',
  },
]

export const workPackages = [
  {
    id: 'wp1',
    index: 'WP1',
    title: 'Work Package 1',
    subtitle: 'Empirical Understanding',
    description:
      'Examining migrants’ lived experiences of time within climate migration litigation.',
    aims: 'Identify how intersecting temporalities influence access to rights.',
  },
  {
    id: 'wp2',
    index: 'WP2',
    title: 'Work Package 2',
    subtitle: 'Theorizing Slow Violence and Climate Migration',
    description: 'Confronting existing normative frameworks with insights from case studies.',
    aims: 'Reframe international law to better meet protection needs and allocate responsibilities.',
  },
]

export const timeline = [
  {
    key: 'wp1-south-asia',
    workPackage: 'WP1',
    track: 'WP1',
    title: 'South Asia',
    owner: 'Postdoc 1',
    subtitle: 'Postdoctoral Researcher 1',
    start: 1.8,
    end: 3,
  },
  {
    key: 'wp1-pacific',
    workPackage: 'WP1',
    track: 'WP1',
    title: 'Pacific',
    owner: 'PI',
    subtitle: 'Principal Investigator',
    start: 1.8,
    end: 3,
  },
  {
    key: 'wp1-latin-america',
    workPackage: 'WP1',
    track: 'WP1',
    title: 'Latin America',
    owner: 'Postdoc 2',
    subtitle: 'Postdoctoral Researcher 2',
    start: 1.8,
    end: 3,
  },
  {
    key: 'wp2-governance',
    workPackage: 'WP2',
    track: 'WP2',
    title: 'Climate Migration Governance',
    owner: 'Research team',
    subtitle: 'Research team',
    start: 1,
    end: 4.4,
  },
  {
    key: 'wp2-writing-time',
    workPackage: 'WP2',
    track: 'WP2',
    title: 'Writing Time',
    owner: 'PhD',
    subtitle: 'PhD',
    start: 2,
    end: 5,
  },
  {
    key: 'wp2-cooperation',
    workPackage: 'WP2',
    track: 'WP2',
    title: 'Cooperation',
    owner: 'Research team',
    subtitle: 'Research team',
    start: 2,
    end: 5,
  },
]

export const mapPoints = [
  {
    key: 'darien-gap',
    label: 'Darién Gap',
    type: 'map-point--one',
    lon: -77.66,
    lat: 8.67,
  },
  {
    key: 'usa',
    label: 'USA',
    type: 'map-point--one',
    lon: -98.58,
    lat: 39.83,
    labelClass: 'map-point--label-left',
  },
  {
    key: 'bangladesh',
    label: 'Bangladesh',
    type: 'map-point--two',
    lon: 90.36,
    lat: 23.69,
    labelClass: 'map-point--label-left',
  },
  {
    key: 'italy',
    label: 'Italy',
    type: 'map-point--two',
    lon: 12.57,
    lat: 41.87,
  },
  {
    key: 'tuvalu',
    label: 'Tuvalu',
    type: 'map-point--three',
    lon: 177.65,
    lat: -8.52,
    labelClass: 'map-point--label-left',
  },
  {
    key: 'australia',
    label: 'Australia',
    type: 'map-point--three',
    lon: 151.21,
    lat: -33.87,
    labelClass: 'map-point--label-left',
  },
]

export const mapRoutes = [
  {
    key: 'darien-usa',
    className: 'route-line--one',

    from: [-77.66, 8.67], // Darién Gap
    to: [-98.58, 39.83], // USA

    waypoints: [
      [-96.0, 19.4], // Mexico
    ],

    lift: 0.05,
    duration: '5.8s',
    delay: '0s',
    label: 'Darién Gap to USA',
  },
  {
    key: 'bangladesh-italy',
    className: 'route-line--two',
    from: [90.36, 23.69],
    to: [12.57, 41.87],
    lift: 0.18,
    duration: '6.6s',
    delay: '1.15s',
    label: 'Bangladesh to Italy',
  },
  {
    key: 'tuvalu-australia',
    className: 'route-line--three',
    from: [177.65, -8.52],
    to: [151.21, -33.87],
    lift: 0.22,
    duration: '5.2s',
    delay: '2.3s',
    label: 'Tuvalu to Australia',
  },
]

export const outputs = [
  {
    key: 'datasets',
    type: 'Output',
    title: 'Datasets',
    description: 'Case law, interviews and legal instruments.',
    icon: 'database',
    items: ['Case law', 'Interviews', 'Legal instruments'],
  },
  {
    key: 'time-map',
    type: 'Output',
    title: 'Time Map',
    description: 'Interactive visualization of temporal dimensions.',
    icon: 'map',
    items: ['Accessible visual tool', 'Temporal rights mapping', 'Climate migration routes'],
  },
  {
    key: 'publications',
    type: 'Output',
    title: 'Publications',
    description: 'Scientific articles and legal analyses.',
    icon: 'book',
    items: ['Academic publications', 'Legal analysis', 'Policy-oriented outputs'],
  },
  {
    key: 'documentaries',
    type: 'Output',
    title: 'Documentaries',
    description: 'Video documentaries produced during fieldwork.',
    icon: 'video',
    items: ['Field narratives', 'Public communication', 'Research dissemination'],
  },
]

export const contributions = [
  {
    key: 'academic',
    type: 'Academic',
    title: 'Academic Contributions',
    items: [
      'Conceptualize temporalities in climate migration',
      'Provide empirical datasets',
      'Develop innovative legal frameworks',
      'Facilitate collaborative learning with field partners',
    ],
  },
  {
    key: 'policy',
    type: 'Policy',
    title: 'Policy Contributions',
    items: [
      'Support international initiatives such as the GCM and UN ILC',
      'Inform NGOs and policy makers',
      'Create accessible visual tools',
      'Train diplomatic staff',
    ],
  },
]
