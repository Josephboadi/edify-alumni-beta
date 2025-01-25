import { getusers } from "@/actions/user";
import { UserDataTable } from "../_components/User";

const User = async () => {
  let userQueryData;
  try {
    userQueryData = await getusers();
  } catch (error) {
    userQueryData = null;
  }
  return (
    <div className="text-black">
      <UserDataTable userQueryData={userQueryData} />
    </div>
  );
};

export default User;
