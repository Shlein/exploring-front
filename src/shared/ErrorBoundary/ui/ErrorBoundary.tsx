import { ErrorInfo, Suspense, Component } from 'react';
import { PageError } from 'widgets/PageError';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }
  
  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        // <Suspense fallback="">
          <PageError />
        // </Suspense>
      );
    }

    return children;
  }
}
