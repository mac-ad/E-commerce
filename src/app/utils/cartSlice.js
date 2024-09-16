const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.$id === newItem.$id);

      if (existingItem) {
        if (existingItem.quantity < newItem.stock) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.$id === newItem.$id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          console.log("Cannot add more, stock limit reached");
          return state;
        }
      } else {
        return {
          ...state,
          items: [...state.items, { ...newItem, quantity: 1 }],
        };
      }
    },
    removeItem: (state) => {
      state.items.pop();
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.$id === newItem.$id);

      if (existingItem) {
        if (existingItem.quantity < newItem.stock) {
          return {
            ...state,
            items: state.items.map((item) =>
              item.$id === newItem.$id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          console.log("Cannot add more, stock limit reached");
          return state;
        }
      }
    },
    decreaseItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.$id === newItem.$id);

      if (existingItem) {
        if (existingItem.quantity <= 1) {
          console.log("Cannot reduce more.");
          return state;
        } else {
          return {
            ...state,
            items: state.items.map((item) =>
              item.$id === newItem.$id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, increaseItem, decreaseItem } =
  cartSlice.actions;

export default cartSlice.reducer;
