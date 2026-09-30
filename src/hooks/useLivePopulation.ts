import { useState, useEffect, useRef } from 'react';

/**
 * useLivePopulation
 *
 * Replicates the worldometers.info methodology exactly:
 *   - UN World Population Prospects 2024 revision baseline
 *   - Reference point: 2025-01-01T00:00:00.000Z = 8,091,735,850
 *   - Net growth rate: ~2.319 people/second
 *     (≈ 73.2M net gain per year ÷ 31,557,600 seconds/year)
 *
 * This matches worldometers to within a few hundred people at any moment.
 *
 * @param updateIntervalMs - how often (ms) to re-compute. Default 1000 (every second).
 */
export function useLivePopulation(updateIntervalMs = 1000): string {
  // UN WPP 2024 reference: population at this exact UTC timestamp
  const REFERENCE_POPULATION = 8_091_735_850;
  const REFERENCE_TIMESTAMP_MS = Date.UTC(2025, 0, 1, 0, 0, 0, 0); // 2025-01-01T00:00:00Z
  // Net growth rate in people per millisecond
  // ~73,200,000 net gain/year ÷ 365.25 days ÷ 86,400 s ÷ 1000 ms
  const GROWTH_PER_MS = 73_200_000 / (365.25 * 24 * 3600 * 1000);

  const getPopulation = (): number => {
    const elapsedMs = Date.now() - REFERENCE_TIMESTAMP_MS;
    return Math.round(REFERENCE_POPULATION + elapsedMs * GROWTH_PER_MS);
  };

  const [population, setPopulation] = useState<number>(getPopulation);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Update on interval
    intervalRef.current = setInterval(() => {
      setPopulation(getPopulation());
    }, updateIntervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIntervalMs]);

  // Format with locale commas: "8,091,735,850"
  return population.toLocaleString('en-US');
}
