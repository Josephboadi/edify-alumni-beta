"use client";

import { SubmitForm } from "@/actions/form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useRef, useState, useTransition } from "react";
import { HiCursorClick } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { FormElementInstance, FormElements } from "./FormElements";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function FormSubmitComponent({
  formUrl,
  content,
  name,
}: {
  content: FormElementInstance[];
  formUrl: string;
  name?: string;
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  // console.log(content);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-md rounded-xl">
          <h1 className="text-2xl font-bold">Request submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting your request. Kindly Look out for updates
            on your profile page.
          </p>
          <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/service"} className="gap-2">
                  <BsArrowLeft />
                  Go back
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/profile`} className="gap-2">
                  Go to profile
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-md rounded-xl relative"
      >
        {name && (
          <h1
            className={cn(
              "text-2xl mt-2 font-semibold !capitalize text-center mb-4"
            )}
          >
            {/* {label} */}
            {`Request ${name}`}
          </h1>
        )}
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 bg-[var(--clr-secondary)]"
          onClick={() => {
            startTransition(submitForm);
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
