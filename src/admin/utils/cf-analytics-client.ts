/**
 * Cloudflare GraphQL Analytics client
 * Fetches zone traffic and RUM Web Vitals from the Cloudflare Analytics API.
 * Docs: https://developers.cloudflare.com/analytics/graphql-api/
 */

import type { DailyTraffic, WebVitalsResult } from '../types/admin-types';

const CF_GRAPHQL_ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';

// ── GraphQL queries ───────────────────────────────────────────────────────────

const TRAFFIC_QUERY = `
  query ZoneTraffic($zoneTag: String!, $since: Date!, $until: Date!) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        httpRequests1dGroups(
          limit: 7
          filter: { date_geq: $since, date_leq: $until }
          orderBy: [date_ASC]
        ) {
          dimensions { date }
          sum { pageViews }
          uniq { uniques }
        }
      }
    }
  }
`;

const VITALS_QUERY = `
  query ZoneVitals($zoneTag: String!, $since: Date!) {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        rumPerformanceEventsAdaptiveGroups(
          limit: 1
          filter: { date_geq: $since }
        ) {
          count
          avg {
            lcpMs
            inpMs
            cls
          }
        }
      }
    }
  }
`;

// ── Low-level fetch ───────────────────────────────────────────────────────────

interface GqlResponse {
  data?: unknown;
  errors?: Array<{ message: string }>;
}

async function gqlFetch(
  token: string,
  query: string,
  variables: Record<string, string>,
): Promise<unknown> {
  const res = await fetch(CF_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}${text ? ': ' + text.slice(0, 200) : ''}`);
  }

  const json = (await res.json()) as GqlResponse;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  return json.data;
}

// ── Date helpers ──────────────────────────────────────────────────────────────

function getLast7Days(): { since: string; until: string } {
  const until = new Date();
  const since = new Date(until);
  since.setDate(since.getDate() - 7);
  return {
    since: since.toISOString().slice(0, 10),
    until: until.toISOString().slice(0, 10),
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

interface TrafficRawGroup {
  dimensions: { date: string };
  sum: { pageViews: number };
  uniq: { uniques: number };
}

interface TrafficRawData {
  viewer: { zones: Array<{ httpRequests1dGroups: TrafficRawGroup[] }> };
}

export async function fetchDailyTraffic(
  token: string,
  zoneId: string,
): Promise<DailyTraffic[]> {
  const { since, until } = getLast7Days();
  const data = (await gqlFetch(token, TRAFFIC_QUERY, {
    zoneTag: zoneId,
    since,
    until,
  })) as TrafficRawData;

  const groups = data?.viewer?.zones?.[0]?.httpRequests1dGroups ?? [];
  return groups.map((g) => ({
    date: g.dimensions.date,
    pageViews: g.sum.pageViews,
    uniques: g.uniq.uniques,
  }));
}

interface VitalsRawGroup {
  count: number;
  avg: {
    lcpMs: number | null;
    inpMs: number | null;
    cls: number | null;
  };
}

interface VitalsRawData {
  viewer: { zones: Array<{ rumPerformanceEventsAdaptiveGroups: VitalsRawGroup[] }> };
}

/**
 * Fetches RUM Web Vitals averages for the last 7 days.
 * Returns null if the dataset is unavailable or has no data.
 * Errors are swallowed intentionally — callers should treat null as "unavailable".
 */
export async function fetchWebVitals(
  token: string,
  zoneId: string,
): Promise<WebVitalsResult | null> {
  const { since } = getLast7Days();
  try {
    const data = (await gqlFetch(token, VITALS_QUERY, {
      zoneTag: zoneId,
      since,
    })) as VitalsRawData;

    const groups = data?.viewer?.zones?.[0]?.rumPerformanceEventsAdaptiveGroups ?? [];
    if (groups.length === 0 || groups[0].count === 0) return null;

    const { avg, count } = groups[0];
    return {
      lcpMs: avg.lcpMs ?? null,
      inpMs: avg.inpMs ?? null,
      cls: avg.cls ?? null,
      count,
    };
  } catch {
    // RUM dataset may not be available on all plans or zone configs
    return null;
  }
}
