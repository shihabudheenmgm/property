"use client";

import { useEffect, useState } from "react";
import InnerBanner from "../components/Banner";
import PropertyList from "./PropertyList";
import Filter from "./filter";

interface Property {
  id: number;
  image: string;
  address: string;
  name: string;
  bedrooms: number;
  size: string;
  price: number;
  added: string;
}

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <>
      <InnerBanner title="Properties" bg="otherbg.jpg" />
      <section className="py-11 lg:py-20">
        <div className="container">
          <div className="flex justify-between items-center flex-wrap mb-8 gap-4">
            <h3 className="text-2xl text-black">Properties</h3>
            <Filter setFilteredProperties={setFilteredProperties} />
          </div>
          <div className="flex flex-wrap -mx-4">
            <PropertyList properties={filteredProperties} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
