import React, { Component, PropTypes as t } from 'react'
import { getDisplayName } from './utils'

function withTheme(WrappedComponent) {
  return class WithTheme extends Component {
    static displayName = `InjectThemes(${getDisplayName(WrappedComponent)})`

    static contextTypes = {
      theme: t.object,
    }

    componentDidMount() {
      /* pass a callback to the subscriptions.
      this lets the themes know which components need to be updated.
      this particular callback will cause the component
      to update when the theme is changed.*/
      this.context.theme.subscribe(() => this.forceUpdate())
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          theme={this.context.theme.activeTheme}
        />
      )
    }
  }
}

export default withTheme
