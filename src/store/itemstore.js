import { create } from 'zustand'

const useItemStore = create((set) => ({

    items: [

        {
            title: 'Item 1', price: 10
        }


    ],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (item) => set((state) => ({ items: state.items.filter(i => i !== item) })),

}))


export default useItemStore;