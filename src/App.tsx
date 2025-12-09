import { useState } from 'react';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { OverallBudgetChart } from './components/OverallBudgetChart';
import { TabBudgetChart } from './components/TabBudgetChart';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import type { TabName } from './types/budget';

function App() {
  const [activeTab, setActiveTab] = useState<TabName | 'overview'>('overview');
  const { tabsData, overallBudget, loading, error, refetch } = useGoogleSheets();

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Header />
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorDisplay message={error} onRetry={refetch} />
            ) : activeTab === 'overview' ? (
              overallBudget && <OverallBudgetChart data={overallBudget} />
            ) : (
              tabsData.get(activeTab) && (
                <TabBudgetChart data={tabsData.get(activeTab)!} />
              )
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-navy-800 py-8 text-center">
          <p className="text-navy-500 text-sm">
            Sigma Chi Beta Lambda • Budget Tracker • 2025-26
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
