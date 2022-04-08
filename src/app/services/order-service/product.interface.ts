export interface Product {
    id: number;
    name: string;
    category: number;
    price: number;
    retailPrice: number;
    stock: number;
    img: string;
}

export interface Category {
    id: number;
    title: string;
    url?: string;
}

export interface Order {
    product: Product;
    count: number;
}

export interface OrderProduct {
    id?: number;
    productId: number;
    price: number;
    retailPrice: number;
    total: number;
    amount: number;
    stock: number;
    date?: Date;
}