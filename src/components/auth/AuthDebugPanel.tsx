import React from 'react';
import { getAuthDebugInfo } from '../../lib/debug/authDebugger';
import { authLogger } from '../../lib/debug/authLogger';
import { cn } from '../../lib/utils';

export function AuthDebugPanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [debugInfo, setDebugInfo] = React.useState(getAuthDebugInfo());
  const [logs, setLogs] = React.useState(authLogger.getLogs());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDebugInfo(getAuthDebugInfo());
      setLogs(authLogger.getLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        {isOpen ? 'Hide' : 'Show'} Auth Debug
      </button>

      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-4 overflow-y-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            {isOpen ? 'Hide' : 'Show'} Auth Debug
          </button>
          <h2 className="text-lg font-semibold mb-4">Auth Debug Panel</h2>

          <div className="space-y-4">
            <section>
              <h3 className="font-medium mb-2">Authentication State</h3>
              <div className="space-y-2">
                <StatusItem
                  label="Authenticated"
                  status={debugInfo.isAuthenticated}
                />
                <StatusItem
                  label="Firebase User"
                  status={debugInfo.hasFirebaseUser}
                />
                <StatusItem
                  label="User Data"
                  status={debugInfo.hasUserData}
                />
                <StatusItem
                  label="Data Complete"
                  status={debugInfo.userDataComplete}
                />
              </div>
            </section>

            <section>
              <h3 className="font-medium mb-2">Navigation State</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Current Path: </span>
                  {debugInfo.navigationState.currentPath}
                </div>
                <StatusItem
                  label="Protected Route"
                  status={debugInfo.navigationState.isProtectedRoute}
                />
                <StatusItem
                  label="Should Redirect"
                  status={debugInfo.navigationState.shouldRedirect}
                />
              </div>
            </section>

            <section>
              <h3 className="font-medium mb-2">Recent Logs</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={cn(
                      'text-xs p-2 rounded',
                      log.level === 'error' && 'bg-red-50 text-red-700',
                      log.level === 'warning' && 'bg-yellow-50 text-yellow-700',
                      log.level === 'info' && 'bg-blue-50 text-blue-700'
                    )}
                  >
                    <div className="font-medium">{log.message}</div>
                    {log.details && (
                      <pre className="mt-1 whitespace-pre-wrap">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span
        className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        )}
      >
        {status ? 'Yes' : 'No'}
      </span>
    </div>
  );
}