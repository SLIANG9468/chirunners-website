/**
 * Hub + topic routes for the Chicago Marathon visitors section.
 * Participating-teams pages are archived per year (teams2025, teams2026, …) so each
 * year's roster stays intact instead of being overwritten by the next year's page.
 */
export const CHICAGO_MARATHON_ROUTES = {
  hub: '/chicagomarathon',
  carbLoading: '/chicagomarathon/carb-loading-dinner',
  hotel: '/chicagomarathon/hotel',
  transportation: '/chicagomarathon/transportation',
  volunteer: '/chicagomarathon/volunteer',
  photography: '/chicagomarathon/photography',
  teams2025: '/chicagomarathon/teams_2025',
  teams2026: '/chicagomarathon/teams_2026',
  tickets: '/chicagomarathon/tickets',
  sharingSessions: '/chicagomarathon/zoom',
}
