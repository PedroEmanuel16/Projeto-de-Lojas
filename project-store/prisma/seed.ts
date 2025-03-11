import { PrismaClient } from "@prisma/client";
import restaurants from "../data/restaurants";
import menuCategories from "../data/menuCategories";
import products from "../data/products";
import orders from "../data/orders";
import { ordersProduct } from "../data/ordersProduct";

const prisma = new PrismaClient();

async function main() {
    const restaurant = await prisma.restaurant.create({
        data: restaurants 
    })

    const menuCategory = await prisma.menuCategories.create({
        data: menuCategories(restaurant.id)
    })

    const product = await prisma.product.createManyAndReturn({
        data: products(restaurant.id, menuCategory.id)
    })

    const order = await prisma.order.create({
        data: orders(restaurant.id)
    })

    await prisma.ordersProduct.create({
        data: ordersProduct(product[0].id, order.id)
    })
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })