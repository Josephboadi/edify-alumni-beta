"use client";
import { comment } from "@/actions/comment";
import Wrapper from "@/components/common/Wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
// import { discussionListData } from "@/data/discussionlist";
import { CommentSchema, DiscussionData } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
// import moment from "moment";
// import Image from "next/image";
// import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import * as z from "zod";

const SingleDiscussion = ({
  discussionData,
}: {
  discussionData: DiscussionData;
}) => {
  // const params = useParams();
  // const [discussionData, setDiscussionData] = useState<Discussion>();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CommentSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      comment(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };

  // useEffect(() => {
  //   if (error) {
  //     toast(error);
  //   }
  //   if (success) {
  //     toast(success);
  //   }

  //   return;
  // }, [error, success]);

  // useEffect(() => {
  //   discussionListData.map((discussion) => {
  //     if (discussion.key.toString() === params.id.toString()) {
  //       setDiscussionData(discussion);
  //     }
  //   });
  //   return;
  // }, []);

  return (
    <>
      <div className=" w-full !mb-5">
        <section className=" w-full  pb-10">
          <Wrapper>
            <div className="md:px-10 xl:px-14 w-full">
              <Card className="w-full bg-[var(--clr-secondary)] shadow-md !px-0 py-3  rounded-[12px] border-none">
                <CardContent className="relative w-full px-3 sm:px-4">
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-2 flex-1">
                      <Avatar className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] relative">
                        {/* <Suspense
                                    fallback={
                                      <FaSpinner className="animate-spin" />
                                    }
                                  > */}
                        <AvatarImage src={discussionData?.image || ""} />
                        {/* </Suspense> */}
                        <AvatarFallback className="bg-[var(--clr-silver)] text-[var(--clr-secondary)] text-lg font-bold">
                          {discussionData?.createdBy
                            ?.split("")
                            ?.shift()
                            ?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-wrap flex-1 mt-[6px] gap-[6px]">
                        <p className=" text-[14px] leading-4 font-bold text-[var(--clr-primary)]">
                          {discussionData?.topic}
                        </p>
                        <p className=" text-xs font-normal text-[var(--clr-primary)]">
                          By {discussionData?.createdBy}
                        </p>
                      </div>
                    </div>
                    <div className=" mt-[6px]">
                      <p className=" text-center text-xs font-normal italic text-[var(--clr-primary)]">
                        {moment(discussionData?.createdAt).format("ll")}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 w-full flex  py-0">
                  <div className="flex justify-between gap-4 w-full">
                    <div className="flex flex-1 flex-wrap gap-2 items-center px-1">
                      {discussionData?.hashTags?.map((tag: any, index: any) => (
                        <p
                          key={index}
                          className=" capitalize text-xs text-center font-semibold text-[var(--clr-primary)]"
                        >
                          #{tag.hash}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <div className="w-full px-1 md:px-2 flex justify-center">
                <Card className="w-full flex flex-col min-h-[70vh] h-[70vh] max-h-[70vh] overflow-y-none bg-[var(--clr-silver-v2)] border-x-4 border-b-4 border-[var(--clr-primary)] rounded-none rounded-b-[10px]">
                  <CardContent className="relative w-full px-4 sm:px-6 py-4 min-h-[57vh] overflow-y-auto no-scrollbar flex flex-col gap-5">
                    {discussionData?.comments?.map(
                      (comment: any, index: any) => (
                        <div
                          className={`flex w-full gap-2 ${comment.isMyComment ? "justify-end" : "justify-start"}`}
                          key={comment.id}
                        >
                          <div
                            className={`flex w-[80%] sm:w-[72%] md:w-[64%] lg:w-[51%] gap-2 sm:gap-5 ${comment.isMyComment ? " flex-row-reverse" : " flex-row"}`}
                          >
                            <Avatar className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] relative">
                              {/* <Suspense
                                    fallback={
                                      <FaSpinner className="animate-spin" />
                                    }
                                  > */}
                              <AvatarImage src={comment?.image || ""} />
                              {/* </Suspense> */}
                              <AvatarFallback className="bg-[var(--clr-secondary)] text-[var(--clr-primary)] text-lg font-bold">
                                {comment?.createdBy
                                  ?.split("")
                                  ?.shift()
                                  ?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-xs sm:text-sm md:text-base lg:text-lg flex flex-col p-4 rounded-[10px] bg-[var(--clr-primary)] shadow-sm">
                              {comment.comment}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </CardContent>
                  <CardFooter className="px-3 sm:px-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full gap-2 h-[10vh] items-end"
                      >
                        <div className="w-full flex-1 h-full flex items-end">
                          <div className=" w-full">
                            <FormField
                              control={form.control}
                              name="comment"
                              render={({ field }) => (
                                <FormItem>
                                  {/* <FormLabel>Email</FormLabel> */}
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      disabled={isPending}
                                      placeholder="Type Your Comment Here."
                                      className={`rounded-[6px]  !min-h-[45px] !max-h-[10vh] bg-[var(--clr-primary)] placeholder:text-left ${
                                        form.formState.errors.comment
                                          ? "border border-red-500 focus-visible:ring-0"
                                          : "focus-visible:ring-transparent border-none"
                                      }`}
                                    />
                                  </FormControl>
                                  {/* <FormMessage className="text-left pl-1 italic" /> */}
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className=" col-span-3 md:col-span-3 lg:col-span-3 h-[45px] mb-[2px] flex items-end ">
                          <Button
                            disabled={isPending}
                            //   type="submit"

                            className="hidden md:block px-5 h-full rounded-[6px] bg-[var(--clr-secondary)] text-[var(--clr-primary)] text-sm font-semibold"
                          >
                            Post Comment
                          </Button>

                          <Button
                            disabled={isPending}
                            //   type="submit"
                            size={"icon"}
                            variant={"ghost"}
                            className=" w-full flex items-center justify-center block md:hidden  rounded-[6px] text-[var(--clr-secondary)] text-sm font-semibold"
                          >
                            <MdSend className="text-[var(--clr-secondary)] text-4xl" />
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </Wrapper>
        </section>
      </div>
    </>
  );
};

export default SingleDiscussion;
