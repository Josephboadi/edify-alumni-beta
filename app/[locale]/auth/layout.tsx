const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[var(--clr-secondary)] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
      {children}
    </div>
  );
};

export default AuthLayout;
