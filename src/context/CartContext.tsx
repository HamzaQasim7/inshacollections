"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { CartItem, Product, ProductColor } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number; selectedColor: ProductColor; selectedSize: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; selectedColor: string; selectedSize: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; selectedColor: string; selectedSize: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number, selectedColor: ProductColor, selectedSize: string) => void;
  removeItem: (productId: string, selectedColor: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedColor: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, selectedColor, selectedSize } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === selectedColor.name &&
          item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
        return { ...state, items: newItems };
      }

      return {
        ...state,
        items: [...state.items, { product, quantity, selectedColor, selectedSize }],
      };
    }

    case "REMOVE_ITEM": {
      const { productId, selectedColor, selectedSize } = action.payload;
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor.name === selectedColor &&
              item.selectedSize === selectedSize
            )
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, selectedColor, selectedSize, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor.name === selectedColor &&
                item.selectedSize === selectedSize
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId &&
          item.selectedColor.name === selectedColor &&
          item.selectedSize === selectedSize
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "SET_CART_OPEN":
      return { ...state, isOpen: action.payload };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("mala-cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: "HYDRATE", payload: parsedCart });
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
        }
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined" && state.items.length >= 0) {
      localStorage.setItem("mala-cart", JSON.stringify(state.items));
    }
  }, [state.items]);

  const addItem = (product: Product, quantity: number, selectedColor: ProductColor, selectedSize: string) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, selectedColor, selectedSize } });
  };

  const removeItem = (productId: string, selectedColor: string, selectedSize: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, selectedColor, selectedSize } });
  };

  const updateQuantity = (productId: string, selectedColor: string, selectedSize: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, selectedColor, selectedSize, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const setCartOpen = (isOpen: boolean) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen });
  };

  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
