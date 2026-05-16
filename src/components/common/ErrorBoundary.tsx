import { Component, type ErrorInfo, type ReactNode } from 'react';
import { withTranslation, type WithTranslation } from 'react-i18next';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-theme text-text-theme p-4 text-center">
          <div className="w-20 h-20 mb-6 text-error-theme">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-main-theme mb-2">{t('error.title')}</h2>
          <p className="text-sub-theme mb-8 max-w-sm">
            {t('error.desc')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-main-theme text-bg-theme rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-all"
          >
            {t('error.refresh')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
