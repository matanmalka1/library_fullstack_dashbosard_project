import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error) {
  //   return { hasError: true ,error};
  // }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
          <div className="max-w-lg text-center space-y-4">
            <p className="uppercase tracking-[0.2em] text-xs text-slate-400">
              Something went wrong
            </p>
            <h1 className="text-3xl font-semibold">
              The page hit an unexpected error.
            </h1>
            <p className="text-slate-300">
              Try reloading the page. If the problem persists, contact support.
            </p>
            <button
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300 transition"
              onClick={this.handleReload}
              type="button"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
