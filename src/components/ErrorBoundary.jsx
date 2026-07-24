import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f4] px-4 text-center">
          <h1 className="font-serif text-[48px] font-bold text-[#0d2545] mb-2">500</h1>
          <h2 className="text-[20px] font-semibold text-[#0d2545] mb-3">Something went wrong</h2>
          <p className="text-[#5c6478] text-[14px] max-w-[400px] mb-8">
            An unexpected error occurred. Please refresh the page or return home.
          </p>
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
