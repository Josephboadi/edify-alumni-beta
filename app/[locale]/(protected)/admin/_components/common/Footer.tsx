const Footer = () => {
  return (
    <div className="flex items-center px-4 pb-2">
      <p className="text-[var(--clr-silver-v5)] text-sm">
        Copyright &copy; {new Date().getFullYear()}
        <span className="text-[var(--tertiary)]">
          {" "}
          Edify-Alumni All rights reserved.
        </span>
      </p>
    </div>
  );
};

export default Footer;
