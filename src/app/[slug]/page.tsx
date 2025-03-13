import { Box, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import getRestaurantBySlug from "@/data/get-restaurant-by-slug";

interface RestaurantPageProps {
  params: { slug: string };
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen w-[470px] mx-auto max-w-full flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-0">
        <Image
          src="/images/logoSoup.png"
          alt={restaurant.name}
          width={170}
          height={170}
        />

        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      <div className="flex flex-col items-center gap-2 pt-5">
        <h2 className="text-3xl font-semibold">Seja Bem-vindo</h2>
        <p className="text-center text-gray-400">
          Escolha como prefere sua refeição. Estamos aqui para oferecer
          praticidade e sabor em cada detalhe
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5">
        <Card>
          <CardContent className="flex cursor-pointer flex-col items-center gap-4">
            <Box size={64} className="mt-6 text-blue-400" />
            <div className="w-40 max-w-full rounded-full bg-blue-300 p-2 text-blue-900">
              Para pegar aqui
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex cursor-pointer flex-col items-center gap-4">
            <ShoppingBag size={64} className="mt-6 text-blue-400" />
            <div className="w-40 max-w-full rounded-full bg-blue-300 p-2 text-center text-blue-900">
              Para levar
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantPage;
