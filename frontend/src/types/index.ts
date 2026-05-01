export interface Products {
    id: number;
    product_name: string;
    description: string;
    price: number;
    max_price?: number;
    category: string;
    img_url: string;
    image_url?: string;   // fallback if the API returns this instead
    created_at: string;
}

export interface CartItem extends Products {
    quantity: number;
}