import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersProps {
  industries: string[];
  degreeLevels: string[];
  degreeTypes: Record<string, string[]>;
  licensuresAndCertifications: string[];
  setIndustry: (value: any) => void; // or specify a more precise type
  setDistance: (value: any) => void;
  setDegreeLevel: (value: any) => void;
  setDegreeType: (value: any) => void;
  setExperience: (value: any) => void;
  setZipCode: (value: any) => void;
  selectedLicensures: string[];
  setSelectedLicensures: (value: any) => void;
}

const Filters: React.FC<FiltersProps> = ({
  industries,
  degreeLevels,
  degreeTypes,
  licensuresAndCertifications,
  setIndustry,
  setDistance,
  setDegreeLevel,
  setDegreeType,
  setExperience,
  setZipCode,
  selectedLicensures,
  setSelectedLicensures,
}) => {
  const availableDegreeTypes = (degreeLevel: string) => {
    return degreeLevel === "All" ? [] : degreeTypes[degreeLevel] || [];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Industry Filter */}
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select onValueChange={setIndustry}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Industries</SelectItem>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zip Code Filter */}
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            placeholder="Enter zip code"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <Label>Distance (miles)</Label>
          <Slider
            min={0}
            max={100}
            step={10}
            value={[50]}
            onValueChange={(value) => setDistance(value[0])}
          />
          <div className="text-right">50 miles</div>
        </div>

        {/* Degree Level Filter */}
        <div className="space-y-2">
          <Label htmlFor="degreeLevel">Degree Level</Label>
          <Select
            onValueChange={(value) => {
              setDegreeLevel(value);
              setDegreeType("All");
            }}
          >
            <SelectTrigger id="degreeLevel">
              <SelectValue placeholder="Select degree level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              {degreeLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {degreeLevel !== "All" && (
          <div className="space-y-2">
            <Label htmlFor="degreeType">Degree Type</Label>
            <Select onValueChange={setDegreeType}>
              <SelectTrigger id="degreeType">
                <SelectValue placeholder="Select degree type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                {availableDegreeTypes(degreeLevel).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Experience Filter */}
        <div className="space-y-2">
          <Label htmlFor="experience">Work Experience</Label>
          <Select onValueChange={setExperience}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="Entry Level">Entry Level</SelectItem>
              <SelectItem value="1-3 years">1-3 years</SelectItem>
              <SelectItem value="3-5 years">3-5 years</SelectItem>
              <SelectItem value="5+ years">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Licensures & Certifications Filter */}
        <div className="space-y-2">
          <Label>Licensures & Certifications</Label>
          {licensuresAndCertifications.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={selectedLicensures.includes(item)}
                onCheckedChange={(checked) => {
                  setSelectedLicensures(
                    checked
                      ? [...selectedLicensures, item]
                      : selectedLicensures.filter((i) => i !== item)
                  );
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
