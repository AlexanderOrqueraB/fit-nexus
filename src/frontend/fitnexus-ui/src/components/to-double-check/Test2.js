import React from 'react';

import dumbbell from "../../images/db2.PNG"
 
import { Card, CardContent } from "../../components_ui/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components_ui/ui/carousel"
 
export function Test2() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                  <div className="relative flex-1 hidden lg:flex items-center justify-center bg-muted">
                    <img
                    src={dumbbell}
                    alt="dumbbell"
                    width="1920"
                    height="1080"
                    className="h-50 w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
                </CardContent>
                
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Test2;