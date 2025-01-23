"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
// import { FileWithPath } from './../../../../node_modules/file-selector/dist/file.d';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string | undefined;
  setFiles: Dispatch<SetStateAction<File[]>>;
  isError: boolean;
};

export function ImageUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(convertFileToUrl(acceptedFiles[0]));
    // console.log(acceptedFiles[0]);
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
    setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  const handleUpload = (data: any) => {
    console.log(data);

    onFieldChange(data.info.secure_url);
    setFileName(data.info.original_filename);
    setFileExtension(data.info.format);
  };

  return (
    <>
     
      <div {...getRootProps()} className="w-full h-[270px]">
        <input {...getInputProps()} className="cursor-pointer" />
        {imageUrl ? (
          <div className="flex flex-col items-center justify-between gap-6 !pb-10 px-1 h-full relative bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none">
            <div className="flex gap-2 w-full ">
              <Button asChild className="w-full rounded-[4px]">
                <div className="h-full w-full bg-[var(--clr-black)]">
                  Select from computer
                </div>
              </Button>
            </div>
            <div className="flex  w-[200px] h-[200px] justify-center items-center">
              <Image
                src={imageUrl}
                alt="image"
                width={250}
                height={250}
                // fill
                className=" object-cover object-center w-[200px] h-[190px]"
              />
              {/* <BsFileEarmarkPdf className="text-5xl text-red-500" /> */}
              {/* <p className=" mb-2 mt-2 text-center text-xs text-[var(--clr-secondary)] text-wrap"> */}
              {/* {fileName.slice(0, 15)}
            {fileName.length > 15 && "..."}.{fileExtension} */}
              {/* {fileName} */}
              {/* </p> */}
            </div>
          </div>
        ) : (
          <div
            className={` relative flex item-center justify-center flex-col py-3 !pt-4  text-[var(--clr-secondary)] h-full w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-none ${
              isError
                ? "border border-red-500 focus-visible:ring-0"
                : "focus-visible:ring-transparent border-none"
            }`}
          >
            <div className="w-full flex justify-center">
              <Image
                src="/assets/upload.svg"
                width={60}
                height={60}
                alt="file upload"
              />
            </div>
            <h3 className=" mt-2 text-center text-sm text-[var(--clr-secondary)]">
              Choose file or drag and drop
            </h3>

            <p className="p-medium-12 mt-2 mb-4 text-center text-sm text-[var(--clr-secondary)]">
              SVG, PNG, JPG (4MB)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
