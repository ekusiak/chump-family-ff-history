import { useMemo, useState } from 'react'

const OWNER_ALIASES = {
  'Edward Kusiak': 'Eddie',
  'Ben Kusiak': 'Ben',
  'Henry Kusiak': 'Henry',
  'G B': 'Jerry',
  'Susan Bockwinkel': 'Sue',
  'kevin kusiak': 'Kevin',
  'DJ Kusiak': 'Debbie',
  'Matthew Macek': 'Matthew',
  'Beth Kusiak': 'Beth',
  'Ken Madziarek': 'Ken',
  'Callie Wilson': 'Callie',
  'Jack Duffy': 'Jack',
  'Kathy Kusiak': 'Kathy',
  'rick wilson': 'Rick',
  'Sharon Wilson': 'Sharon',
}

const SEASONS = {
  2025: [
    { rank: 1, team: "Clark's Barks 🥇🥈🥈🥉💩", owners: ['Edward Kusiak'], w: 8, l: 6, pf: 1636.42, pa: 1480.2, pfg: 116.9, pag: 105.7, diff: 11.2 },
    { rank: 2, team: 'KOOZ CONTROL', owners: ['Ben Kusiak'], w: 9, l: 5, pf: 1673.6, pa: 1532.22, pfg: 119.5, pag: 109.4, diff: 10.1 },
    { rank: 3, team: 'Back 2 Back', owners: ['Henry Kusiak'], w: 9, l: 5, pf: 1677.12, pa: 1604.06, pfg: 119.8, pag: 114.6, diff: 5.2 },
    { rank: 4, team: 'Lucky Hudson', owners: ['G B', 'Susan Bockwinkel'], w: 10, l: 4, pf: 1620.72, pa: 1420.38, pfg: 115.8, pag: 101.5, diff: 14.3 },
    { rank: 5, team: 'Team Chewy', owners: ['kevin kusiak'], w: 8, l: 6, pf: 1690.36, pa: 1670.3, pfg: 120.7, pag: 119.3, diff: 1.4 },
    { rank: 6, team: 'LV Heat', owners: ['DJ Kusiak'], w: 7, l: 7, pf: 1719.14, pa: 1704.06, pfg: 122.8, pag: 121.7, diff: 1.1 },
    { rank: 7, team: 'Betthew Maciak', owners: ['Matthew Macek', 'Beth Kusiak'], w: 7, l: 7, pf: 1665.6, pa: 1673.82, pfg: 119.0, pag: 119.6, diff: -0.6 },
    { rank: 8, team: 'Ted Lasso Returns', owners: ['Ken Madziarek'], w: 4, l: 10, pf: 1648.94, pa: 1782.76, pfg: 117.8, pag: 127.3, diff: -9.6 },
    { rank: 9, team: 'Jallie Wuffy', owners: ['Callie Wilson', 'Jack Duffy'], w: 7, l: 7, pf: 1594.2, pa: 1544.6, pfg: 113.9, pag: 110.3, diff: 3.5 },
    { rank: 10, team: 'YouJustGotLittUp', owners: ['Kathy Kusiak'], w: 6, l: 8, pf: 1583.16, pa: 1635.38, pfg: 113.1, pag: 116.8, diff: -3.7 },
    { rank: 11, team: 'Dilly Dilly', owners: ['rick wilson'], w: 3, l: 11, pf: 1393.74, pa: 1742.76, pfg: 99.6, pag: 124.5, diff: -24.9 },
    { rank: 12, team: 'Gridiron Glow-Up', owners: ['Sharon Wilson'], w: 6, l: 8, pf: 1499.86, pa: 1612.32, pfg: 107.1, pag: 115.2, diff: -8.0 },
  ],
  2024: [
    { rank: 1, team: 'Back 2 Back', owners: ['Henry Kusiak'], w: 7, l: 7, pf: 1630.6, pa: 1557.88, pfg: 116.5, pag: 111.3, diff: 5.2 },
    { rank: 2, team: 'Dilly Dilly', owners: ['rick wilson'], w: 12, l: 2, pf: 1902.2, pa: 1555.16, pfg: 135.9, pag: 111.1, diff: 24.8 },
    { rank: 3, team: "Clark's Barks", owners: ['Edward Kusiak'], w: 11, l: 3, pf: 1668.28, pa: 1472.26, pfg: 119.2, pag: 105.2, diff: 14.0 },
    { rank: 4, team: 'KOOZ CONTROL', owners: ['Ben Kusiak'], w: 8, l: 6, pf: 1691.1, pa: 1597.52, pfg: 120.8, pag: 114.1, diff: 6.7 },
    { rank: 5, team: 'Ted Lasso Returns', owners: ['Ken Madziarek'], w: 7, l: 7, pf: 1706.98, pa: 1545.68, pfg: 121.9, pag: 110.4, diff: 11.5 },
    { rank: 6, team: 'YouJustGotLittUp', owners: ['Kathy Kusiak'], w: 8, l: 6, pf: 1707.98, pa: 1579.64, pfg: 122.0, pag: 112.8, diff: 9.2 },
    { rank: 7, team: 'LV Heat', owners: ['DJ Kusiak'], w: 3, l: 11, pf: 1533.14, pa: 1742.96, pfg: 109.5, pag: 124.5, diff: -15.0 },
    { rank: 8, team: 'Betthew Maciak', owners: ['Matthew Macek', 'Beth Kusiak'], w: 6, l: 8, pf: 1473.78, pa: 1608.26, pfg: 105.3, pag: 114.9, diff: -9.6 },
    { rank: 9, team: 'Calwina', owners: ['Callie Wilson'], w: 7, l: 7, pf: 1552.76, pa: 1666.08, pfg: 110.9, pag: 119.0, diff: -8.1 },
    { rank: 10, team: 'Team Chewy', owners: ['kevin kusiak'], w: 5, l: 9, pf: 1601.26, pa: 1672.48, pfg: 114.4, pag: 119.5, diff: -5.1 },
    { rank: 11, team: 'Purdy Purdy Odunze', owners: ['G B'], w: 4, l: 10, pf: 1390.38, pa: 1681.9, pfg: 99.3, pag: 120.1, diff: -20.8 },
    { rank: 12, team: 'Beach BUMS', owners: ['Sharon Wilson'], w: 6, l: 8, pf: 1683.68, pa: 1862.32, pfg: 120.3, pag: 133.0, diff: -12.8 },
  ],
  2023: [
    { rank: 1, team: 'The Best', owners: ['Henry Kusiak'], w: 9, l: 5, pf: 1854.72, pa: 1618.9, pfg: 132.5, pag: 115.6, diff: 16.8 },
    { rank: 2, team: 'Calwina', owners: ['Callie Wilson'], w: 9, l: 5, pf: 1770.64, pa: 1605.18, pfg: 126.5, pag: 114.7, diff: 11.8 },
    { rank: 3, team: 'YouJustGotLittUp', owners: ['Kathy Kusiak'], w: 8, l: 6, pf: 1524.88, pa: 1498.06, pfg: 108.9, pag: 107.0, diff: 1.9 },
    { rank: 4, team: 'AUNTicipating Victory', owners: ['Sharon Wilson'], w: 7, l: 7, pf: 1603.24, pa: 1547.54, pfg: 114.5, pag: 110.5, diff: 4.0 },
    { rank: 5, team: 'Betthew Maciak', owners: ['Matthew Macek', 'Beth Kusiak'], w: 9, l: 5, pf: 1818.88, pa: 1666.56, pfg: 129.9, pag: 119.0, diff: 10.9 },
    { rank: 6, team: 'The Real Slim Swiftie', owners: ['Ken Madziarek'], w: 8, l: 6, pf: 1582.38, pa: 1533.7, pfg: 113.0, pag: 109.6, diff: 3.5 },
    { rank: 7, team: 'LV Heat', owners: ['DJ Kusiak'], w: 6, l: 8, pf: 1579.5, pa: 1782.72, pfg: 112.8, pag: 127.3, diff: -14.5 },
    { rank: 8, team: 'Team Chewy', owners: ['kevin kusiak'], w: 6, l: 8, pf: 1533.78, pa: 1567.78, pfg: 109.6, pag: 112.0, diff: -2.4 },
    { rank: 9, team: 'KOOZ CONTROL', owners: ['Ben Kusiak'], w: 4, l: 10, pf: 1483.96, pa: 1703.2, pfg: 106.0, pag: 121.7, diff: -15.7 },
    { rank: 10, team: 'Dilly Dilly', owners: ['rick wilson'], w: 5, l: 9, pf: 1521.44, pa: 1703.26, pfg: 108.7, pag: 121.7, diff: -13.0 },
    { rank: 11, team: 'Run, Run, Run The Ball', owners: ['G B'], w: 7, l: 7, pf: 1515.66, pa: 1518.68, pfg: 108.3, pag: 108.5, diff: -0.2 },
    { rank: 12, team: "Clark's Barks", owners: ['Edward Kusiak'], w: 6, l: 8, pf: 1695.62, pa: 1739.12, pfg: 121.1, pag: 124.2, diff: -3.1 },
  ],
  2022: [
    { rank: 1, team: 'Team Chewy', owners: ['kevin kusiak'], w: 10, l: 4, pf: 1703.86, pa: 1534.96, pfg: 121.7, pag: 109.6, diff: 12.1 },
    { rank: 2, team: "Clark's Barks", owners: ['Edward Kusiak'], w: 8, l: 6, pf: 1573.34, pa: 1581.48, pfg: 112.4, pag: 113.0, diff: -0.6 },
    { rank: 3, team: 'Team JoeBuckYrSelf', owners: ['Sharon Wilson'], w: 9, l: 5, pf: 1680.24, pa: 1681.82, pfg: 120.0, pag: 120.1, diff: -0.1 },
    { rank: 4, team: 'Betthew Maciak', owners: ['Matthew Macek', 'Beth Kusiak'], w: 10, l: 4, pf: 1738.06, pa: 1580.68, pfg: 124.1, pag: 112.9, diff: 11.2 },
    { rank: 5, team: 'LV Heat', owners: ['DJ Kusiak'], w: 9, l: 5, pf: 1563.38, pa: 1529.58, pfg: 111.7, pag: 109.3, diff: 2.4 },
    { rank: 6, team: 'UNCLE Stud', owners: ['rick wilson'], w: 7, l: 7, pf: 1629.36, pa: 1589.46, pfg: 116.4, pag: 113.5, diff: 2.9 },
    { rank: 7, team: 'The Best', owners: ['Henry Kusiak'], w: 2, l: 12, pf: 1313.8, pa: 1552.86, pfg: 93.8, pag: 110.9, diff: -17.1 },
    { rank: 8, team: 'Najee By Nature', owners: ['G B'], w: 6, l: 8, pf: 1660.2, pa: 1622.92, pfg: 118.6, pag: 115.9, diff: 2.7 },
    { rank: 9, team: 'Mama Kooz', owners: ['Kathy Kusiak'], w: 6, l: 8, pf: 1592.64, pa: 1574.4, pfg: 113.8, pag: 112.5, diff: 1.3 },
    { rank: 10, team: 'KOOZ CONTROL', owners: ['Ben Kusiak'], w: 5, l: 9, pf: 1483.96, pa: 1624.5, pfg: 106.0, pag: 116.0, diff: -10.0 },
    { rank: 11, team: 'Team Calwina', owners: ['Callie Wilson'], w: 6, l: 8, pf: 1660.48, pa: 1703.36, pfg: 118.6, pag: 121.7, diff: -3.1 },
    { rank: 12, team: 'Ted Lasso', owners: ['Ken Madziarek'], w: 6, l: 8, pf: 1650.34, pa: 1673.64, pfg: 117.9, pag: 119.5, diff: -1.7 },
  ],
  2021: [
    { rank: 1, team: 'Ted Lasso', owners: ['Ken Madziarek'], w: 9, l: 5, pf: 1964.14, pa: 1693.78, pfg: 140.3, pag: 121.0, diff: 19.3 },
    { rank: 2, team: "Clark's Barks", owners: ['Edward Kusiak'], w: 11, l: 3, pf: 1885.52, pa: 1703.2, pfg: 134.7, pag: 121.7, diff: 13.0 },
    { rank: 3, team: 'KOOZ CONTROL', owners: ['Ben Kusiak'], w: 11, l: 3, pf: 1852.06, pa: 1681.36, pfg: 132.3, pag: 120.1, diff: 12.2 },
    { rank: 4, team: 'Yung Stud', owners: ['Henry Kusiak'], w: 7, l: 7, pf: 1708.2, pa: 1677.0, pfg: 122.0, pag: 119.8, diff: 2.2 },
    { rank: 5, team: 'Touchdown Here', owners: ['rick wilson', 'Sharon Wilson'], w: 7, l: 7, pf: 1772.56, pa: 1630.38, pfg: 126.6, pag: 116.5, diff: 10.2 },
    { rank: 6, team: 'Shark Week Bethers', owners: ['Beth Kusiak'], w: 6, l: 8, pf: 1645.58, pa: 1871.84, pfg: 117.5, pag: 133.7, diff: -16.2 },
    { rank: 7, team: 'Team Chewy', owners: ['kevin kusiak'], w: 3, l: 11, pf: 1548.94, pa: 1777.24, pfg: 110.6, pag: 126.9, diff: -16.3 },
    { rank: 8, team: 'Magic Man Macek', owners: ['Matthew Macek'], w: 6, l: 8, pf: 1641.7, pa: 1735.12, pfg: 117.3, pag: 123.9, diff: -6.7 },
    { rank: 9, team: 'LV Heat', owners: ['DJ Kusiak'], w: 5, l: 9, pf: 1698.56, pa: 1777.02, pfg: 121.3, pag: 126.9, diff: -5.6 },
    { rank: 10, team: 'Team To Be Determined', owners: ['G B'], w: 5, l: 9, pf: 1539.92, pa: 1710.24, pfg: 110.0, pag: 122.2, diff: -12.2 },
  ],
}

const HISTORY = [
  { year: 2025, champion: 'Eddie', runnerUp: 'Ben', third: 'Henry', fourth: 'Jerry / Sue', chump: 'Sharon' },
  { year: 2024, champion: 'Henry', runnerUp: 'Rick', third: 'Eddie', fourth: 'Ben', chump: 'Sharon' },
  { year: 2023, champion: 'Henry', runnerUp: 'Callie', third: 'Kathy', fourth: 'Sharon', chump: 'Eddie' },
  { year: 2022, champion: 'Kevin', runnerUp: 'Eddie', third: 'Sharon', fourth: 'Betthew', chump: 'Ken', note: 'Damar Hamlin year' },
  { year: 2021, champion: 'Ken', runnerUp: 'Eddie', third: 'Ben', fourth: 'Henry', chump: 'Debbie' },
]

const PLAYOFFS = [
  { name: 'Eddie', appearances: 4 },
  { name: 'Henry', appearances: 4 },
  { name: 'Ben', appearances: 3 },
  { name: 'Ken', appearances: 3 },
  { name: 'Sharon', appearances: 2.5, note: 'Rick and Sharon shared a playoff team in 2021, credited as 0.5 each.' },
  { name: 'Rick', appearances: 2.5, note: 'Rick and Sharon shared a playoff team in 2021, credited as 0.5 each.' },
  { name: 'Betthew (team)', appearances: 2, note: 'Beth + Matthew together, 2022–2025 only. This does not include Beth’s separate 2021 appearance.' },
  { name: 'Kathy', appearances: 2, note: 'Not a league member in 2021.' },
  { name: 'Kevin', appearances: 2 },
  { name: 'Debbie', appearances: 2 },
  { name: 'Beth (solo)', appearances: 1, note: 'Beth made the playoffs in 2021 before joining Matthew as Betthew.' },
  { name: 'Jerry', appearances: 1 },
  { name: 'Callie', appearances: 1, note: 'Not a league member in 2021.' },
  { name: 'Matthew (solo)', appearances: 0, note: 'Matthew did not make the playoffs with his separate 2021 team.' },
]

const WEEKLY_HIGH_SCORERS_2025 = [
  { name: 'Eddie', weeks: [2, 5] },
  { name: 'Henry', weeks: [6] },
  { name: 'Kevin', weeks: [9] },
  { name: 'Debbie', weeks: [11, 13, 14] },
  { name: 'Betthew', weeks: [7, 12] },
  { name: 'Aunt Sharon', weeks: [8] },
  { name: 'Ken', weeks: [3, 4, 10] },
  { name: 'Kathy', weeks: [1] },
]

const WEEKLY_HIGH_BY_WEEK_2025 = WEEKLY_HIGH_SCORERS_2025
  .flatMap((player) => player.weeks.map((week) => ({ week, name: player.name })))
  .sort((a, b) => a.week - b.week)

const PAYOUTS_2026 = [
  { label: 'Buy-In', amount: '$25' },
  { label: '1st Place', amount: '$120' },
  { label: '2nd Place', amount: '$65' },
  { label: '3rd Place', amount: '$30' },
  { label: '4th Place', amount: '$15' },
  { label: 'Weekly High Scorer', amount: '$5' },
]



const HALL_OF_CHUMPS = [
  {
    year: 2025,
    chump: 'Sharon',
    media: [{ type: 'vimeo', src: 'https://player.vimeo.com/video/1153244501?dnt=1', href: 'https://vimeo.com/1153244501' }],
  },
  {
    year: 2024,
    chump: 'Sharon',
    media: [{ type: 'vimeo', src: 'https://player.vimeo.com/video/1108754169?dnt=1', href: 'https://vimeo.com/1108754169' }],
  },
  {
    year: 2023,
    chump: 'Eddie',
    media: [{ type: 'youtube', src: 'https://www.youtube.com/embed/f-xXkWhQGtI' }],
  },
  {
    year: 2022,
    chump: 'Ken',
    media: [
      {
        type: 'image',
        src: 'https://media.tenor.com/d_MjD4WnrRgAAAAM/problemastecnicos-los-simpsons.gif',
        href: 'https://media.tenor.com/d_MjD4WnrRgAAAAM/problemastecnicos-los-simpsons.gif',
        label: 'Technical difficulties GIF',
      },
      {
        type: 'tenor',
        src: 'https://tenor.com/embed/4969023',
        href: 'https://tenor.com/view/game-of-thrones-got-shame-nun-gif-4969023',
        label: 'Shame nun GIF',
      },
    ],
  },
  {
    year: 2021,
    chump: 'Debbie',
    media: [{ type: 'localVideo', src: '/the-biggest-chump-2021.mp4' }],
  },
]

const YEARS = Object.keys(SEASONS).map(Number).sort((a, b) => b - a)

function ownerName(owner) {
  return OWNER_ALIASES[owner] ?? owner
}

function formatNumber(value, digits = 2) {
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function formatRecord(w, l) {
  return `${w}-${l}`
}

function formatYearSpan(years) {
  if (years.length === 1) return String(years[0])
  return `${years[0]}–${years[years.length - 1]}`
}

function buildPlayerSeasonRows(year) {
  return SEASONS[year].flatMap((team) => {
    const isBetthew = team.owners.includes('Matthew Macek') && team.owners.includes('Beth Kusiak')

    // Beth + Matthew have operated as one franchise (Betthew) since 2022.
    // Keep their two separate 2021 teams intact so the historical standings stay accurate.
    if (isBetthew) {
      return [{
        ...team,
        player: 'Betthew',
        coManagers: [],
        year,
      }]
    }

    return team.owners.map((owner) => ({
      ...team,
      player: ownerName(owner),
      coManagers: team.owners.filter((candidate) => candidate !== owner).map(ownerName),
      year,
    }))
  }).sort((a, b) => a.rank - b.rank || a.player.localeCompare(b.player))
}

function buildAllTimeRows(years = YEARS) {
  const byPlayer = new Map()

  years.forEach((year) => {
    buildPlayerSeasonRows(year).forEach((row) => {
      // Beth and Matthew keep their separate 2021 records. Their shared 2022–2025
      // seasons are already represented by the single Betthew row above.
      const player = row.player
      const current = byPlayer.get(player) ?? {
        player,
        w: 0,
        l: 0,
        pf: 0,
        pa: 0,
        teams: [],
        years: [],
      }

      current.w += row.w
      current.l += row.l
      current.pf += row.pf
      current.pa += row.pa
      current.teams.push(row.team)
      current.years.push(year)
      byPlayer.set(player, current)
    })
  })

  return [...byPlayer.values()]
    .map((row) => {
      const games = row.w + row.l
      return {
        ...row,
        seasons: [...new Set(row.years)].length,
        games,
        winPct: games ? row.w / games : 0,
        pfg: games ? row.pf / games : 0,
        pag: games ? row.pa / games : 0,
        diff: games ? (row.pf - row.pa) / games : 0,
        teams: [...new Set(row.teams)],
        years: [...new Set(row.years)].sort((a, b) => a - b),
      }
    })
    .sort((a, b) => b.w - a.w || b.winPct - a.winPct || b.pf - a.pf)
    .map((row, index) => ({ ...row, rank: index + 1 }))
}

const ALL_TIME_SORTERS = {
  rank: (a, b) => a.rank - b.rank,
  player: (a, b) => a.player.localeCompare(b.player),
  seasons: (a, b) => a.seasons - b.seasons,
  record: (a, b) => a.w - b.w || b.l - a.l,
  winPct: (a, b) => a.winPct - b.winPct,
  pf: (a, b) => a.pf - b.pf,
  pa: (a, b) => a.pa - b.pa,
  pfg: (a, b) => a.pfg - b.pfg,
  pag: (a, b) => a.pag - b.pag,
  diff: (a, b) => a.diff - b.diff,
  teams: (a, b) => a.teams.join(' · ').localeCompare(b.teams.join(' · ')),
}

function SortableHeader({ label, sortKey, sortConfig, onSort }) {
  const active = sortConfig.key === sortKey
  const arrow = active ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'

  return (
    <th aria-sort={active ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button className={`sort-button ${active ? 'sort-button--active' : ''}`} onClick={() => onSort(sortKey)}>
        <span>{label}</span>
        <span className="sort-arrow" aria-hidden="true">{arrow}</span>
      </button>
    </th>
  )
}

function StatPill({ children, tone = 'neutral' }) {
  return <span className={`stat-pill stat-pill--${tone}`}>{children}</span>
}

function App() {
  const [activeTab, setActiveTab] = useState('stats')
  const [season, setSeason] = useState('All-Time')
  const [exclude2021, setExclude2021] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' })
  const allTimeRows = useMemo(
    () => buildAllTimeRows(exclude2021 ? YEARS.filter((year) => year !== 2021) : YEARS),
    [exclude2021],
  )
  const sortedAllTimeRows = useMemo(() => {
    const sorter = ALL_TIME_SORTERS[sortConfig.key] ?? ALL_TIME_SORTERS.rank
    const direction = sortConfig.direction === 'asc' ? 1 : -1
    return [...allTimeRows].sort((a, b) => direction * sorter(a, b))
  }, [allTimeRows, sortConfig])
  const selectedYearRows = useMemo(
    () => (season === 'All-Time' ? [] : buildPlayerSeasonRows(Number(season))),
    [season],
  )

  function handleSort(key) {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const championCounts = useMemo(() => {
    return HISTORY.reduce((acc, item) => {
      acc[item.champion] = (acc[item.champion] ?? 0) + 1
      return acc
    }, {})
  }, [])

  const topChampionCount = Math.max(...Object.values(championCounts))
  const topChampions = Object.entries(championCounts)
    .filter(([, count]) => count === topChampionCount)
    .map(([name]) => name)
    .join(' & ')

  const allTimeLeaderRows = useMemo(() => buildAllTimeRows(YEARS), [])
  const mostWins = Math.max(...allTimeLeaderRows.map((row) => row.w))
  const mostWinsPlayers = allTimeLeaderRows
    .filter((row) => row.w === mostWins)
    .map((row) => row.player)
    .join(' & ')

  const mostPlayoffAppearances = Math.max(...PLAYOFFS.map((player) => player.appearances))
  const mostPlayoffPlayers = PLAYOFFS
    .filter((player) => player.appearances === mostPlayoffAppearances)
    .map((player) => player.name.replace(' (team)', ''))
    .join(' & ')

  const chumpCounts = useMemo(() => {
    return HISTORY.reduce((acc, item) => {
      acc[item.chump] = (acc[item.chump] ?? 0) + 1
      return acc
    }, {})
  }, [])
  const mostChumpTitles = Math.max(...Object.values(chumpCounts))
  const mostChumps = Object.entries(chumpCounts)
    .filter(([, count]) => count === mostChumpTitles)
    .map(([name]) => name)
    .join(' & ')

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__eyebrow">EST. 2021</div>
        <h1>Chump Family Fantasy Football</h1>
        <p>League history, bragging rights, heartbreak, and the race to avoid the chump crown.</p>
        <div className="hero__stats">
          <div>
            <strong>5</strong>
            <span>Seasons</span>
          </div>
          <div>
            <strong>{topChampions}</strong>
            <span>Most Titles ({topChampionCount})</span>
          </div>
          <div>
            <strong>{mostWinsPlayers}</strong>
            <span>Most Wins ({mostWins})</span>
          </div>
          <div>
            <strong>{mostPlayoffPlayers}</strong>
            <span>Most Playoff Apps ({mostPlayoffAppearances})</span>
          </div>
          <div>
            <strong>{mostChumps}</strong>
            <span>Most Chump Titles ({mostChumpTitles})</span>
          </div>
          <div>
            <strong>12</strong>
            <span>2025 Teams</span>
          </div>
        </div>
      </header>

      <main className="content-card">
        <nav className="tabs" aria-label="League history sections">
          <button className={activeTab === 'stats' ? 'active' : ''} onClick={() => setActiveTab('stats')}>
            Season Stats
          </button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
            Champions & Chumps
          </button>
          <button className={activeTab === 'playoffs' ? 'active' : ''} onClick={() => setActiveTab('playoffs')}>
            Playoff Appearances
          </button>
          <button className={activeTab === 'weekly' ? 'active' : ''} onClick={() => setActiveTab('weekly')}>
            2025 Weekly High Scorers
          </button>
          <button className={activeTab === 'payouts' ? 'active' : ''} onClick={() => setActiveTab('payouts')}>
            2026 Cost & Payouts
          </button>
          <button className={activeTab === 'hall' ? 'active' : ''} onClick={() => setActiveTab('hall')}>
            Hall of Chumps
          </button>
          <button className={activeTab === 'surprise' ? 'active' : ''} onClick={() => setActiveTab('surprise')}>
            Surprise!
          </button>
        </nav>

        {activeTab === 'stats' && (
          <section>
            <div className="section-heading section-heading--controls">
              <div>
                <p className="kicker">PLAYER HISTORY</p>
                <h2>{season === 'All-Time' ? 'All-Time Standings' : `${season} Season Stats`}</h2>
                <p>
                  {season === 'All-Time'
                    ? `Combined regular-season results for every franchise/manager across ${exclude2021 ? '2022–2025' : 'all available seasons'}. Click any column header to sort.`
                    : 'Regular-season stats shown by franchise. Betthew appears as one team; Rick and Sharon remain separate on their shared 2021 team.'}
                </p>
              </div>
              <div className="stats-controls">
                {season === 'All-Time' && (
                  <label className="year-filter">
                    <input
                      type="checkbox"
                      checked={exclude2021}
                      onChange={(event) => setExclude2021(event.target.checked)}
                    />
                    <span>Exclude 2021</span>
                  </label>
                )}
                <label className="season-picker">
                  <span>Season</span>
                  <select value={season} onChange={(event) => setSeason(event.target.value)}>
                    <option>All-Time</option>
                    {YEARS.map((year) => <option key={year}>{year}</option>)}
                  </select>
                </label>
              </div>
            </div>

            <div className="table-wrap">
              {season === 'All-Time' ? (
                <table>
                  <thead>
                    <tr>
                      <SortableHeader label="RK" sortKey="rank" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="Player" sortKey="player" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="Seasons" sortKey="seasons" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="Record" sortKey="record" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="Win %" sortKey="winPct" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="PF" sortKey="pf" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="PA" sortKey="pa" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="PF/G" sortKey="pfg" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="PA/G" sortKey="pag" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="DIFF/G" sortKey="diff" sortConfig={sortConfig} onSort={handleSort} />
                      <SortableHeader label="Teams Used" sortKey="teams" sortConfig={sortConfig} onSort={handleSort} />
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAllTimeRows.map((row) => (
                      <tr key={row.player}>
                        <td className="rank-cell">{row.rank}</td>
                        <td><strong>{row.player}</strong><small>{formatYearSpan(row.years)}</small></td>
                        <td>{row.seasons}</td>
                        <td>{formatRecord(row.w, row.l)}</td>
                        <td>{(row.winPct * 100).toFixed(1)}%</td>
                        <td>{formatNumber(row.pf)}</td>
                        <td>{formatNumber(row.pa)}</td>
                        <td>{formatNumber(row.pfg, 1)}</td>
                        <td>{formatNumber(row.pag, 1)}</td>
                        <td><StatPill tone={row.diff >= 0 ? 'good' : 'bad'}>{row.diff > 0 ? '+' : ''}{formatNumber(row.diff, 1)}</StatPill></td>
                        <td className="team-list">{row.teams.join(' · ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>RK</th>
                      <th>Player</th>
                      <th>Team</th>
                      <th>Record</th>
                      <th>PF</th>
                      <th>PA</th>
                      <th>PF/G</th>
                      <th>PA/G</th>
                      <th>DIFF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedYearRows.map((row) => (
                      <tr key={`${row.year}-${row.player}-${row.team}`}>
                        <td className="rank-cell">{row.rank}</td>
                        <td>
                          <strong>{row.player}</strong>
                          {row.coManagers.length > 0 && <small>with {row.coManagers.join(' & ')}</small>}
                        </td>
                        <td className="team-name">{row.team}</td>
                        <td>{formatRecord(row.w, row.l)}</td>
                        <td>{formatNumber(row.pf)}</td>
                        <td>{formatNumber(row.pa)}</td>
                        <td>{formatNumber(row.pfg, 1)}</td>
                        <td>{formatNumber(row.pag, 1)}</td>
                        <td><StatPill tone={row.diff >= 0 ? 'good' : 'bad'}>{row.diff > 0 ? '+' : ''}{formatNumber(row.diff, 1)}</StatPill></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <p className="data-note">
              * 2021 was a 10-team league. Beth and Matthew are listed separately for their individual 2021 teams; Betthew represents only their shared 2022–2025 seasons. Rick and Sharon remain separate players on their shared 2021 team.
            </p>
          </section>
        )}

        {activeTab === 'history' && (
          <section>
            <div className="section-heading">
              <p className="kicker">THE HARDWARE & THE SHAME</p>
              <h2>Champions & Chumps</h2>
              <p>Final placements and the last-place finisher from every recorded season.</p>
            </div>

            <div className="history-cards">
              {HISTORY.map((item) => (
                <article className="history-card" key={item.year}>
                  <div className="history-card__year">{item.year}</div>
                  <div className="history-card__winner">
                    <span className="icon">🏆</span>
                    <div><small>Champion</small><strong>{item.champion}</strong></div>
                  </div>
                  <div className="history-card__chump">
                    <span className="icon">💩</span>
                    <div><small>Chump</small><strong>{item.chump}</strong></div>
                  </div>
                  {item.note && <div className="history-card__note">{item.note}</div>}
                </article>
              ))}
            </div>

            <div className="table-wrap table-wrap--history">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>🥇 Champion</th>
                    <th>🥈 Runner-Up</th>
                    <th>🥉 Third</th>
                    <th>Fourth</th>
                    <th>💩 Chump</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((item) => (
                    <tr key={item.year}>
                      <td><strong>{item.year}</strong></td>
                      <td className="champion-cell">{item.champion}</td>
                      <td>{item.runnerUp}</td>
                      <td>{item.third}</td>
                      <td>{item.fourth}</td>
                      <td className="chump-cell">{item.chump}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'playoffs' && (
          <section>
            <div className="section-heading">
              <p className="kicker">POSTSEASON PEDIGREE</p>
              <h2>All-Time Playoff Appearances</h2>
              <p>Playoff appearances through the 2025 season, including the league's shared-team credit rules.</p>
            </div>

            <div className="playoff-grid">
              {PLAYOFFS.map((player, index) => (
                <article className="playoff-row" key={player.name}>
                  <div className="playoff-rank">{index + 1}</div>
                  <div className="playoff-person">
                    <strong>{player.name}</strong>
                    {player.note && <small>{player.note}</small>}
                  </div>
                  <div className="playoff-bar" aria-hidden="true">
                    <span style={{ width: `${(player.appearances / 4) * 100}%` }} />
                  </div>
                  <div className="playoff-count">{player.appearances}</div>
                </article>
              ))}
            </div>

            <div className="footnotes">
              <p><strong>Shared 2021 team:</strong> Rick and Sharon made the playoffs together, so each receives 0.5 of an appearance.</p>
              <p><strong>Betthew:</strong> The shared Beth + Matthew team has 2 playoff appearances from 2022–2025. Beth also has 1 separate playoff appearance from 2021; Matthew had 0 in 2021.</p>
              <p><strong>League membership:</strong> Kathy and Callie were not members of the league in 2021.</p>
            </div>
          </section>
        )}

        {activeTab === 'weekly' && (
          <section>
            <div className="section-heading">
              <p className="kicker">2025 WEEKLY BRAGGING RIGHTS</p>
              <h2>2025 Weekly High Scorers</h2>
              <p>Every regular-season weekly high scorer from Weeks 1 through 14.</p>
            </div>

            <div className="weekly-leaders">
              {WEEKLY_HIGH_SCORERS_2025
                .slice()
                .sort((a, b) => b.weeks.length - a.weeks.length || Math.min(...a.weeks) - Math.min(...b.weeks))
                .map((player) => (
                  <article className="weekly-leader-card" key={player.name}>
                    <div>
                      <span className="weekly-leader-card__label">Weekly Highs</span>
                      <strong>{player.name}</strong>
                    </div>
                    <div className="weekly-leader-card__count">{player.weeks.length}</div>
                    <p>
                      {player.weeks.length === 1 ? 'Week' : 'Weeks'} {player.weeks.join(', ')}
                    </p>
                  </article>
                ))}
            </div>

            <div className="weekly-timeline" aria-label="2025 weekly high scorers by week">
              {WEEKLY_HIGH_BY_WEEK_2025.map((item) => (
                <div className="weekly-timeline__item" key={item.week}>
                  <span>Week {item.week}</span>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'payouts' && (
          <section>
            <div className="section-heading">
              <p className="kicker">2026 LEAGUE ECONOMICS</p>
              <h2>2026 Cost & Payout Schedule</h2>
              <p>The official buy-in and prize schedule for the 2026 Chump Family Fantasy Football season.</p>
            </div>

            <div className="payout-panel">
              <div className="payout-buyin">
                <span>League Buy-In</span>
                <strong>$25</strong>
                <small>per team</small>
              </div>
              <div className="payout-grid">
                {PAYOUTS_2026.slice(1).map((item) => (
                  <article className="payout-card" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.amount}</strong>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'hall' && (
          <section>
            <div className="section-heading">
              <p className="kicker">IMMORTALIZED IN INFAMY</p>
              <h2>Hall of Chumps</h2>
              <p>Every Chump deserves to be remembered. The newest induction is always at the top.</p>
            </div>

            <div className="hall-list">
              {HALL_OF_CHUMPS.map((entry) => (
                <article className="hall-card" key={entry.year}>
                  <div className="hall-card__header">
                    <div>
                      <span className="hall-card__year">{entry.year}</span>
                      <h3>{entry.chump}</h3>
                    </div>
                    <span className="hall-card__badge">CHUMP</span>
                  </div>

                  <div className={`hall-media ${entry.media.length > 1 ? 'hall-media--two' : ''}`}>
                    {entry.media.map((media, index) => {
                      const title = `${entry.year} ${entry.chump} Hall of Chumps ${index + 1}`

                      if (media.type === 'localVideo') {
                        return (
                          <div className="hall-video-shell" key={media.src}>
                            <video controls preload="metadata" playsInline>
                              <source src={media.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )
                      }

                      if (media.type === 'image') {
                        return (
                          <div className="hall-image-shell" key={media.src}>
                            <img src={media.src} alt={media.label ?? title} loading="lazy" />
                          </div>
                        )
                      }

                      if (media.type === 'pinterest' || media.type === 'tenor') {
                        return (
                          <div className={`hall-image-shell hall-image-shell--${media.type}`} key={media.src}>
                            <iframe
                              src={media.src}
                              title={title}
                              loading="lazy"
                              allowFullScreen
                            />
                            <a href={media.href} target="_blank" rel="noreferrer">View source</a>
                          </div>
                        )
                      }

                      return (
                        <div className="hall-video-shell" key={media.src}>
                          <iframe
                            src={media.src}
                            title={title}
                            loading="lazy"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            referrerPolicy={media.type === 'vimeo' ? 'origin' : 'strict-origin-when-cross-origin'}
                            allowFullScreen
                          />
                          {media.type === 'vimeo' && media.href && (
                            <a className="hall-video-shell__fallback" href={media.href} target="_blank" rel="noreferrer">
                              Open on Vimeo
                            </a>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'surprise' && (
          <section>
            <div className="section-heading">
              <p className="kicker">ONE MORE THING...</p>
              <h2>Surprise!</h2>
              <p>A special message for the league.</p>
            </div>

            <div className="video-shell">
              <iframe
                src="https://www.youtube.com/embed/cbf64unxDmI"
                title="Chump Family Fantasy Football surprise video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </main>

      <footer>
        Chump Family Fantasy Football League · History through 2025
      </footer>
    </div>
  )
}

export default App
