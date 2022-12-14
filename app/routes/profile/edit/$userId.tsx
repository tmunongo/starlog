import React from 'react'
import { useLoaderData } from "@remix-run/react";
import PlacesLayout from "~/components/PlacesLayout";
import { getUser } from "~/utils/login.server";

type Props = {}


type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>; 
  dbUser: User;
  errorMessage?: string;
}

export const loader: LoaderFunction = async ({ request, params}) => {
  let errorMessage = ""
  const user = await getUser(request);
  if (!user) {
    return redirect('/');
  };

  const editUser = await prisma.user.findUnique({
  where: {
    id: params.userId,
  }
  })
  if (user.id !== editUser.id){
    return json({
      errorMessage: "You are not authorized to edit this profile" 
    })
  }

  return {
    user,
    dbUser,
    errorMessage,
  }
};

const EditProfile = (props: Props) => { 
  const data = useLoaderData<LoaderData>() as unknown as LoaderData;
  
  return (
    <>
    {data.errorMessage !== "" ? (
      <div className="grid place-items-center">
        <h2 className="text-grey-700">
          ERROR | {data.errorMessage}
        </h2>
      </div>
    ) : (
    <PlacesLayout>
      <div className="px-2 w-full lg:px-[10vw] min-h-screen w-full flex flex-col md:flex-row items-center md:items-start justify-around md:p-4">
        <div className="shadow-lg rounded-lg min-h-[50vh] md:min-h-[60vh] w-full md:w-3/4 bg-silvery dark:bg-oranj m-2 p-3">
          <div>
            <form method="post">
              <div className="flex flex-col items-start justify-around">
                <img src={data.dbUser.avatar} alt={data.dbUser.username} /> 
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  name="image"
                  alt="Upload"
                  className="p-2 m-1 md:m-4 border border-black rounded-md bg-slate-400 w-full md:w-2/3"
                />
              </div>     
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center min-h-[60vh] w-full md:w-3/4 m-2 p-0">
          <div className="md:mx-2 w-full h-64 rounded-lg p-2 bg-silvery dark:bg-oranj shadow-lg">
            <p>
              Hi
            </p>
          </div>
          <div className="md:mx-2 w-full h-64 rounded-lg p-2 bg-silvery dark:bg-oranj shadow-lg">
            <p>
              Hi
            </p>
          </div>
        </div>
      </div>
    </PlacesLayout>
    )}
    </>
  )
}

export default EditProfile;
