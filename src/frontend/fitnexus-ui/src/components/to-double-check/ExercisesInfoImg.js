import React from 'react';

import { Card, CardContent } from "../../components_ui/ui/card";
import { exerciseImages } from '../utils/exercisesImg'


export function ExercisesInfoImg ({exercise}) {

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
