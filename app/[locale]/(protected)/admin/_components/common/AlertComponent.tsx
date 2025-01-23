import { TbAlertTriangleFilled } from "react-icons/tb";
import { AlertCardWrapper } from "./alert-card-wrapper";

export const HandleConfirmPrompt = ({
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
