/**
 * 移除千分位符號改為數字
 *
 * @param {string} str
 * @returns Number
 */
export function removeComma(str) {
  return Number(str.replace(/,/g, ''))
}

/**
 * 移除千分位符號改為數字
 *
 * @param {string | number} val
 * @returns number
 */
export function sliceDecimalPoint(val) {
  let v = val
  if (typeof val === 'number') {
    v = val + ''
  }
  return v.split('.')
}

/**
 * 算投票總數
 *
 * @param {Object} obj
 * @returns number
 */
export function totalHandle(obj) {
  // 算投票總數
  const total = Object.values(obj).reduce((num, next) => (num += removeComma(next)), 0)
  return total
}

/**
 * 列出陣列的前幾個項目，未指定個數時代表只列第一項
 *
 * @param {Object} obj
 * @param {string | number} num
 * @returns number
 */
export function rateHandle(obj, num) {
  // 算投票總數
  const total = Object.values(obj).reduce((num, next) => (num += removeComma(next)), 0)
  // 判斷是否為千分位，如果是就轉換為數字
  const reg = /^\d{1,3}(,\d{3})*$/
  let number = num
  if (reg.test(number)) {
    number = removeComma(num)
  }

  const result = ((number / total) * 100).toFixed(2)
  return result
}
