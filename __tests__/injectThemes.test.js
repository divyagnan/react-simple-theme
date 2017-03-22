import React from 'react'
import { shallow, mount } from 'enzyme'

import { injectThemes } from '../src'
import themes from '../__fixtures__/themes'
import RootComponent from '../__fixtures__/RootComponent'

describe('injectThemes', () => {
  it('passes the correct activeTheme prop', () => {
    // create wrapped component with 'theme1' set as active theme
    const RootWithThemes = injectThemes(themes, 'theme1')(RootComponent)
    const component = shallow(<RootWithThemes />)

    expect(component.props().activeTheme).toBe('theme1')
  })

  it('changeTheme prop should be defined', () => {
    const RootWithThemes = injectThemes(themes, 'theme1')(RootComponent)
    const component = shallow(<RootWithThemes />)

    expect(component.props().changeTheme).toBeDefined()
  })

  it('should allow prop passthrough', () => {
    const RootWithThemes = injectThemes(themes, 'theme1')(RootComponent)
    // pass in a custom prop to the wrapped component to see if it passes through properly
    const component = shallow(<RootWithThemes otherProp="prop" />)

    expect(component.props().otherProp).toBe('prop')
  })

  it('should be able to change the active theme state', () => {
    const RootWithThemes = injectThemes(themes, 'theme1')(RootComponent)
    const component = mount(<RootWithThemes />)
    component.find('button').simulate('click')

    expect(component.state('activeTheme')).toBe('theme2')
  })
})
