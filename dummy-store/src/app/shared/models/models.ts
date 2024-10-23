export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: string;
    updatedAt: string;
    category: object;
}

export interface NewProduct {
    title?: string|null;
    price?: number|null;
    description?: string|null;
    images?: (string|null)[];
    categoryId?: number|null;
}
