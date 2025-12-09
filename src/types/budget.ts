export interface Expense {
  amount: number;
  category: string;
}

export interface TabBudget {
  name: string;
  totalBudget: number;
  expenses: Expense[];
  totalSpent: number;
  remaining: number;
  categoryBreakdown: CategoryBreakdown[];
}

export interface CategoryBreakdown {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface OverallBudget {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  tabBreakdown: {
    id: string;
    label: string;
    value: number;
    color: string;
  }[];
}

export type TabName = 'Social' | 'Recruitment' | 'Brotherhood' | 'Other' | 'Housing';

export const TAB_NAMES: TabName[] = ['Social', 'Recruitment', 'Brotherhood', 'Housing', 'Other'];

export const TAB_COLORS: Record<TabName, string> = {
  Social: '#f472b6',
  Recruitment: '#60a5fa',
  Brotherhood: '#34d399',
  Other: '#a78bfa',
  Housing: '#fbbf24',
};

