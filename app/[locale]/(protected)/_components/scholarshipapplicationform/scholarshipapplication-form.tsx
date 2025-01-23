"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { ScholarshipApplicationSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
import { FileUploader } from "../FileUploader";
import { CardWrapper } from "../card-wrapper";

export const ScholarshipApplicationForm = () => {
  const { scholarshipInfoData } = useAppStore();
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [applicationFiles, setApplicationFiles] = useState<File[]>([]);
  const [recommendationLetterFiles, setRecommendationLetterFiles] = useState<
    File[]
  >([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const { startUpload } = useUploadThing("pdfUploader");

  const form = useForm<z.infer<typeof ScholarshipApplicationSchema>>({
    resolver: zodResolver(ScholarshipApplicationSchema),
    defaultValues: {
      scholarshiptitle: scholarshipInfoData?.title,
      certificateFileUrl: "",
      applicationLetterFileUrl: "",
      recommendationLetterFileUrl: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ScholarshipApplicationSchema>
  ) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      let uploadedCertificateFileUrl = values.certificateFileUrl;
      let uploadedApplicationFileUrl = values.applicationLetterFileUrl;
      let recommendationLetterFileUrl = values.recommendationLetterFileUrl;

      if (certificateFiles.length > 0) {
        const uploadedFiles = await startUpload(certificateFiles);

        if (!uploadedFiles) {
          return;
        }
        // console.log("cv file url================, ", uploadedFiles[0]);

        uploadedCertificateFileUrl = uploadedFiles[0].url;
      }

      if (applicationFiles.length > 0) {
        const uploaded1Files = await startUpload(applicationFiles);

        if (!uploaded1Files) {
          return;
        }

        // console.log("cover file url================, ", uploaded1Files[0]);

        uploadedApplicationFileUrl = uploaded1Files[0].url;
      }

      if (recommendationLetterFiles.length > 0) {
        const uploaded1Files = await startUpload(recommendationLetterFiles);

        if (!uploaded1Files) {
          return;
        }

        // console.log("cover file url================, ", uploaded1Files[0]);

        recommendationLetterFileUrl = uploaded1Files[0].url;
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
      headerLabel="Apply for Scholarship"
      subHeaderLabel="Upload your Application letter and Certificate and Submit"
      mainImageUrl="/scholarship/mainform.png"
      subImageUrl="/scholarship/subform.png"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <>
              <FormField
                control={form.control}
                name="scholarshiptitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scholarship Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Infomation Security "
                        className={` bg-[var(--clr-silver-v6)] ${
                          form.formState.errors.scholarshiptitle
                            ? "border border-red-500 focus-visible:ring-0"
                            : "focus-visible:ring-transparent border-none"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="certificateFileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload School Certificate</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setCertificateFiles}
                          isError={
                            form.formState.errors.certificateFileUrl
                              ? true
                              : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicationLetterFileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Application Letter</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setApplicationFiles}
                          isError={
                            form.formState.errors.applicationLetterFileUrl
                              ? true
                              : false
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recommendationLetterFileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Recommendation Letter</FormLabel>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setRecommendationLetterFiles}
                          isError={
                            form.formState.errors.recommendationLetterFileUrl
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
