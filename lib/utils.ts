import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function convertArrayOfObjectsToCSV({ array, data }: any) {
  let result: any;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item: any) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

export function catArray({ array }: any) {
  let result = [];
  array?.reduce(function (res: any, value: any) {
    if (!res[value.review]) {
      res[value.review] = {
        review: value.review,
        color: value.color,
        qty: 0,
      };
      result.push(res[value.review]);
    }
    res[value.review].qty += 1;
    return res;
  }, {});
}
