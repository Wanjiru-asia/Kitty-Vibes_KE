const BASE_URL = 'http://localhost:5000/api';
export const fetchAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const fetchProduct = async (productId: string) => {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
};
export const fetchProductsById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};
export const fetchProductByCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/products/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};