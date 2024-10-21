"use client";

import {
  useState,
  useMemo,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
} from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Marketing",
  "Hospitality",
  "Construction",
  "Transportation",
];

const degreeLevels = [
  "High School Diploma",
  "Associate's",
  "Bachelor's",
  "Master's",
  "Doctoral",
];

const degreeTypes = {
  "High School Diploma": ["General"],
  "Associate's": ["General Studies", "Applied Science", "Arts"],
  "Bachelor's": [
    "Computer Science",
    "Business Administration",
    "Nursing",
    "Education",
    "Engineering",
  ],
  "Master's": [
    "Computer Science",
    "Business Administration",
    "Education",
    "Engineering",
    "Public Health",
  ],
  Doctoral: [
    "Computer Science",
    "Business Administration",
    "Education",
    "Engineering",
    "Medicine",
  ],
};

const licensuresAndCertifications = [
  "Commercial Driver's License (CDL)",
  "Registered Nurse (RN)",
  "Certified Public Accountant (CPA)",
  "Project Management Professional (PMP)",
  "Teaching License",
  "Certified Information Systems Security Professional (CISSP)",
];

const jobPostings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Tech Co",
    location: "San Francisco, CA",
    industry: "Technology",
    degreeLevel: "Bachelor's",
    degreeType: "Computer Science",
    experience: "3-5 years",
    licensuresAndCertifications: ["CISSP"],
    description:
      "We are seeking a talented Software Engineer to join our team...",
  },
  {
    id: 2,
    title: "Truck Driver",
    company: "Logistics Inc",
    location: "Chicago, IL",
    industry: "Transportation",
    degreeLevel: "High School Diploma",
    degreeType: "General",
    experience: "1-3 years",
    licensuresAndCertifications: ["CDL"],
    description: "Experienced truck driver needed for long-haul routes...",
  },
  {
    id: 3,
    title: "Registered Nurse",
    company: "City Hospital",
    location: "New York, NY",
    industry: "Healthcare",
    degreeLevel: "Bachelor's",
    degreeType: "Nursing",
    experience: "2-4 years",
    licensuresAndCertifications: ["RN"],
    description:
      "Join our team of dedicated nurses in providing excellent patient care...",
  },
  {
    id: 4,
    title: "Financial Analyst",
    company: "Investment Firm",
    location: "Boston, MA",
    industry: "Finance",
    degreeLevel: "Master's",
    degreeType: "Business Administration",
    experience: "3-5 years",
    licensuresAndCertifications: ["CPA"],
    description:
      "Seeking a detail-oriented financial analyst to join our team...",
  },
  {
    id: 5,
    title: "High School Teacher",
    company: "Public School District",
    location: "Los Angeles, CA",
    industry: "Education",
    degreeLevel: "Bachelor's",
    degreeType: "Education",
    experience: "1-3 years",
    licensuresAndCertifications: ["Teaching License"],
    description: "Passionate educator needed to teach high school students...",
  },
];

export function JobBoardComponent() {
  const [industry, setIndustry] = useState("All");
  const [distance, setDistance] = useState(50);
  const [degreeLevel, setDegreeLevel] = useState("All");
  const [degreeType, setDegreeType] = useState("All");
  const [experience, setExperience] = useState("All");
  const [zipCode, setZipCode] = useState("");
  const [selectedLicensures, setSelectedLicensures] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return jobPostings.filter((job) => {
      const industryMatch = industry === "All" || job.industry === industry;
      const degreeLevelMatch =
        degreeLevel === "All" || job.degreeLevel === degreeLevel;
      const degreeTypeMatch =
        degreeType === "All" || job.degreeType === degreeType;
      const experienceMatch =
        experience === "All" || job.experience === experience;
      const licensureMatch =
        selectedLicensures.length === 0 ||
        selectedLicensures.some((l) =>
          job.licensuresAndCertifications.includes(l)
        );
      return (
        industryMatch &&
        degreeLevelMatch &&
        degreeTypeMatch &&
        experienceMatch &&
        licensureMatch
      );
    });
  }, [industry, degreeLevel, degreeType, experience, selectedLicensures]);

  const availableDegreeTypes = useMemo(() => {
    return degreeLevel === "All" ? [] : degreeTypes[degreeLevel] || [];
  }, [degreeLevel]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Job Board</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="Enter zip code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Distance (miles)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={10}
                  value={[distance]}
                  onValueChange={(value) => setDistance(value[0])}
                />
                <div className="text-right">{distance} miles</div>
              </div>
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
                      {availableDegreeTypes.map(
                        (
                          type:
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | Promise<AwaitedReactNode>
                            | Key
                            | null
                            | undefined
                        ) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
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
        </aside>
        <main className="w-full md:w-3/4">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.company} - {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Industry: {job.industry} | Degree: {job.degreeLevel} in{" "}
                    {job.degreeType} | Experience: {job.experience}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Required: {job.licensuresAndCertifications.join(", ")}
                  </p>
                  <p>{job.description}</p>
                  <Button className="mt-4">Apply Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
