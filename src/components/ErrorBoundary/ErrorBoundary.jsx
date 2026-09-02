import React from 'react';
import { withTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    // Class component: el copy llega por withTranslation, no por useTranslation.
    const { t, fallbackMessage, children } = this.props;

    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-[rgb(var(--background-end-rgb))] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="glass-effect rounded-2xl p-8 shadow-xl border border-neutral-700/50">
              <FaExclamationTriangle className="text-primary-500 text-6xl mx-auto mb-6" />

              <h1 className="text-2xl font-bold text-neutral-50 mb-4">
                {t('common.error_title')}
              </h1>

              <p className="text-neutral-300 mb-6">
                {fallbackMessage || t('common.error_page')}
              </p>

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <FaRedo className="text-sm" />
                  {t('common.retry')}
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium py-3 px-4 rounded-xl transition-colors"
                >
                  {t('common.reload')}
                </button>
              </div>

              {/* Show error details in development */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-neutral-400 cursor-pointer hover:text-neutral-300">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-3 p-4 bg-neutral-950 rounded text-xs text-primary-300 overflow-auto max-h-40">
                    <div className="font-bold mb-2">Error:</div>
                    <div className="mb-4">{this.state.error.toString()}</div>

                    <div className="font-bold mb-2">Stack Trace:</div>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

const TranslatedErrorBoundary = withTranslation()(ErrorBoundary);

export default TranslatedErrorBoundary;
