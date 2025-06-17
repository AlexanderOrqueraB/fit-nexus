import React from 'react';

import { Card, CardContent } from "../../../components_ui/ui/card";
import { exerciseImages } from '../../../utils/exercisesImg'


export function ExercisesInfoImg ({exercise}) {

  const { nombreEjercicio } = exercise;
  
  const exerciseNameMapping = {
    "remo con barra": "remo con barra",
  };
  // función para normalizar el nombre y procesar todo en minúsculas y singular
  const normalizeName = (name) => {
    const lowerCaseNoS = name.toLowerCase().replace(/s$/, "");
    return exerciseNameMapping[lowerCaseNoS] || lowerCaseNoS;
  };

  const normalizedName = normalizeName(nombreEjercicio);
  const exerciseData = exerciseImages[normalizedName] || exerciseImages.notFound;

  if (!exerciseData || !exerciseData.image) {
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
              alt= {nombreEjercicio}
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
