export function setFormatter(id, params) {
  let msg = `<p>${params[0]?.name}</p>`
  switch (id) {
    case 'testChart':
      params.forEach((item) => {
        msg += `<p>${item.seriesName}: ${item.data}</p>`
      })
      return msg
  }
}
