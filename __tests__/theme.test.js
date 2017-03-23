import Theme from '../src/Theme'
import themes from '../__fixtures__/themes'

describe('Theme', () => {
  it('initializes with a themes object', () => {
    const theme = new Theme(themes, 'theme1')

    expect(theme.themesObj).toBe(themes)
  })

  it('initializes with a default theme', () => {
    const theme = new Theme(themes, 'theme1')

    expect(theme.activeTheme).toBe(themes.theme1)
  })

  it('calling subscribe adds a subscription', () => {
    const theme = new Theme(themes, 'theme1')
    theme.subscribe(() => 2 + 2)

    expect(theme.subscriptions.length).toBe(1)
  })

  it('calling setTheme sets a new active theme', () => {
    const theme = new Theme(themes, 'theme1')
    theme.setTheme('theme2')

    expect(theme.activeTheme).toBe(themes.theme2)
  })

  it('calling setTheme triggers the subscriptions callbacks', () => {
    // variable that will be affected by the callback
    let sum = 0
    const theme = new Theme(themes, 'theme1')
    // subscription callback increments the sum
    /* eslint-disable no-plusplus */
    theme.subscribe(() => sum++)
    // calling setTheme should trigger the callback to increment the sum
    theme.setTheme('theme2')
    expect(sum).toBe(1)
  })
})
