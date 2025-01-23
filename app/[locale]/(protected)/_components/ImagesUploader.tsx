"use client";

// import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MdClose } from "react-icons/md";
// import { FileWithPath } from './../../../../node_modules/file-selector/dist/file.d';

type FileUploaderProps = {
  onFieldChange: ([]: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  isError: boolean;
};

export function ImagesUploader({
  imageUrls,
  onFieldChange,
  setFiles,
  isError,
}: FileUploaderProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [newImages, setNewImages] = useState<any>([...imageUrls]);
  const [newRawImages, setNewRawImages] = useState<any>([]);
  const [newBothImages, setNewBothImages] = useState<any>([]);
  // let newImages = [...imageUrls];
  // let newRawImages: any = [];
  // let newBothImages: any = [];

  useEffect(() => {
    if (imageUrls.length > 0) {
      imageUrls.map((imageUrl) => {
        const objjj = { img: imageUrl, raw: undefined };
        setNewBothImages((prevStateArray: any) => [...prevStateArray, objjj]);
      });
    }
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(convertFileToUrl(acceptedFiles[0]));
    // console.log(acceptedFiles[0]);

    if (acceptedFiles.length > 0) {
      acceptedFiles.map((file) => {
        setNewRawImages((prevStateArray: any) => [...prevStateArray, file]);
        setNewImages((prevStateArray: any) => [
          ...prevStateArray,
          convertFileToUrl(file),
        ]);
        const objjj = { img: convertFileToUrl(file), raw: file };
        setNewBothImages((prevStateArray: any) => [...prevStateArray, objjj]);
      });

      // setFileName()
    }
    // onFieldChange(convertFileToUrl(acceptedFiles[0]));
    // setFileName(acceptedFiles[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    // multiple: true,
    maxFiles: 10,
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  useEffect(() => {
    onFieldChange(newImages);
    setFiles(newRawImages);
  }, [newImages]);
  // const handleUpload = (data: any) => {
  //   console.log(data);

  //   onFieldChange(data.info.secure_url);
  //   setFileName(data.info.original_filename);
  //   setFileExtension(data.info.format);
  // };

  const handleRemoveImage = async (fileUrl: string) => {
    const newbothImagess = await newBothImages.filter(
      (image: any) => image.img.toString() !== fileUrl.toString()
    );
    let newImagess: any = [];
    let newRawImagess: any = [];

    if (newBothImages.length > 0) {
      setNewBothImages(newbothImagess);
      await newbothImagess.map((image: any) => {
        newImagess.push(image.img);
        if (image.raw) {
          newRawImagess.push(image.raw);
        }
      });

      onFieldChange(newImagess);
      setFiles(newRawImagess);
    }
  };

  return (
    <>
      <div {...getRootProps()} className="w-full h-[160px]">
        <input {...getInputProps()} className="cursor-pointer" />

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
            Choose files or drag and drop
          </h3>

          <p className="p-medium-12 mt-2 mb-4 text-center text-sm text-[var(--clr-secondary)]">
            SVG, PNG, JPG (4MB) / 10 Max
          </p>
        </div>
      </div>
      {imageUrls?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 !w-full !h-[220px] overflow-auto">
          {imageUrls?.map((imageUrl, index) => (
            <div
              key={index}
              className="flex w-full items-center h-[80px] rounded-[16px] relative bg-[var(--clr-silver-v6)]"
            >
              <div className="flex flex-1 h-[80px] justify-center items-center relative rounded-[16px]">
                <Image
                  src={imageUrl || ""}
                  alt="image"
                  // width={250}
                  // height={250}
                  fill
                  className=" object-cover  object-center rounded-[16px]"
                />
              </div>
              <div
                onClick={() => handleRemoveImage(imageUrl)}
                className=" absolute rounded-full bg-red-600 p-[1px] right-1 top-2  flex items-center justify-center cursor-pointer !shadow-2xl"
              >
                <MdClose className="text-white w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-10">
          <p>No Image Selected</p>
        </div>
      )}
    </>
  );
}
