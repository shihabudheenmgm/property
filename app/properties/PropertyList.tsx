"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "./types";
interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <>
      {/* Property Items */}
      {properties.length > 0 ? (
        properties.map((property) => (
          <div
            key={property.id}
            className="px-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-8"
          >
            <div className="relative border border-solid border-[#e5e5ea] overflow-hidden rounded-md group hover:shadow-md">
              <Link
                href={`/properties/${property.id}`}
                className="overflow-hidden block relative pb-[60%]"
              >
                <Image
                  src={property.image}
                  width={400}
                  height={260}
                  alt="Property Image"
                  className="block size-full object-cover duration-700 transition-all group-hover:scale-110 absolute inset-0"
                />
              </Link>
              <div className="p-4">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Image
                    src={"/images/location.svg"}
                    width={14}
                    height={14}
                    alt="Location"
                  />
                  <span>{property.address}</span>
                </div>
                <h4 className="text-base text-cyan-800 font-bold py-2">
                  {property.name}
                </h4>
                <div className="inline-flex border border-solid border-gray-300 rounded-lg">
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
                <div className="flex justify-between items-center mt-4">
                  <div className="lg:text-lg text-base text-black font-bold leading-none">
                    {property.price} <span className="text-cyan-700">AED</span>
                  </div>
                  <Link
                    className="px-4 py-2 bg-black text-white text-sm rounded-md leading-none flex items-center justify-center text-center transition-all hover:bg-cyan-600 hover:text-white"
                    href={`/properties/${property.id}`}
                  >
                    See the details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full text-gray-500 mt-8">
          No properties found.
        </p>
      )}
    </>
  );
};

export default PropertyList;
