export function setFormatter(params, type = 'base') {
  let msg = ''
  switch (type) {
    case 'base':
      msg = `
        <p class="formatTitle">
          ${params[0]?.name}
        </p>
      `

      params.forEach((item) => {
        const num = item.data.value ? item.data.value : item.data
        msg += `
        <div class="flex-between-center">
          <p>
            <i class="toolbox-icon"
            style="background-color: ${item.color}"
            ></i>
            ${item.seriesName}：
          </p>
          <p>${num.toLocaleString()} 票</p>
        </div>`
      })
      return msg
    case 'pie':
      msg = `<p>
        <i class="toolbox-icon"
          style="background-color: ${params.color}"
        ></i>
        ${params.data.society}：${params.data.name}</p>
      `
      return msg
  }
}
