function listToTree (arr, pId = 0, valueKey = 'value', labelKey = 'label', pIdKey = 'pId') {
  const list = arr.filter(a => a[pIdKey] === pId)
  if (list?.length) {
    for (const item of list) {
      const id = item[valueKey]
      const children = listToTree(arr, id, valueKey, labelKey, pIdKey)
      if (children?.length) {
        item.children = children
      }
    }
  }
  return list
}

function getStyle (el, name) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null)[name]
  } else {
    return el.currentStyle[name]
  }
}

export { listToTree, getStyle }
