import React from 'react'
import { Link, Redirect } from '@reach/router'

class ErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false }
  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }
  componentDidCatch(error, info) {
    console.error(error, info)
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000)
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.hasError) {
      return (
        <h1>Got error,click <Link to="/">here</Link> to go back home or wait 5s</h1>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary