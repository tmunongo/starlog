import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PlacesLayout from "~/components/PlacesLayout";
import { getUser } from "~/utils/login.server";

type Props = {};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const data: LoaderData = {
    user,
  };

  return json(data);
};

const Profile = (props: Props) => {
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;

  return (
    <PlacesLayout>
      <>
        <div className="mt-1 md:mt-3">
          <h3 className="text-center">{data.user?.username}'s Profile</h3>
        </div>
      </>
    </PlacesLayout>
  );
};

export default Profile;
