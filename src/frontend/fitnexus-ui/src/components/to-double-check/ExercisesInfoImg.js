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


export function ExercisesInfoImg ({exercise}) {
  const exerciseImages = {
    "Press Banca": {
      image: "https://media4.giphy.com/media/NLuFwZieDxvws/100.webp?cid=790b761193svlqhi5q3te829snudwzsfk6ams3g0wwv1q8wd&ep=v1_gifs_search&rid=100.webp&ct=g",
      description: "Sé como el ratoncito",
    },
    Sentadillas: {
      image: "path/to/squat.jpg",
      description: "Una buena postura es clave",
    },
    notFound: {
      image: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHZsNnRwb3YwdjZjZTFtdzRnNTQycWxyZDV2enU4aXczZTA0bTcycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KBYyUGgDEsILK/giphy.gif",
      description: "El camino comienza con un paso",
    },
  };

  const { nombreEjercicio } = exercise;
  const exerciseData = exerciseImages[nombreEjercicio];

  if (!exerciseData) {
    return (
      <div className="text-center">
        <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <span className="text-2xl font-bold mb-2">{nombreEjercicio}</span>
          <div className="relative flex items-center justify-center bg-muted">
            <img
              src={exerciseImages.notFound.image}
              width="1920"
              height="1080"
              className="h-50 w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <span className="text-sm mt-2 text-center">No hay descripción disponible para este ejercicio.</span>
        </CardContent>
      </Card>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <span className="text-2xl font-bold mb-2">{nombreEjercicio}</span>
          <div className="relative flex items-center justify-center bg-muted">
            <img
              src={exerciseData.image}
              alt={nombreEjercicio}
              width="1920"
              height="1080"
              className="h-50 w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <span className="text-sm mt-2 text-center">{exerciseData.description}</span>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExercisesInfoImg;
