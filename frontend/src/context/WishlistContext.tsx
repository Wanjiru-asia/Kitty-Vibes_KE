/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, type ReactNode } from "react";
import type { Products } from "../types";

interface WishlistState {
    items: Products[];
    isOpen: boolean;
}

type WishlistAction =
    | { type: 'ADD_TO_WISHLIST'; payload: Products }
    | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
    | { type: 'TOGGLE_WISHLIST' }
    | { type: 'CLOSE_WISHLIST' };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            if (state.items.find(item => item.id === action.payload.id)) return state;
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_FROM_WISHLIST':
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        case 'TOGGLE_WISHLIST':
            return { ...state, isOpen: !state.isOpen };
        case 'CLOSE_WISHLIST':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export const WishlistContext = createContext<{
    state: WishlistState;
    dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(wishlistReducer, { items: [], isOpen: false });
    return (
        <WishlistContext.Provider value={{ state, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};