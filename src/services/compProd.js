
export const getComputers = () => {
  return fetch('/api/items')
    .then(res => res.json())
    .catch(err => console.error(err));
}

