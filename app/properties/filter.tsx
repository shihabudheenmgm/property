"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Property } from "./types";

interface FilterProps {
  setFilteredProperties: (props: Property[]) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilteredProperties }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    fetch("/data/properties.json") // Fetch JSON from public folder
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error("Error loading properties:", error));
  }, [properties]);

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPriceDropdown(false);
      }
      if (
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(event.target as Node)
      ) {
        setIsMobileFilterOpen(false);
      }
    }

    if (showPriceDropdown || isMobileFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPriceDropdown, isMobileFilterOpen]);

  // Detect screen resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply filter & sorting when filter values change
  useEffect(() => {
    let filtered = properties.filter((p) => {
      const minPrice = filter.minPrice !== "" ? Number(filter.minPrice) : null;
      const maxPrice = filter.maxPrice !== "" ? Number(filter.maxPrice) : null;
      const bedrooms = filter.bedrooms !== "" ? Number(filter.bedrooms) : null;

      return (
        (minPrice === null || p.price >= minPrice) &&
        (maxPrice === null || p.price <= maxPrice) &&
        (bedrooms === null || p.bedrooms >= bedrooms) &&
        (p.address.toLowerCase().includes(filter.search.toLowerCase()) ||
          p.name.toLowerCase().includes(filter.search.toLowerCase()))
      );
    });

    // Sorting logic
    filtered = filtered.sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "alpha") return a.address.localeCompare(b.address);
      return new Date(b.added).getTime() - new Date(a.added).getTime();
    });

    setFilteredProperties(filtered);
  }, [filter, sort, properties, setFilteredProperties]);

  // Reset Filter
  const resetFilter = () => {
    setFilter({
      search: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
    });
    setSort("recent");
    setShowPriceDropdown(false);
    setFilteredProperties(properties);
  };

  return (
    <>
      <div className="flex gap-3 justify-end">
        {/* Search Field */}
        <div className="flex items-center relative h-10 border border-gray-400 rounded-md">
          <Image
            src="/images/location.svg"
            width={14}
            height={14}
            alt="Search"
            className="mx-2"
          />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="text-base rounded-md bg-none focus:outline-none px-2 h-full text-black w-full"
            placeholder="Search"
          />
        </div>
        <div className="relative" ref={mobileFilterRef}>
          {/* Mobile Filter Button */}
          {isMobile && (
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="h-10 px-4 flex items-center justify-center  bg-cyan-500 text-white rounded-md uppercase hover:bg-black transition-all lg:hidden"
            >
              <Image
                src="/images/filter.svg"
                width={16}
                height={16}
                alt="Bedrooms"
              />
            </button>
          )}
          <div
            className={`flex gap-3 max-lg:absolute max-lg:top-full max-lg:mt-1 max-lg:right-0 max-lg:p-4 max-lg:rounded-md max-lg:bg-white max-lg:flex-col max-lg:z-10 max-lg:shadow-lg ${
              isMobile ? (isMobileFilterOpen ? "flex" : "hidden") : "flex"
            }`}
          >
            {/* Bedrooms Filter */}
            <div className="flex items-center w-36 h-10 border border-gray-400 rounded-md max-lg:w-full">
              <Image
                src="/images/bed.svg"
                width={14}
                height={14}
                alt="Bedrooms"
                className="mx-2"
              />
              <input
                type="number"
                value={filter.bedrooms}
                onChange={(e) =>
                  setFilter({ ...filter, bedrooms: e.target.value })
                }
                className="text-base rounded-md focus:outline-none px-2 h-full text-black w-full"
                placeholder="Bedrooms"
              />
            </div>

            {/* Price Dropdown */}
            <div className="relative" ref={priceDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  if (!isMobile) setShowPriceDropdown(!showPriceDropdown);
                }}
                className={`h-10 border border-gray-400 rounded-md flex items-center text-base w-full px-3 text-left min-w-40 ${
                  isMobile ? "pointer-events-none border-0 h-auto !px-0" : ""
                }`}
              >
                Price
              </button>

              {(isMobile || showPriceDropdown) && (
                <div className="lg:absolute lg:left-0 lg:top-full mt-1 lg:border rounded-md border-gray-400 bg-white lg:shadow-lg z-20 lg:p-4">
                  <div className="flex max-lg:flex-col lg:items-center lg:gap-5 gap-y-3 max-lg:mt-3">
                    {/* Min Price */}
                    <div className="flex items-center">
                      <label className="text-sm font-semibold text-black mr-2">
                        Min
                      </label>
                      <input
                        type="number"
                        value={filter.minPrice}
                        onChange={(e) =>
                          setFilter({ ...filter, minPrice: e.target.value })
                        }
                        className="h-8 w-24 max-lg:w-full border border-gray-400 rounded-md px-2 focus:outline-none"
                        placeholder="Min"
                      />
                    </div>
                    {/* Max Price */}
                    <div className="flex items-center">
                      <label className="text-sm font-semibold text-black mr-2">
                        Max
                      </label>
                      <input
                        type="number"
                        value={filter.maxPrice}
                        onChange={(e) =>
                          setFilter({ ...filter, maxPrice: e.target.value })
                        }
                        className="h-8 w-24 max-lg:w-full border border-gray-400 rounded-md px-2 focus:outline-none"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sorting Options */}
            <div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 border border-gray-400 rounded-md px-2 focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="priceAsc">Price Low to High</option>
                <option value="priceDesc">Price High to Low</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>

            {/* Reset Button */}
            <div>
              <button
                type="button"
                onClick={resetFilter}
                className="h-10 px-4 py-2 bg-cyan-500 text-white rounded-md uppercase hover:bg-black transition-all max-lg:w-full"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
