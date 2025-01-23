"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";
// import { FileWithPath } from './../../../../node_modules/file-selector/dist/file.d';

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string | undefined;
  setFiles: Dispatch<SetStateAction<File[]>>;
  isError: boolean;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(convertFileToUrl(acceptedFiles[0]));
    // console.log(acceptedFiles[0]);
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
    setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf"
      ? generateClientDropzoneAccept(["application/pdf"])
      : undefined,
  });

  const handleUpload = (data: any) => {
    console.log(data);

    onFieldChange(data.info.secure_url);
    setFileName(data.info.original_filename);
    setFileExtension(data.info.format);
  };

  return (
    <>
      {imageUrl && (
        <div className="px-1">
          <Button
            variant={"ghost"}
            asChild
            className=" w-full flex items-center h-full justify-center rounded-[4px] bg-[var(--clr-silver-v7)] text-[var(--clr-scarlet)] text-sm font-semibold  px-2"
          >
            <a target="_blank" href={imageUrl}>
              Preview Pdf
            </a>
          </Button>
        </div>
      )}
      <div {...getRootProps()} className="w-full h-[160px]">
        <input {...getInputProps()} className="cursor-pointer" />
        {imageUrl ? (
          <div className="flex flex-col justify-between items-center gap-2 pb-3 px-1 h-full relative bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md">
            <div className="flex gap-2 w-full ">
              <Button asChild className="w-full rounded-[4px]">
                <div className="h-full w-full bg-[var(--clr-black)]">
                  Change file
                </div>
              </Button>
            </div>
            <div className="flex flex-col mt-2  w-full justify-center items-center ">
              {/* <Image
            src={imageUrl}
            alt="image"
            fill
            className="w-full object-cover object-center"
          /> */}
              <BsFileEarmarkPdf className="text-5xl text-red-500" />
              <p className=" mb-2 mt-2 text-center text-xs text-[var(--clr-secondary)] text-wrap">
                {/* {fileName.slice(0, 15)}
            {fileName.length > 15 && "..."}.{fileExtension} */}
                {fileName}
              </p>
            </div>
          </div>
        ) : (
          <div
            className={` relative flex item-center justify-center flex-col py-3 !pt-4  text-[var(--clr-secondary)] h-full w-full bg-[var(--clr-silver-v6)] rounded-[6px] shadow-md ${
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
              Pdf (4MB)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
