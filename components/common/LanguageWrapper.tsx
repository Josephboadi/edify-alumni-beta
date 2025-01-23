import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

type Props = {
  children: React.ReactNode;
};

const LanguageWrapper = ({ children }: Props) => {
  return (
    <Card className="max-w-max w-80 sm:w-max px-0 md:p-8  shadow-md bg-[var(--clr-primary-light)]">
      <CardHeader>
        <div className="flex items-center justify-center mb-5 mt-5 md:mt-0">
          <h1 className=" text-lg font-semibold">
            {"Please select your preferred language"}
          </h1>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default LanguageWrapper;
