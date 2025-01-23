import { NewVerificationForm } from "@/components/auth/new-verification-form";

const NewVerificationPage = () => {
  return (
    <div className="p-0  w-max  flex items-center justify-center bg-transparent border-none !z-[10000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
