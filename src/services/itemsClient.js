export const getItemsByCategory = (category) => {
    return fetch(`/api/items?category=${category}`)
        .then(res => res.json())
        .catch(err => console.error(err));
}

