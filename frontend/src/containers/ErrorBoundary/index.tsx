import React, { ErrorInfo, ReactNode } from 'react';
import { connect } from 'react-redux';
import { IErrorBoundaryFormat } from 'common/models/error/IErrorBoundaryFormat';
import { setErrorRoutine } from 'routines/error';
import { IAppState } from 'common/models/store';

interface IProps {
  error?: Error;
  setError: ({ error, errorInfo }: IErrorBoundaryFormat) => void;
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { setError } = this.props;
    setError({ error, errorInfo });
  }

  render() {
    const { error } = this.props;
    if (error) {
      return <h1 className="d-flex justify-content-end m-3">Ooops, something went wrong...</h1>;
    }

    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = (state: IAppState) => ({
  error: state.errorBoundary.error
});

const mapDispatchToProps = {
  setError: setErrorRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
