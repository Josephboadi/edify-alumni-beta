const Breadcrump = ({ prePath, title }: any) => {
  return (
    <div className="w-full mt-2 pt-2 pl-2 flex gap-6 items-center">
      <p className="text-xl font-normal text-[var(--clr-secondary-v1)]">
        {prePath} / {"   "}
        <span className="text-[var(--clr-secondary)] font-semibold capitalize">
          {"   "}
          {title}
        </span>
      </p>
    </div>
  );
};

export default Breadcrump;
