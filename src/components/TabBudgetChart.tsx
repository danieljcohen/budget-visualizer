import { ResponsivePie } from '@nivo/pie';
import type { TabBudget, TabName } from '../types/budget';
import { TAB_COLORS } from '../types/budget';

interface TabBudgetChartProps {
  data: TabBudget;
}

export function TabBudgetChart({ data }: TabBudgetChartProps) {
  const percentSpent = data.totalBudget > 0 
    ? ((data.totalSpent / data.totalBudget) * 100).toFixed(1)
    : '0';

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const tabColor = TAB_COLORS[data.name as TabName];

  return (
    <div className="bg-gradient-to-br from-navy-800/80 to-navy-900/80 backdrop-blur-sm rounded-3xl p-8 border border-navy-700/50 shadow-2xl">
      {/* Header with tab color accent */}
      <div className="text-center mb-8">
        <div 
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-4"
          style={{ backgroundColor: `${tabColor}20` }}
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: tabColor }}
          />
          <span 
            className="font-medium"
            style={{ color: tabColor }}
          >
            {data.name}
          </span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          {data.name} Budget Breakdown
        </h2>
        <p className="text-navy-300">
          Category-wise spending analysis
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Budget</p>
          <p className="text-xl font-bold text-white">{formatCurrency(data.totalBudget)}</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Spent</p>
          <p 
            className="text-xl font-bold"
            style={{ color: tabColor }}
          >
            {formatCurrency(data.totalSpent)}
          </p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Remaining</p>
          <p className={`text-xl font-bold ${data.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(data.remaining)}
          </p>
        </div>
      </div>

      {/* Pie chart */}
      <div className="h-[400px] relative">
        {data.categoryBreakdown.length > 0 ? (
          <ResponsivePie
            data={data.categoryBreakdown}
            margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
            innerRadius={0.55}
            padAngle={2}
            cornerRadius={6}
            activeOuterRadiusOffset={10}
            colors={{ datum: 'data.color' }}
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
            arcLinkLabelsSkipAngle={12}
            arcLinkLabelsTextColor="#94a3b8"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={15}
            arcLabelsTextColor="#ffffff"
            motionConfig="gentle"
            transitionMode="pushIn"
            tooltip={({ datum }) => (
              <div className="bg-navy-800 px-4 py-3 rounded-lg shadow-xl border border-navy-600">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: datum.color }}
                  />
                  <span className="font-medium text-white">{datum.label}</span>
                </div>
                <p className="text-gold-400 font-bold">
                  {formatCurrency(datum.value)}
                </p>
                <p className="text-navy-400 text-sm">
                  {((datum.value / data.totalBudget) * 100).toFixed(1)}% of budget
                </p>
              </div>
            )}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-navy-400">No expenses recorded</p>
          </div>
        )}

        {/* Center text */}
        {data.categoryBreakdown.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{percentSpent}%</p>
              <p className="text-navy-400 text-sm">utilized</p>
            </div>
          </div>
        )}
      </div>

      {/* Category breakdown list */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-navy-400 mb-4 uppercase tracking-wider">
          Spending by Category
        </h3>
        <div className="grid gap-2">
          {data.categoryBreakdown
            .filter(item => item.id !== 'Remaining')
            .map((item, index) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-800/30 border border-navy-700/20"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-white">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-white">
                    {formatCurrency(item.value)}
                  </span>
                  <span className="text-navy-400 text-sm ml-2">
                    ({((item.value / data.totalBudget) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

