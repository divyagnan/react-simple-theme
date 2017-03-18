# react-simple-theme

[![Build Status](https://travis-ci.org/divyagnan/react-simple-theme.svg?branch=master)](https://travis-ci.org/divyagnan/react-simple-theme)
[![npm version](https://badge.fury.io/js/react-simple-theme.svg)](https://badge.fury.io/js/react-simple-theme)

react-simple-theme provides a simple way to add theming support to your react apps.

It exposes 2 higher order components to make this possible.

### API

`injectThemes`

injectThemes is a higher order component that takes three arguments:

1. A component (this is generally going to be your top most component)
2. A themes object
3. The defaul theme (take from your themes object)

For example:
``` javascript
  // example themes object
  const themes = {
    theme1: {
      color: 'black',
      outer: 'aliceblue',
    },
    theme2: {
      color: 'white',
      outer: 'crimson',
    },
  }


  class Demo extends Component {
    // you recieve two props from the HOC, activeTheme and changeTheme
    static propTypes = {
      activeTheme: t.string.isRequired, // this is the name of the active theme
      changeTheme: t.func.isRequired, // this is a fucntion that takes the name of a new theme in order to change the theme
    }

    render() {
      const { activeTheme, changeTheme } = this.props
      return (
        <div>
          {/* name of the active theme */}
          <h4>Active Theme: {activeTheme}</h4>
          {/* example changeTheme usage */}
          <button onClick={() => changeTheme('theme2')}>Set Theme 1</button>

          {/* rest of your components */}
          ...
        </div>
      )
    }
  }

  const DemoWithThemes = injectThemes(
    Demo, // The component that will be wrapped
    themes, // the themes you are passing on
    'theme1', // default theme (from the themes you are passing on)
  )
```

`withTheme`

withTheme is a higher order component that takes a component and returns it with a `theme` prop

For example:

``` javascript
  function Outer(props) {
    // access the active theme though props.theme
    const { theme } = props
    return (
      <div style={{ background: theme.outer }}>
        <span style={{ color: theme.color }}>Outer Div!</span>
      </div>
    )
  }

  // the exact shape of your theme prop will depend on the themes object that you passed in
  Outer.propTypes = {
    theme: t.shape({
      color: t.string,
      outer: t.string,
    }).isRequired,
  }

  // before you export make sure that you wrap the component
  withTheme(Outer)
```
