import dumbbell from "../../images/db2.PNG"
 
import React from 'react';

import { Card, CardContent } from "../../components_ui/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components_ui/ui/carousel";

// Array con las imágenes y sus textos correspondientes
const animals = [
  { name: "Foto pesa", image: dumbbell, description: "Descripcion ejemplo" },
  { name: "Press banca", image: "https://media4.giphy.com/media/NLuFwZieDxvws/100.webp?cid=790b761193svlqhi5q3te829snudwzsfk6ams3g0wwv1q8wd&ep=v1_gifs_search&rid=100.webp&ct=g", description: "Se como el ratoncito" },
  { name: "Foto 3", image: "path/to/photo3.jpg", description: "Descripcion ejemplo" },
  { name: "Foto 4", image: "path/to/photo4.jpg", description: "Descripcion ejemplo" },
  { name: "Foto 5", image: "path/to/photo5.jpg", description: "Descripcion ejemplo" },
  { name: "Foto 6", image: "path/to/photo6.jpg", description: "Descripcion ejemplo" },
];

export function Test2() {
  return (
    <div>
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {animals.map((animal, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* Nombre del animal */}
                  <span className="text-2xl font-bold mb-2">{animal.name}</span>
                  {/* Imagen del animal */}
                  <div className="relative flex items-center justify-center bg-muted">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      width="1920"
                      height="1080"
                      className="h-50 w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                  {/* Descripción debajo de la imagen */}
                  <span className="text-sm mt-2 text-center">{animal.description}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  );
}

export default Test2;
