const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const newItemId = action.$id;
      const existingItem = state.items.find(item => item.$id === newItem.$id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 } // Increment the quantity
              : item
          )
        };
      } else {
        // If item doesn't exist, add it with quantity 1
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }]
        };
      }
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
