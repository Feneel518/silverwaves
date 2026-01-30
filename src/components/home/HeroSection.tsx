import Image from "next/image";
import { FC } from "react";
import { BookingBar } from "./BookingBar";

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = ({}) => {
  return (
    <div className="w-full min-h-screen relative bg-forest flex items-center justify-center">
      <div className="absolute inset-0 bg-forest/75 z-10 "></div>
      <div className="absolute inset-0  z-10 flex items-center justify-center text-ivory text-5xl md:text-7xl font-sans text-center max-md:mb-40 px-4">
        Wake up to the sound of the waves.
      </div>
      <Image
        src={"/frontSide.webp"}
        alt="Hotel front Image"
        fill
        draggable="false"
        className="object-cover"></Image>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-ivory text-2xl font-sans w-full flex items-center justify-center max-md:-mt-8">
        <BookingBar></BookingBar>
      </div>
    </div>
  );
};

export default HeroSection;
