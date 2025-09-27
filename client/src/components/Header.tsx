import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Sun, Moon, User, Calendar } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDark, onThemeToggle }: HeaderProps) {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{backgroundColor: 'hsl(355, 70%, 35%)'}}>
              <span className="font-bold text-sm font-serif" style={{color: 'hsl(355, 20%, 95%)'}}>H</span>
            </div>
            <span className="text-lg md:text-xl font-serif font-semibold text-foreground truncate">HealingConnect</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="flex space-x-2 w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search practitioners or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-40" data-testid="select-location">
                  <MapPin className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="san-francisco">San Francisco</SelectItem>
                  <SelectItem value="oakland">Oakland</SelectItem>
                  <SelectItem value="berkeley">Berkeley</SelectItem>
                  <SelectItem value="san-jose">San Jose</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} data-testid="button-search">
                Search
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {/* Mobile search button */}
            <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-search">
              <Search className="w-4 h-4" />
            </Button>
            
            {/* Navigation buttons */}
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="link-appointments-mobile">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex" data-testid="link-appointments">
              <Calendar className="w-4 h-4 mr-2" />
              My Appointments
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="link-profile-mobile">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex" data-testid="link-profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}