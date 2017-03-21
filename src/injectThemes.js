import React, { Component, PropTypes as t } from 'react'
import Theme from './Theme'
import { getDisplayName } from './utils'

const injectThemes = (themesObj, defaultTheme) => WrappedComponent => (
  class InjectThemes extends Component {
    static displayName = `InjectThemes(${getDisplayName(WrappedComponent)})`

    static childContextTypes = {
      theme: t.object.isRequired,
    }

    constructor(props, context) {
      super(props, context)
      this.theme = new Theme(themesObj, defaultTheme)

      this.state = {
        activeTheme: defaultTheme,
      }
    }

    componentWillUpdate(nextProps, nextState) {
      this.theme.setTheme(nextState.activeTheme)
    }

    changeTheme = (theme) => {
      this.setState(() => ({
        activeTheme: theme,
      }))
    }

    getChildContext() {
      return { theme: this.theme }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          activeTheme={this.state.activeTheme}
          changeTheme={this.changeTheme}
        />
      )
    }
  }
)

export default injectThemes
