import React, { ErrorInfo } from 'react';

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1 className="d-flex justify-content-end m-3">Ooops, something went wrong...</h1>;
    }

    const { children } = this.props;
    return children;
  }
}
