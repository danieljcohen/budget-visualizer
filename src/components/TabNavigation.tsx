import type { TabName } from '../types/budget';
import { TAB_NAMES, TAB_COLORS } from '../types/budget';

interface TabNavigationProps {
  activeTab: TabName | 'overview';
  onTabChange: (tab: TabName | 'overview') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2">
          {/* Overview tab */}
          <button
            onClick={() => onTabChange('overview')}
            className={`
              relative px-6 py-3 rounded-xl font-sans font-medium text-sm
              transition-all duration-300 ease-out
              ${activeTab === 'overview'
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-lg shadow-gold-500/25 scale-105'
                : 'bg-navy-800/50 text-navy-300 hover:bg-navy-700/50 hover:text-white border border-navy-700/50'
              }
            `}
          >
            <span className="relative z-10">Overview</span>
            {activeTab === 'overview' && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 animate-pulse" />
            )}
          </button>

          {/* Divider */}
          <div className="hidden sm:flex items-center px-2">
            <div className="w-px h-8 bg-navy-700" />
          </div>

          {/* Tab buttons */}
          {TAB_NAMES.map((tab) => {
            const isActive = activeTab === tab;
            const color = TAB_COLORS[tab];

            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  relative px-5 py-3 rounded-xl font-sans font-medium text-sm
                  transition-all duration-300 ease-out
                  ${isActive
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-navy-800/50 text-navy-300 hover:bg-navy-700/50 hover:text-white border border-navy-700/50'
                  }
                `}
                style={isActive ? {
                  backgroundColor: color,
                  boxShadow: `0 10px 25px -5px ${color}40`,
                } : undefined}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {tab}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

