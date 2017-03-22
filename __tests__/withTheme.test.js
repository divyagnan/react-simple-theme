import React from 'react'
import { shallow, mount } from 'enzyme'

import { withTheme } from '../src'
import Theme from '../src/Theme'
import ThemeNeeded from '../__fixtures__/ThemeNeeded'
import context from '../__fixtures__/context'
import themes from '../__fixtures__/themes'

describe('withTheme', () => {
  it('should allow prop passthrough', () => {
    const ThemedComponent = withTheme(ThemeNeeded)
    // pass in a custom prop to the wrapped component to see if it passes through properly
    const component = shallow(
      <ThemedComponent otherProp="prop" />,
      { context: context }
    )

    expect(component.prop('otherProp')).toBe('prop')
  })

  it('should provide the wrapped component with a theme prop', () => {
    const ThemedComponent = withTheme(ThemeNeeded)
    const component = shallow(
      <ThemedComponent />,
      { context: context }
    )

    expect(component.prop('theme')).toBeDefined()
  })

  it('should read the active theme from context', () => {
    const ThemedComponent = withTheme(ThemeNeeded)
    const component = shallow(
      <ThemedComponent />,
      { context: context }
    )

    expect(component.props().theme).toBe(context.theme.activeTheme)
  })

  it('should react to a change in active theme from context', () => {
    const ThemedComponent = withTheme(ThemeNeeded)
    const component = shallow(
      <ThemedComponent />,
      { context: context }
    )

    const newContext = {
      theme: {
        activeTheme: {
          background: 'red',
          color: 'blue'
        }
      }
    }

    component.setContext(newContext)

    expect(component.props().theme).toBe(newContext.theme.activeTheme)
  })

  it('should subscribe to theme changes on mount', () => {
    const ThemedComponent = withTheme(ThemeNeeded)
    const fullContext = new Theme(themes, 'theme1')
    const component = mount(
      <ThemedComponent />,
      { context: {theme: fullContext}}
    )

    expect(component.context().theme.subscriptions.length).toBe(1)
  })
})
