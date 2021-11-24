export class ThemeUtils {
  static originColor = window.APP_PRIMARY_COLOR || '#00b38a'
  static customFiles = {}
  static originalColors = []
  static newColors = []
  static primaryColor = ''

  static updateThemeColors (color, origin = ThemeUtils.originColor) {
    if (color !== origin) {
      if (ThemeUtils.primaryColor !== color) {
        ThemeUtils.primaryColor = color
        ThemeUtils.originalColors = ThemeUtils.buildColors(origin.replace('#', ''))
        ThemeUtils.newColors = ThemeUtils.buildColors(ThemeUtils.primaryColor.replace('#', ''))
      }
      const links = document.querySelectorAll('link[href][rel="stylesheet"]')
      links.forEach(d => {
        const url = d.getAttribute('href') // d.href
        if (d.getAttribute('data-color') !== ThemeUtils.primaryColor) {
          d.setAttribute('data-color', ThemeUtils.primaryColor)
          if (!ThemeUtils.customFiles[url]) {
            ThemeUtils.loadCSSFile(url, () => {
              ThemeUtils.updateCSSFile(url, ThemeUtils.updateColorStr(ThemeUtils.customFiles[url]))
            })
          } else {
            ThemeUtils.updateCSSFile(url, ThemeUtils.updateColorStr(ThemeUtils.customFiles[url]))
          }
        }
      })
      ThemeUtils.updateStyleTag()
    }
  }

  static buildColors (theme) {
    const colors = [theme]
    const red = parseInt(theme.slice(0, 2), 16)
    const green = parseInt(theme.slice(2, 4), 16)
    const blue = parseInt(theme.slice(4, 6), 16)
    colors.push([red, green, blue].join(','), [red, green, blue].join(', '))
    for (let i = 0; i < 9; i++) {
      colors.push(ThemeUtils.tintColor(theme, Number(((i + 1) / 10).toFixed(2))))
    }
    colors.push(ThemeUtils.shadeColor(theme, 0.1))
    return colors
  }

  static loadCSSFile (url, cb) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        ThemeUtils.customFiles[url] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        cb()
      }
    }
    xhr.open('GET', url, false)
    xhr.send()
  }

  static shadeColor (color, shade) {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
  }

  static tintColor (color, tint) {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red += Math.round(tint * (255 - red))
    green += Math.round(tint * (255 - green))
    blue += Math.round(tint * (255 - blue))

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
  }

  static updateCSSFile (url, style) {
    let styleTag = document.getElementById(url)
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.setAttribute('id', url)
      const links = document.querySelectorAll('link[href="' + url + '"]')
      links.forEach(l => {
        l.after(styleTag)
      })
      styleTag.setAttribute('data-color', ThemeUtils.primaryColor)
      styleTag.innerText = style
    } else if (styleTag.getAttribute('data-color') !== ThemeUtils.primaryColor) {
      styleTag.innerText = style
    }
  }

  static updateColorStr (styleText) {
    let newStyle = styleText
      .replace(/\n/g, '')
      .replace(/\/\*.+?\*\//g, '')
    ThemeUtils.originalColors.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), ThemeUtils.newColors[index])
    })
    return newStyle
  }

  static updateStyleTag () {
    const styles = document.querySelectorAll('style:not([data-color="' + ThemeUtils.primaryColor + '"])')
    for (const item of styles) {
      if (item.innerText) {
        item.innerText = ThemeUtils.updateColorStr(item.innerText)
      }
      item.setAttribute('data-color', ThemeUtils.primaryColor)
    }
  }
}
