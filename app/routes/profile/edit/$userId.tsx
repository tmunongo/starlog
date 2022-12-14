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

  const dbUser = await prisma.user.findUnique({
  where: {
    id: params.userId,
  }
  })
  if (user.id !== dbUser.id){
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

export const action: ActionFunction = async ({ request }) => {
  const user = getUser(request);

  if (!user) {
    return json({
      errorMessage: "You must be logged in to update your profile",
    });
  }

  const dbUser = await prisma.user.findUnique({
  where: {
    id: user.id
  }
  });


  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name !== "image") {
        return undefined;
      }
      const uploadedImage = await uploadImage(data);
      console.log(uploadedImage);
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("image") || dbUser.avatar;
  const username = formData.get("username") || dbUser.username;
  const about = formData.get("about") || dbUser.about;
  const email = formData.get("email") || dbUser.email; 
  const fullName = formData.get("fullname") || dbUser.fullName;

  const updated = await prisma.user.findAndUpdate({
    where: {
      id: dbUser.id
    },
    data: {
      avatar: imgSrc,
      username: username,
      about: about,
      email: email,
      fullName: fullName
    }
  })

  return redirect(`/profile`);
}

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

       <form method="post">
      <div className="px-2 w-full lg:px-[10vw] min-h-screen w-full flex flex-col md:flex-row items-center md:items-start justify-around md:p-4">
        <div className="shadow-lg rounded-lg min-h-[50vh] md:min-h-[60vh] w-full md:w-3/4 bg-silvery dark:bg-oranj m-2 p-3">
          <div>
              <div className="flex flex-col items-start justify-around">
                <img src={data.dbUser.avatar} alt={data.dbUser.username} /> 
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  name="image"
                  alt="Upload"
                  className="p-2 m-1 md:m-4 border border-black rounded-md bg-slate-400 w-full md:w-[90%]"
                />
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  defaultValue={data.dbUser.fullName}  
                  className="border rounded-md h-10 w-full md:w-[90%] p-2 m-1 md:mx-4"
                />
                
                <label
                  htmlFor="about"
                  className="text-lg md:text-xl m-1 px-2 mx-3"
                >About</label>
                <textarea
                  name="about"
                  placeholder="Tell us a bit about yourself"
                  defaultValue={data.dbUser.about}     
                  className="border rounded-md h-24 w-full md:w-[90%] p-2 m-1 md:mx-4"
                />
                </div>
              <div className="flex items-center justify-center text-center m-4 p-2 rounded-md bg-oranj shadow-md">
              <input type="submit" value="Update Profile" />
              </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center min-h-[60vh] w-full md:w-3/4 m-2 p-0">
          <div className="md:mx-2 w-full h-64 rounded-lg p-2 bg-silvery dark:bg-oranj shadow-lg">
           
                <label
                  htmlFor="username"
                  className="text-lg md:text-xl px-2 m-1 mx-3"
                >Username</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={data.dbUser.username}     
                  className="border rounded-md h-10 w-full md:w-[90%] p-2 m-1 md:mx-4"
                />

                <label
                  htmlFor="email"
                  className="text-lg md:text-xl px-2 m-1 mx-3"
                >Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={data.dbUser.email}
                  readOnly
                  className="border rounded-md h-10 w-full md:w-[90%] p-2 m-1 md:mx-4"
                />
          </div>
          <div className="md:mx-2 w-full h-64 rounded-lg p-2 bg-silvery dark:bg-oranj shadow-lg">
            <p>
              Hi
            </p>
          </div>
        </div>
      </div>
        </form>
    </PlacesLayout>
    )}
    </>
  )
}

export default EditProfile;
