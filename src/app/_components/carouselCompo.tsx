"use client";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

// import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

export function CarouselComponent() {
  const imagesPre = [
    "https://utfs.io/f/bb9ad312-d2f0-4a62-b81b-0ff54b47fff6-nyqgcr.jpg",
    "https://utfs.io/f/767f7bc4-d9f2-4682-a968-3a1f1fa3e305-z7dbh5.jpg",
    "https://utfs.io/f/08c77fca-062a-42a1-a917-aa249d89dd09-fwc9af.jpg",
    "https://utfs.io/f/8a009d60-e8cd-432a-9852-025abbfc419f-sc03uf.jpg",
    "https://utfs.io/f/bb679c88-6434-40ac-a9f0-100b1aae57c2-w9vgvc.jpg",
    "https://utfs.io/f/8d0b6c6e-c6d1-4ebb-b54a-f3887058c3b6-lwb7bu.jpg",
    "https://utfs.io/f/729d0513-24ff-4102-99cd-59836a4a0875-3zwqmz.jpg",
    "https://utfs.io/f/36b336af-b06c-41cb-ab5a-61ccc82a9289-l91r2y.jpg",
    "https://utfs.io/f/ae307455-c5ac-4c10-9b89-a834527344c2-okw41l.jpg",
  ];

  return (
    <Carousel
      className="w-full max-w-sm"
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {imagesPre.map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex h-full items-center p-1 ">
              {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6"> */}
              <img src={_} className="text-4xl font-semibold"></img>
              {/* </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
