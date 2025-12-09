import { ResponsivePie } from '@nivo/pie';
import type { OverallBudget } from '../types/budget';

interface OverallBudgetChartProps {
  data: OverallBudget;
}

export function OverallBudgetChart({ data }: OverallBudgetChartProps) {
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

  return (
    <div className="bg-gradient-to-br from-navy-800/80 to-navy-900/80 backdrop-blur-sm rounded-3xl p-8 border border-navy-700/50 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Overall Budget Overview
        </h2>
        <p className="text-navy-300">
          Combined spending across all categories
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Total Budget</p>
          <p className="text-2xl font-bold text-white">{formatCurrency(data.totalBudget)}</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-gold-400">{formatCurrency(data.totalSpent)}</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-navy-800/50 border border-navy-700/30">
          <p className="text-sm text-navy-400 mb-1">Remaining</p>
          <p className={`text-2xl font-bold ${data.remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatCurrency(data.remaining)}
          </p>
        </div>
      </div>

      {/* Pie chart */}
      <div className="h-[400px] relative">
        <ResponsivePie
          data={data.tabBreakdown}
          margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
          innerRadius={0.6}
          padAngle={2}
          cornerRadius={8}
          activeOuterRadiusOffset={12}
          colors={{ datum: 'data.color' }}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#94a3b8"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#ffffff"
          motionConfig="gentle"
          transitionMode="pushIn"
          tooltip={({ datum }) => (
            <div className="bg-navy-800 px-4 py-2 rounded-lg shadow-xl border border-navy-600">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: datum.color }}
                />
                <span className="font-medium text-white">{datum.label}</span>
              </div>
              <p className="text-gold-400 font-bold mt-1">
                {formatCurrency(datum.value)}
              </p>
              <p className="text-navy-400 text-sm">
                {((datum.value / data.totalBudget) * 100).toFixed(1)}% of budget
              </p>
            </div>
          )}
        />

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{percentSpent}%</p>
            <p className="text-navy-400 text-sm">spent</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {data.tabBreakdown.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-navy-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

