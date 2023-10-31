export function setFormatter(params) {
  let msg = `
    <p class="formatTitle">
      ${params[0]?.name}
    </p>
  `

  params.forEach((item) => {
    const num = item.data.value ? item.data.value : item.data
    msg += `
    <div class="flex-between-center">
      <p>
        <i class="circle"
        style="background-color: ${item.color}"
        ></i>
        ${item.seriesName}：
      </p>
      <p>${num.toLocaleString()} 票</p>
    </div>`
  })
  return msg
}
