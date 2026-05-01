import { useState, useEffect } from "react";
import type {Products } from '../types';
import { fetchAllProducts } from "../api/api";

const useProducts = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch  {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        void getProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;