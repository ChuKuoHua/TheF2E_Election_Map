const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`
export async function getElection(name) {
  const res = await useFetch(`${baseUrl}?county=${name}`)
  return res.data.value
}

export async function getCounties() {
  const res = await useFetch(`${baseUrl}?search=counties`)
  return res
}

export async function getElectionGroups() {
  const res = await useFetch(`${baseUrl}?search=electionGroups`)
  return res.data.value
}
