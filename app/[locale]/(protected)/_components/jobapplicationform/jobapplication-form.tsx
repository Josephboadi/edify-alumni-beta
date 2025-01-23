"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { jobApplication } from "@/actions/jobApplication";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/lib/uploadthing";
import { JobApplicationSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
import { FileUploader } from "../FileUploader";
import { CardWrapper } from "../card-wrapper";

export const JobApplicationForm = () => {
  const { jobInfoData } = useAppStore();
  const { locale } = useParams();
  const [cvFiles, setCvFiles] = useState<File[]>([]);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { startUpload } = useUploadThing("pdfUploader");

  const form = useForm<z.infer<typeof JobApplicationSchema>>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      jobtitle: jobInfoData?.title,
      company: jobInfoData?.company,
      type: jobInfoData?.jobType,
      location: jobInfoData?.location,
      cvfileUrl: "",
      coverLetterFileUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof JobApplicationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let uploadedCvImageUrl = values.cvfileUrl;
      let uploadedCoverImageUrl = values.coverLetterFileUrl;

      if (cvFiles.length > 0) {
        const uploadedImages = await startUpload(cvFiles);

        if (!uploadedImages) {
          return;
        }
        console.log("cv file url================, ", uploadedImages[0]);

        uploadedCvImageUrl = uploadedImages[0].url;
      }

      if (coverFiles.length > 0) {
        const uploaded1Images = await startUpload(coverFiles);

        if (!uploaded1Images) {
          return;
        }

        console.log("cover file url================, ", uploaded1Images[0]);

        uploadedCoverImageUrl = uploaded1Images[0].url;
      }
      // jobApplication(values, locale, callbackUrl)
      //   .then((data) => {
      //     if (data?.error) {
      //       form.reset();
      //       setError(data.error);
      //     }
      //     if (data?.success) {
      //       form.reset();
      //       setSuccess(data.success);
      //     }
      //     if (data?.twoFactor) {
      //       setShowTwoFactor(true);
      //     }
      //   })
      //   .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Apply for Job"
      subHeaderLabel="Upload your Cover letter and CV and Submit"
      mainImageUrl="/jobform.png"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <>
              <FormField
                control={form.control}
                name="jobtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Infomation Security "
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.jobtitle
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="edify Ltd"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.company
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="full time"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.type
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Accra"
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.location
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cvfileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload CV</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setCvFiles}
                          isError={
                            form.formState.errors.cvfileUrl ? true : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetterFileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Cover Letter</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setCoverFiles}
                          isError={
                            form.formState.errors.coverLetterFileUrl
                              ? true
                              : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          </div>

          <div className="w-full !mb-5 flex justify-center">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-[var(--clr-secondary)]"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
