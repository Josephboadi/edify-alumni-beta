"use client";

import ToolTip from "@/components/common/ToolTip";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { VscActivateBreakpoints } from "react-icons/vsc";
import Breadcrump from "./common/Breadcrump";
import Table from "./common/Table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { login } from "@/actions/login";
// import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { LoginSchema } from "@/schemas";
import { useAppStore } from "@/store/store";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertButton } from "./common/alert-button";
import { AlertCardWrapper } from "./common/alert-card-wrapper";
import { CardWrapper } from "./common/card-wrapper";
import { FormButton } from "./common/form-button";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae1",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p1",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws01",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae2",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p2",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws02",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae3",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p3",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export function ServiceDataTable() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ? searchParams.get("q") : "";
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [report, setReport] = useState<any>([]);

  const { locale } = useParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const { setFormType } = useAppStore();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, locale, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      // const data = await getAllTransactionsAPI();
      // setTransactions(data)
      setPayments(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      setFilteredData(payments);

      const rep: any = payments?.map((dat: any) => {
        return {
          ID: dat.id,
          Amount: dat.amount,
          Email: dat.email,
          Status: dat.status,
        };
      });

      setReport(rep);
    };
    getData();
  }, [payments]);

  useEffect(() => {
    let result = payments;
    if (q && q.length > 3) {
      result = payments.filter((data: any) => {
        return (
          data?.email.toLowerCase().includes(q.toLowerCase()) ||
          data?.status.toLowerCase().includes(q.toLowerCase())
        );
      });
    }
    setFilteredData(result);
  }, [q]);

  const HandleConfirmPromt = ({
    alertText,
    alertType = "normal",
  }: {
    alertText: String;
    alertType?: "normal" | "danger";
  }) => {
    return (
      <AlertCardWrapper>
        <div className="gap-6 w-[260px] xs:w-[300px] h-[260px] sm:w-[340px] flex flex-col items-center justify-center">
          <div>
            <h1
              className={`${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-3xl font-bold`}
            >
              Alert!
            </h1>
          </div>
          <div>
            <TbAlertTriangleFilled
              className={` animate-pulse text-7xl ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"}`}
            />
          </div>
          <div>
            <p
              className={`text-center ${alertType === "normal" ? "text-[var(--clr-green)]" : "text-[var(--clr-scarlet)]"} text-[var(--clr-black-light)]`}
            >
              {`Are you sure you want to ${alertText}?`}
            </p>
          </div>
        </div>
      </AlertCardWrapper>
    );
  };

  const HandleForm = () => {
    return (
      <CardWrapper
        headerLabel="Sign In"
        // subHeaderLabel="Welcome back"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[260px] xs:w-[300px] sm:w-[340px]"
          >
            <div className="space-y-4">
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                          className={` bg-[var(--clr-silver-v7)] ${
                            form.formState.errors.password
                              ? "border border-red-500 focus-visible:ring-0"
                              : "focus-visible:ring-transparent border-none"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <div className="!mb-4 !mt-6 !pt-4">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-[var(--clr-secondary)] "
              >
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    );
  };

  const columns: TableColumn<Payment>[] = useMemo(
    () => [
      {
        name: "ID",
        // width: "100px",
        selector: (row: any, index: any) => index + 1,
      },
      {
        name: "Amount",
        // width: "120px",
        cell: (row: any) => row?.amount,
      },
      {
        name: "Email",
        cell: (row: any) => row?.email,
        width: "300px",
      },

      {
        name: "Status",
        // width: "120px",
        cell: (row: any) => row?.status,
        //   selector: (row) => (row?.status ? "Active" : "Inactive"),
        //   sortable: true,
        //   conditionalCellStyles: [
        //     {
        //       when: (row) => row?.status,
        //       style: {
        //         color: "green",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //     {
        //       when: (row) => !row?.status,
        //       style: {
        //         color: "red",
        //         "&:hover": {
        //           cursor: "pointer",
        //         },
        //       },
        //     },
        //   ],
      },
      {
        name: "Action",
        width: "140px",
        cell: (row) => (
          <div className="flex justify-center items-center">
            <div className="flex gap-6">
              {row.status === "success" ? (
                <ToolTip tooltip="Deactivate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "disactivate this service",
                        alertType: "danger",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-red-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              ) : (
                <ToolTip tooltip="Activate">
                  <AlertButton
                    asChild
                    Form={() =>
                      HandleConfirmPromt({
                        alertText: "activate this service",
                      })
                    }
                    isAlert={true}
                  >
                    <div>
                      <VscActivateBreakpoints
                        //   onClick={() => onDeactivateRole(row)}
                        className="text-green-600 text-xl cursor-pointer"
                      />
                    </div>
                  </AlertButton>
                </ToolTip>
              )}
              <ToolTip tooltip="Edit Role">
                <FormButton asChild Form={HandleForm}>
                  <div>
                    <FiEdit
                      //   onClick={() => editWallet(row)}
                      className="text-xl font-black  cursor-pointer"
                    />
                  </div>
                </FormButton>
              </ToolTip>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className={`flex-1 flex flex-col  `}>
      <div className="fixed z-[20] bg-white w-full pb-2">
        <Breadcrump
          prePath={pathname.split("/")[1]}
          title={pathname.split("/")[2]}
        />
      </div>
      {/* <Card className="w-full mt-10 rounded-none border-none">
        <CardContent className="w-full "> */}
      <div className=" mt-20 flex justify-center ">
        <Table
          filteredData={filteredData}
          columns={columns}
          isLoading={isLoading}
          search={search}
          setSearch={setSearch}
          report={report}
          reportFilename="Payments"
          addButtonTitle="Add Payment"
          isAdd={true}
          addModal={HandleForm}
        />
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
