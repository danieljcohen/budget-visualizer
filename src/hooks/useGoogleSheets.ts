import { useState, useEffect, useCallback } from 'react';
import type { TabName, TabBudget, OverallBudget } from '../types/budget';
import { fetchAllTabsData, calculateOverallBudget } from '../lib/sheetsApi';

interface UseGoogleSheetsResult {
  tabsData: Map<TabName, TabBudget>;
  overallBudget: OverallBudget | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGoogleSheets(): UseGoogleSheetsResult {
  const [tabsData, setTabsData] = useState<Map<TabName, TabBudget>>(new Map());
  const [overallBudget, setOverallBudget] = useState<OverallBudget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchAllTabsData();
      setTabsData(data);

      const overall = calculateOverallBudget(data);
      setOverallBudget(overall);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    tabsData,
    overallBudget,
    loading,
    error,
    refetch: fetchData,
  };
}

