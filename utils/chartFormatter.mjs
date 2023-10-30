export function setFormatter(id, params) {
  let msg = `
    <p class="mb-3">
      ${params[0]?.name}
    </p>
  `
  switch (id) {
    case 'baseChart':
      params.forEach((item) => {
        const num = item.data.value ? item.data.value : item.data
        msg += `
        <div class="flex justify-between">
          <p>${item.seriesName}：</p>
          <p>${num.toLocaleString()} 票</p>
        </div>`
      })
      break
    default:
      break
  }
  return msg
}
