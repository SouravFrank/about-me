import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackError } from '../../utils/analytics';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by React ErrorBoundary:", error, errorInfo);
    trackError(
      'React Error Boundary',
      error.message,
      error.stack || errorInfo.componentStack || undefined,
      'ErrorBoundary',
      'render_crash'
    );
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-900 text-white select-text">
          <div className="max-w-md w-full bg-gray-800 border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-4xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h1>
            <p className="text-gray-400 font-light mb-6">
              The application encountered an unexpected error. Please reload the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-md"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
