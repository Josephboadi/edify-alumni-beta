"use client";
import { AboutData } from "@/schemas";

// import { aboutData } from "@/data/about";
interface AboutProps {
  aboutData: AboutData;
}
const About = ({ aboutData }: AboutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 mb-5">
      {aboutData?.map((paragraph, index) => (
        <div key={paragraph.key} className="w-full">
          <p className="text-left">{paragraph.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
