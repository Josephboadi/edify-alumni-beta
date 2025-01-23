// import { auth } from "@/auth";
import { ReactNode } from "react";
import Layout from "./_components/common/Layout";

interface AdminLayoutProps {
  children: ReactNode;
  // params: any;
}
const AdminLayout = async ({ children }: AdminLayoutProps) => {
  // const session = await auth();
  // if (!session) {
  //   return <Home />;
  // }
  return <Layout>{children}</Layout>;
};

export default AdminLayout;
