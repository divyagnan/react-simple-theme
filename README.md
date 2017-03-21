# react-simple-theme

[![Build Status](https://travis-ci.org/divyagnan/react-simple-theme.svg?branch=master)](https://travis-ci.org/divyagnan/react-simple-theme)
[![npm version](https://badge.fury.io/js/react-simple-theme.svg)](https://badge.fury.io/js/react-simple-theme)

> react-simple-theme provides a simple way to add theming support to your react apps. It exposes 2 higher order components (injectThemes and withTheme) to make this possible.

## Installation

`npm install --save react-simple-theme`

## Usage

`react-simple-theme` exports two HOC's, `injectThemes` and `withTheme`. `injectThemes` is used to inject your themes into context and `withTheme` reads the active theme from context and provides it to your component as a prop.

#### `injectThemes`

To use `injectThemes` you need to first import it from `react-simple-theme` as shown below:

```js
import { injectThemes } from 'react-simple-theme'
```
Then you will need a themes object. A sample themes object is shown below:
```js
const themes = {
  defaultTheme: {
    color: 'black',
    outer: 'aliceblue',
  },
  altTheme: {
    color: 'white',
    outer: 'crimson',
  },
}
```
You will either need to colocate your themes object with your root component or you will need to import it (ex `import themes from './themes'`)

Then you can 'wrap' your root component with `injectThemes' as shown below:

```js
// injectThemes will need the themes object and the name of the 'default theme'
export default injectThemes(themes, 'defaultTheme')(RootComponent)
```
`injectThemes` provides your component with two props, `activeTheme` and `changeTheme`. `activeTheme` is a string that represents the name of your currently active theme. `changeTheme` is a function that accepts a theme name (from your themes object) and then changes the currently active theme to the theme with the name that you have provided it. For example:

```jsx
const RootComponent = props => (
  <div>
    {/* use props.activeTheme (or this.props.activeTheme is you have a class component) to get access to the name of the active theme */}
    <h1>The currently active theme is {props.activeTheme}</h1>

    {/* use props.changeTheme (or this.props.changeTheme is you have a class component) get access to a function that changes the currently active theme. it takes one argument - the name of the theme you want to make active */}
    <button onClick={() => props.changeTheme('newThemeName')}>Change Theme</button>
  </div>
)

RootComponent.propTypes = {
  activeTheme: PropTypes.string,
  changeTheme: PropTypes.func,
}
```

#### `withTheme`

To use `withTheme` you need to first import it from `react-simple-theme` as shown below:

```js
import { withTheme } from 'react-simple-theme'
```
Then you will need to 'wrap' the component that you want themed. For example:

```js
const NeedsTheme = props => <div>I need a theme!</div>

export default withTheme(NeedsTheme)
```
That will give your component access to the `theme` prop:

```js
// theme is available as a prop for your wrapped components
const NeedsTheme = ({theme}) => <div style={{background: theme.background}}>I need a theme!</div>

NeedsTheme.propTypes = {
  theme: PropTypes.shape({
    // the specifics of how your theme object is structured
  })
}

export default withTheme(NeedsTheme)
```

## API

#### `injectThemes`

`injectThemes` accepts the following arguments:
```js
  injectThemes(
    themesObject, // your theme object that contains your themes
    'defaultTheme' // the name of your default theme, this should match a theme in your theme object
  )(
    RootComponent // this is the component that you want to have as your base to inject themes into
  )
```
`injectThemes` provides your component with the following props:

* `activeTheme` - the name of the currently active theme (useful if you want to display the active theme name to the user)
```js
<div>{this.props.activeTheme}</div> // renders the name of the active theme
// or
<div>{props.activeTheme}</div>
```

* `changeTheme` - a function that takes one argument - the name of the theme you want to make active - and changes the currently active theme to that

```js
this.props.changeTheme('nameOfNewTheme')
// or 
props.changeTheme('nameOfNewTheme)
```
#### `withTheme`

`withTheme` accepts one arugument, a component that needs a theme:
```js
withTheme(ComponentThatNeedsATheme)
```

`withTheme` provides your component with one prop:

* `theme` - this is an object with the attributes from the currently active theme

For example if your theme object looked like the following:

```js
const theme = {
  theme1: {
    color: 'red'
  }
}
```
And 'theme1' was the active theme, then your `theme` prop would have the following shape:

```js
ComponentThatNeedsATheme.propTypes = {
  theme: PropTypes.shape({
    color: PropTypes.string
  })
}
```
The shape of the `theme` prop follows directly from the shape of the active theme in your themes object.
