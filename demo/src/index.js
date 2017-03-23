/* eslint-disable react/prefer-stateless-function, import/no-extraneous-dependencies */
import React, { Component, PropTypes as t } from 'react'
import { render } from 'react-dom'

import { injectThemes } from '../../src'
import Outer from './Outer'
import themes from './themes'

class Demo extends Component {
  static propTypes = {
    activeTheme: t.string.isRequired,
    changeTheme: t.func.isRequired,
  }

  render() {
    const { activeTheme, changeTheme } = this.props
    return (
      <div>
        <h1>react-simple-theme demo</h1>
        <h4>Active Theme: {activeTheme}</h4>
        <button onClick={() => changeTheme('theme1')}>Set Theme 1</button>
        <button onClick={() => changeTheme('theme2')}>Set Theme 2</button>
        <button onClick={() => changeTheme('theme3')}>Set Theme 3</button>
        <Outer />
        <p>The contents of the themes</p>
        <pre id="json">
          {JSON.stringify(themes, null, 2)}
        </pre>
      </div>
    )
  }
}

const DemoWithThemes = injectThemes(themes, 'theme1')(Demo)

render(<DemoWithThemes />, document.querySelector('#demo'))
