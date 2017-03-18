export default class Theme {
  constructor(themesObj, defaultTheme) {
    this.themesObj = themesObj
    this.activeTheme = this.themesObj[defaultTheme]
    // list of callbacks to execute when the theme is changed
    this.subscriptions = []
  }

  setTheme(newTheme) {
    this.activeTheme = this.themesObj[newTheme]
    // make sure all of the subscribed components get notified of theme change
    this.subscriptions.forEach(cb => cb())
  }

  subscribe(cb) {
    this.subscriptions.push(cb)
  }
}
