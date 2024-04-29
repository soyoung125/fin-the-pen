import TestBox from "./box/TestBox";
import { useUser } from "@app/tanstack-query/useUser.ts";

function UserData() {
  const { data: reactQueryUser } = useUser();

  return (
    <>
      <TestBox title="tanstack-query : useUser">
        {JSON.stringify(reactQueryUser)}
      </TestBox>
    </>
  );
}

export default UserData;
