import {Component} from 'react';

export default class MyErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {hasError: true, error};
  }
  componentDidCatch(error, errorInfo) {
    // A custom error logging function
    logError(error, errorInfo);
  }
  render() {
    return this.state.hasError ? this.state.error : this.props.children;
  }
}
