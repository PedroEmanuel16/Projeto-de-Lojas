import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Criando um restaurante
    const restaurant = await prisma.restaurant.create({
        data: {
            name: "Sabões da Terra",
            slug: "saboes-da-terra",
            description: "A melhor loja de sabões naturais.",
            avatarImageUrl: "https://picsum.photos/200",
            coverImageUrl: "https://picsum.photos/900",
        }
    });

    // Criando uma categoria de menu
    const menuCategory = await prisma.menuCategory.create({
        data: {
            name: "Sabões Líquidos",
            restaurantId: restaurant.id,
        }
    });

    // Criando produtos
    const products = [
        {
            name: "Sabão Líquido para Roupas",
            description: "Sabão líquido eficaz para lavagem de roupas.",
            price: 19.99,
            imageUrl: "https://picsum.photos/200",
            ingredients: ["Água", "Sodium Lauryl Sulfate", "Fragrância"],
            menuCategoryId: menuCategory.id,
            restaurantId: restaurant.id,
        },
        {
            name: "Sabão Sólido para Mãos",
            description: "Sabão sólido natural para as mãos.",
            price: 9.99,
            imageUrl: "https://picsum.photos/200",
            ingredients: ["Óleo de Coco", "Água", "Soda Cáustica"],
            menuCategoryId: menuCategory.id,
            restaurantId: restaurant.id,
        }
    ];

    // Criando múltiplos produtos
    await prisma.product.createMany({
        data: products
    });

    // Criando um pedido
    const order = await prisma.order.create({
        data: {
            total: 29.98,
            status: "PENDING",
            consumptionMethod: "DELIVERY",
            restaurantId: restaurant.id,
        }
    });

    // Relacionando produtos ao pedido
    const product = await prisma.product.findFirst({
        where: { restaurantId: restaurant.id }
    });

    await prisma.orderProduct.create({
        data: {
            productId: product!.id,
            orderId: order.id,
            quantity: 1,
            price: 19.99
        }
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
