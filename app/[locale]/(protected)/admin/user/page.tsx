import { getusers } from "@/actions/user";
import { UserDataTable } from "../_components/User";

const User = async () => {
  const userDataQuery = await getusers();
  return (
    <div className="text-black">
      <UserDataTable userDataQuery={userDataQuery} />
    </div>
  );
};

export default User;
