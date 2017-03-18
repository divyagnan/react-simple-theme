import React, { PropTypes as t } from 'react'
import Inner from './Inner'

import { withTheme } from '../../src'

function Outer(props) {
  const { theme } = props
  return (
    <div
      style={{
        height: 200,
        background: theme.outer,
      }}
    >
      <span
        style={{
          color: theme.color,
        }}
      >
        Outer Div!
      </span>
      <Inner />
    </div>
  )
}

Outer.propTypes = {
  theme: t.shape({
    color: t.string,
    outer: t.string,
    inner: t.string,
  }).isRequired,
}

export default withTheme(Outer)
