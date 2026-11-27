import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART
} from './actions';

const initialState = {
  items: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const clip = action.payload;
      const existingItem = state.items.find((item) => item.id === clip.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === clip.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { ...clip, quantity: 1 }]
      };
    }

    case INCREMENT_QUANTITY: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    case DECREMENT_QUANTITY: {
      const id = action.payload;
      const target = state.items.find((item) => item.id === id);

      if (!target) {
        return state;
      }

      if (target.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id)
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      };
    }

    case REMOVE_FROM_CART: {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id)
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
