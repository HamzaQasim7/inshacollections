"use client";

import { useState } from "react";
import { Button, Checkbox, Slider } from "@/components/ui";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { FilterState, SortOption } from "@/types";
import { FABRIC_TYPES } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Emerald", hex: "#2D5F2D" },
  { name: "Maroon", hex: "#800000" },
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Blush", hex: "#FFB6C1" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Ivory", hex: "#FFFFF0" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  productCount: number;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  productCount,
}: ProductFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "price",
    "fabric",
    "size",
    "color",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: "fabricTypes" | "sizes" | "colors", value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 100000],
      fabricTypes: [],
      sizes: [],
      colors: [],
      sortBy: "featured",
    });
  };

  const hasActiveFilters =
    filters.fabricTypes.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          Clear All
        </button>
      )}

      {/* Price Range */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-medium">Price</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.includes("price") && "rotate-180"
            )}
          />
        </button>
        {expandedSections.includes("price") && (
          <div className="mt-4 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Min</label>
                <div className="mt-1 rounded-md bg-muted px-3 py-2 text-sm">
                  {formatPrice(filters.priceRange[0])}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground">Max</label>
                <div className="mt-1 rounded-md bg-muted px-3 py-2 text-sm">
                  {formatPrice(filters.priceRange[1])}
                </div>
              </div>
            </div>
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={filters.priceRange}
              onChange={(value) => updateFilter("priceRange", value)}
            />
          </div>
        )}
      </div>

      {/* Fabric Type */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("fabric")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-medium">Fabric Type</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.includes("fabric") && "rotate-180"
            )}
          />
        </button>
        {expandedSections.includes("fabric") && (
          <div className="mt-4 space-y-3">
            {FABRIC_TYPES.map((fabric) => (
              <Checkbox
                key={fabric}
                label={fabric}
                checked={filters.fabricTypes.includes(fabric)}
                onChange={() => toggleArrayFilter("fabricTypes", fabric)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("size")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-medium">Size</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.includes("size") && "rotate-180"
            )}
          />
        </button>
        {expandedSections.includes("size") && (
          <div className="mt-4 flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleArrayFilter("sizes", size)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  filters.sizes.includes(size)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection("color")}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="font-medium">Color</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.includes("color") && "rotate-180"
            )}
          />
        </button>
        {expandedSections.includes("color") && (
          <div className="mt-4 flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleArrayFilter("colors", color.name)}
                className={cn(
                  "relative h-8 w-8 rounded-full border-2 transition-all",
                  filters.colors.includes(color.name)
                    ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {color.hex === "#FFFFFF" && (
                  <span className="absolute inset-0 rounded-full border border-border" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden w-64 flex-shrink-0 lg:block">
        <div className="sticky top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-hover"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="mt-6">
            <FilterContent />
          </div>
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between gap-4 lg:hidden">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {filters.fabricTypes.length +
                filters.sizes.length +
                filters.colors.length}
            </span>
          )}
        </button>

        {/* Sort Dropdown */}
        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value as SortOption)}
          className="rounded-md border border-border bg-background px-4 py-2 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 top-0 z-50 w-full max-w-sm overflow-y-auto bg-background p-6 lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="rounded-full p-2 hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 mt-6 border-t border-border bg-background pt-4">
              <Button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full"
              >
                Show {productCount} Products
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sort */}
      <div className="hidden items-center gap-4 lg:flex">
        <span className="text-sm text-muted-foreground">
          Showing {productCount} products
        </span>
        <span className="text-muted-foreground">|</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value as SortOption)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-primary"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
