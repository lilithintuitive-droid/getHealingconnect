import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface FilterState {
  specialties: string[];
  priceRange: number[];
  availability: string;
  rating: number;
  distance: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ filters, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const specialtyOptions = [
    "Acupuncture",
    "Massage Therapy",
    "Reiki",
    "Aromatherapy",
    "Chinese Herbal Medicine",
    "Meditation & Mindfulness",
    "Yoga Therapy",
    "Chiropractic",
    "Naturopathy",
    "Energy Healing"
  ];

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const newSpecialties = checked 
      ? [...filters.specialties, specialty]
      : filters.specialties.filter(s => s !== specialty);
    
    onFiltersChange({ ...filters, specialties: newSpecialties });
  };

  const handlePriceRangeChange = (range: number[]) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const hasActiveFilters = filters.specialties.length > 0 || 
                          filters.priceRange[0] > 0 || filters.priceRange[1] < 300 ||
                          filters.availability !== "any" ||
                          filters.rating > 0 ||
                          filters.distance < 50;

  return (
    <div className="w-80 space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClearFilters} data-testid="button-clear-filters">
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.specialties.map(specialty => (
                <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                  {specialty}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleSpecialtyChange(specialty, false)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Specialties Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Specialties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specialtyOptions.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={filters.specialties.includes(specialty)}
                onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                data-testid={`checkbox-specialty-${specialty.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <label htmlFor={specialty} className="text-sm cursor-pointer">
                {specialty}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={10}
              className="w-full"
              data-testid="slider-price-range"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.availability} onValueChange={(value) => onFiltersChange({ ...filters, availability: value })}>
            <SelectTrigger data-testid="select-availability">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any time</SelectItem>
              <SelectItem value="today">Available today</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="next-week">Next week</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[filters.rating]}
            onValueChange={(value) => onFiltersChange({ ...filters, rating: value[0] })}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
            data-testid="slider-rating"
          />
          <div className="text-sm text-muted-foreground mt-2">
            {filters.rating > 0 ? `${filters.rating}+ stars` : "Any rating"}
          </div>
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={[filters.distance]}
            onValueChange={(value) => onFiltersChange({ ...filters, distance: value[0] })}
            max={50}
            min={1}
            step={1}
            className="w-full"
            data-testid="slider-distance"
          />
          <div className="text-sm text-muted-foreground mt-2">
            Within {filters.distance} miles
          </div>
        </CardContent>
      </Card>
    </div>
  );
}