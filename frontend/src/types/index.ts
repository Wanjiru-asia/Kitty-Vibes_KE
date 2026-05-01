export interface Products {
    id: number;
    product_name: string;
    description: string;
    price: number;
    category: string;
    img_url: string;
    created_at: string;
}

export interface CartItem extends Products {
    quantity: number;
}