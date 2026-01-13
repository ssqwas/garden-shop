export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    description?: string;
    categoryId?: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
}

const BASE_URL = "/api";

export const api = {
    async getCategories(): Promise<Category[]> {
        const res = await fetch(`${BASE_URL}/categories/all`);
        const data = await res.json();
        return data.map((item: any) => ({
            id: String(item.id),
            name: item.title,
            image: `${BASE_URL}${item.image}`,
        }));
    },

    async getProducts(): Promise<Product[]> {
        const res = await fetch(`${BASE_URL}/products/all`);
        const data = await res.json();
        return data.map((item: any) => transformProduct(item));
    },

    async getProduct(id: string): Promise<Product | null> {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
            return transformProduct(data[0]);
        }
        return null;
    },

    async getCategoryProducts(categoryId: string): Promise<{ category: Category; products: Product[] } | null> {
        const res = await fetch(`${BASE_URL}/categories/${categoryId}`);
        const data = await res.json();

        if (data.status === 'ERR') return null;

        return {
            category: {
                id: String(data.category.id),
                name: data.category.title,
                image: `${BASE_URL}${data.category.image}`,
            },
            products: data.data.map((item: any) => transformProduct(item)),
        };
    },

    async sendOrder(orderData: any): Promise<void> {
        await fetch(`${BASE_URL}/order/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
    }
};

function transformProduct(item: any): Product {
    const price = item.discont_price || item.price;
    const originalPrice = item.discont_price ? item.price : undefined;
    const discount = item.discont_price
        ? Math.round(((item.price - item.discont_price) / item.price) * 100)
        : undefined;

    return {
        id: String(item.id),
        name: item.title,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        image: `${BASE_URL}${item.image}`,
        description: item.description,
        categoryId: String(item.categoryId),
    };
}
