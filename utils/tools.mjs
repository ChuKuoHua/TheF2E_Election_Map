/**
 * 移除千分位符號改為數字
 *
 * @param {string | number} num
 * @returns Number
 */
export function removeComma(num) {
  let val = num
  if (typeof num === 'number') {
    val = num + ''
  }
  return Number(val.replace(/,/g, ''))
}

/**
 * 小數切割，用來處理小數前後的字體大小
 *
 * @param {string | number} num
 * @returns Array
 */
export function sliceRateDecimal(num) {
  let val = num
  if (typeof num === 'number') {
    val = num + ''
  }
  return val.split('.')
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
 * 運算投票率
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

/**
 * 票數轉換為中文
 *
 * @param {number | string} num
 * @returns string
 */
export function numberToChinese(num) {
  // 判斷是否為千分位，如果是就轉換為數字
  const reg = /^\d{1,3}(,\d{3})*$/
  let val = num
  if (reg.test(val)) {
    val = removeComma(num)
  }

  if (val < 10000) {
    return val.toLocaleString()
  } else {
    const wan = Math.floor(val / 10000)
    const remainder = val % 10000
    let result = wan + '萬'
    if (remainder > 0) {
      result += ' ' + remainder.toLocaleString()
    }
    return result
  }
}

/**
 * 小數切割，用來處理小數前後的字體大小
 *
 * @param {string} val
 * @returns Array
 */
export function sliceChineseNumber(val) {
  return val.split('萬')
}
