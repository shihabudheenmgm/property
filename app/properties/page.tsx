"use client";

import { useEffect, useState } from "react";
import InnerBanner from "../components/Banner";
import PropertyList from "./propertylist";
import Filter from "./filter";
import { Property } from "./types";

const PropertiesPage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/properties")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch properties");
        return response.json();
      })
      .then((data) => {
        setFilteredProperties(data);
      })
      .catch((error) => setError(error.message));
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
            {error && (
              <p className="text-red-500 text-center mx-auto mt-6 text-base w-full">
                {error}
              </p>
            )}

            {filteredProperties.length === 0 ? (
              <p className="text-gray-500 text-center mx-auto mt-6 text-base">
                No properties found.
              </p>
            ) : (
              <PropertyList properties={filteredProperties} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
