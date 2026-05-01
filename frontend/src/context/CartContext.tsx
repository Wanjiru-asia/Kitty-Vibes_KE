import {createContext, useContext, useReducer, type ReactNode} from "react";
import type {CartItem, Products} from "../types";
import * as React from "react";

interface CartState{
    items: CartItem[];
    isOpen: boolean;
}
type CartAction =
    |{type: 'ADD_ITEM', payload: Products}
    |{type: 'REMOVE_ITEM', payload: number}
    |{type: 'DECREASE_QUANTITY', payload: number}
    |{type: 'TOGGLE_CART'}
    |{type: 'CLOSE_CART'}

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case 'DECREASE_QUANTITY': {
            const existing = state.items.find((i) => i.id === action.payload);
            if (existing && existing.quantity > 1) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
                    ),
                };
            }
            // If quantity is 1, remove it entirely
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload),
            };
        }
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen };
        case 'CLOSE_CART':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be inside CartProvider');
    return ctx;
};