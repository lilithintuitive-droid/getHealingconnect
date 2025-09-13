import { useState } from "react";
import FilterSidebar from '../FilterSidebar';

export default function FilterSidebarExample() {
  // todo: remove mock functionality
  const [filters, setFilters] = useState({
    specialties: ["Acupuncture", "Reiki"],
    priceRange: [50, 200],
    availability: "this-week",
    rating: 4,
    distance: 25
  });

  const handleClearFilters = () => {
    setFilters({
      specialties: [],
      priceRange: [0, 300],
      availability: "any",
      rating: 0,
      distance: 50
    });
  };

  return (
    <FilterSidebar
      filters={filters}
      onFiltersChange={setFilters}
      onClearFilters={handleClearFilters}
    />
  );
}