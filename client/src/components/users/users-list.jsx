import { useEffect } from "react";
import useUserStore from "@/store/userStore";
import { User } from ".";

export function UsersList() {
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const users = useUserStore((state) => state.users);

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-full overflow-scroll px-6 pt-4 pb-10">
      <div className="mb-6 text-sm font-medium uppercase">Users list</div>
      {users.map((user, i) => {
        return (
          <div className="mb-3" key={i}>
            <User user={user} />
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
