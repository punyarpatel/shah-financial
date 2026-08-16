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

    // Handle deployment chunk load errors (new deployment pushed while tab was open)
    const isChunkError = error?.toString().includes('Failed to fetch dynamically imported module') ||
                         error?.toString().includes('Importing a module script failed');
    
    if (isChunkError) {
      const chunkFailed = sessionStorage.getItem('chunk_failed_reload');
      if (!chunkFailed) {
        sessionStorage.setItem('chunk_failed_reload', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8f4] px-4 text-center py-10">
          <h1 className="font-serif text-[48px] font-bold text-[#0d2545] mb-2">500</h1>
          <h2 className="text-[20px] font-semibold text-[#0d2545] mb-3">Updating Website Version</h2>
          <p className="text-[#5c6478] text-[14px] max-w-[400px] mb-6">
            A new version of Drishti Wealth has just been published. Click below to load the latest version.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('chunk_failed_reload');
              window.location.reload();
            }}
            className="bg-[#c9922a] text-white px-6 py-3 rounded-[8px] font-medium text-[14px] hover:bg-[#b07f21] transition-colors cursor-pointer"
          >
            Refresh to Load Latest Version
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
