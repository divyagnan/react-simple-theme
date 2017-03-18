import React, { PropTypes as t } from 'react'

import { withTheme } from '../../src'

function Inner(props) {
  const { theme } = props
  return (
    <div
      style={{
        height: 200,
        backgroundColor: theme.inner,
      }}
    >
      <span
        style={{
          color: theme.color,
        }}
      >
        Inner Div!
      </span>
    </div>
  )
}

Inner.propTypes = {
  theme: t.shape({
    color: t.string,
    outer: t.string,
    inner: t.string,
  }).isRequired,
}

export default withTheme(Inner)
