import React from 'react'

export default class RootComponent extends React.Component {
  render() {
    return (
      <div>
        Hi, Im the root Component!
        <button onClick={() => this.props.changeTheme('theme2')}>Change Theme</button>
      </div>
    )
  }
}
