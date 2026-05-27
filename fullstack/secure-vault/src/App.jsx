import React from 'react';
import { ExplorerProvider } from './context/ExplorerContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ExplorerProvider>
      <div className="min-h-screen bg-[#0B0F17] text-[#E2E8F0] antialiased">
        <AppRoutes />
      </div>
    </ExplorerProvider>
  );
}

export default App;