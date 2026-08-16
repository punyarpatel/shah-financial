import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f4] px-4 text-center py-10">
          <h1 className="font-serif text-[48px] font-bold text-[#0d2545] mb-2">500</h1>
          <h2 className="text-[20px] font-semibold text-[#0d2545] mb-3">Something went wrong</h2>
          <p className="text-[#5c6478] text-[14px] max-w-[400px] mb-4">
            An unexpected error occurred. Please refresh the page or return home.
          </p>
          {this.state.error && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-[12px] p-3 rounded-md text-left font-mono max-w-md overflow-x-auto mb-6">
              <strong>Error:</strong> {this.state.error.toString()}
            </div>
          )}
          <a
            href="/"
            className="bg-[#c9922a] text-white px-6 py-3 rounded-[8px] font-medium text-[14px] hover:bg-[#b07f21] transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
