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

export { listToTree }
