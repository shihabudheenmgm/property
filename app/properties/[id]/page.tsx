"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Property } from "../types";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/data/properties.json")
      .then((res) => res.json())
      .then((data: Property[]) => {
        const foundProperty = data.find((p) => p.id === Number(id));
        setProperty(foundProperty || null);
      })
      .catch((error) => console.error("Error loading property:", error));
  }, [id]);

  if (!property) {
    return <p className="text-center text-red-500">Property not found</p>;
  }

  return (
    <>
      <section className="py-10 lg:py-12">
        <div className="container">
          <div className="flex -mx-4 flex-wrap">
            <div className="px-4 w-full mb-3 lg:mb-6">
              <Link href={"/properties"} className="inline-flex">
                <Image
                  src={"/images/back.svg"}
                  width={16}
                  height={18}
                  alt=""
                  className="mr-1"
                />
                <span className="text-xs text-black">Back</span>
              </Link>
            </div>
            <div className="px-4 w-full lg:w-1/2 mb-6">
              <div className="overflow-hidden w-full rounded-md">
                <Image
                  src={property.image}
                  width={800}
                  height={500}
                  alt={property.name}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <div className="px-4 flex flex-col w-full lg:w-1/2 mb-6">
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-3 lg:mb-5">
                <Image
                  src={"/images/location.svg"}
                  width={14}
                  height={14}
                  alt="Location"
                />
                <span>{property.address}</span>
              </div>
              <h2 className="lg:text-2xl text-xl font-bold text-cyan-600 mb-6">
                {property.name}
              </h2>
              <div className="inline-flex mr-auto border border-solid border-gray-300 rounded-lg mb-4">
                <div className="text-xs text-gray-600 px-2 py-1 flex items-center ">
                  <Image
                    src={"/images/bed.svg"}
                    width={14}
                    height={10}
                    alt="Bedrooms"
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-600 font-semibold">
                    {property.bedrooms}
                  </span>
                </div>
                <div className="border-l border-solid border-gray-300 text-sm text-gray-600 px-2 py-1 font-semibold">
                  {property.size}
                </div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <div className="lg:text-3xl text-xl text-black font-bold leading-none">
                  {property.price} <span className="text-cyan-700">AED</span>
                </div>
                <Link
                  className="px-4 py-3 bg-black text-white uppercase text-base rounded-md leading-none flex items-center justify-center text-center transition-all hover:bg-cyan-600 hover:text-white"
                  href={`/properties/${property.id}`}
                >
                  Book Now
                </Link>
              </div>
            </div>
            <div className="px-4 w-full mb-6">
              <div className="p-4 border border-gray-300 rounded-md">
                <h3 className="text-lg text-black mb-3 font-semibold border-b -mx-4 -my-4 p-4 border-gray-300">
                  Description
                </h3>
                <p className="text-sm text-gray-400">{property.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyDetail;
