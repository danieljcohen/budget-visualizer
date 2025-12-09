import type { TabName, Expense, TabBudget } from '../types/budget';
import { TAB_NAMES, TAB_COLORS } from '../types/budget';

const SPREADSHEET_ID = '1iWaBkytAtW7hrIBmCh7x_UVlLj-36BrKLDQdrVVjoGQ';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

// Color palette for categories within each tab
const CATEGORY_COLORS = [
  '#f472b6', '#fb7185', '#f87171', '#fb923c', '#fbbf24',
  '#a3e635', '#4ade80', '#34d399', '#2dd4bf', '#22d3ee',
  '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185',
];

function getColorForCategory(index: number): string {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

export async function fetchTabData(tabName: TabName): Promise<TabBudget> {
  if (!API_KEY) {
    throw new Error('Google Sheets API key is not configured. Please add VITE_GOOGLE_SHEETS_API_KEY to your .env file.');
  }

  // Fetch budget from J9 and data from C4:G (categories in C, amounts in G)
  const ranges = [
    `'${tabName}'!J9`,
    `'${tabName}'!C4:G1000`,
  ];

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?ranges=${ranges.map(r => encodeURIComponent(r)).join('&ranges=')}&key=${API_KEY}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch data: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const valueRanges = data.valueRanges || [];

  // Parse total budget from J9
  const budgetValue = valueRanges[0]?.values?.[0]?.[0];
  const totalBudget = parseFloat(String(budgetValue).replace(/[$,]/g, '')) || 0;

  // Parse expenses from C4:G (C is category at index 0, G is amount at index 4)
  const rows = valueRanges[1]?.values || [];
  const expenses: Expense[] = [];

  for (const row of rows) {
    const category = row[0]?.toString().trim();
    const amountStr = row[4]?.toString().trim();
    
    if (category && amountStr) {
      const amount = parseFloat(amountStr.replace(/[$,]/g, ''));
      if (!isNaN(amount) && amount > 0) {
        expenses.push({ category, amount });
      }
    }
  }

  // Calculate totals
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = totalBudget - totalSpent;

  // Group by category
  const categoryTotals: Record<string, number> = {};
  for (const expense of expenses) {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  }

  // Create category breakdown for pie chart
  const categoryBreakdown = Object.entries(categoryTotals)
    .map(([label, value], index) => ({
      id: label,
      label,
      value,
      color: getColorForCategory(index),
    }))
    .sort((a, b) => b.value - a.value);

  // Add remaining budget as a slice if positive
  if (remaining > 0) {
    categoryBreakdown.push({
      id: 'Remaining',
      label: 'Remaining Budget',
      value: remaining,
      color: '#374151', // gray-700
    });
  }

  return {
    name: tabName,
    totalBudget,
    expenses,
    totalSpent,
    remaining,
    categoryBreakdown,
  };
}

export async function fetchAllTabsData(): Promise<Map<TabName, TabBudget>> {
  const results = new Map<TabName, TabBudget>();
  
  const promises = TAB_NAMES.map(async (tabName) => {
    try {
      const data = await fetchTabData(tabName);
      return { tabName, data };
    } catch (error) {
      console.error(`Error fetching ${tabName}:`, error);
      return { tabName, data: null };
    }
  });

  const resolved = await Promise.all(promises);
  
  for (const { tabName, data } of resolved) {
    if (data) {
      results.set(tabName, data);
    }
  }

  return results;
}

export function calculateOverallBudget(tabsData: Map<TabName, TabBudget>) {
  let totalBudget = 0;
  let totalSpent = 0;

  const tabBreakdown: { id: string; label: string; value: number; color: string }[] = [];

  for (const [tabName, data] of tabsData) {
    totalBudget += data.totalBudget;
    totalSpent += data.totalSpent;

    if (data.totalSpent > 0) {
      tabBreakdown.push({
        id: tabName,
        label: tabName,
        value: data.totalSpent,
        color: TAB_COLORS[tabName],
      });
    }
  }

  const remaining = totalBudget - totalSpent;

  // Add remaining as a slice
  if (remaining > 0) {
    tabBreakdown.push({
      id: 'Remaining',
      label: 'Remaining Budget',
      value: remaining,
      color: '#374151',
    });
  }

  return {
    totalBudget,
    totalSpent,
    remaining,
    tabBreakdown,
  };
}

