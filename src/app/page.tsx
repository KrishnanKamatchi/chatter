"use client";

import Image from "next/image";
import chatIcon from "../../public/chat.png";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      room: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: yup.object({
      room: yup.string().required("Room is required"),
    }),
  });

  return (
    <main className="flex justify-center items-center min-h-screen light:text-black ">
      <div className=" bg-green-950 ring-1 ring-white shadow-lg shadow-green-400 p-10 m-5 rounded-md">
        <h1 className="text-3xl font-bold text-white flex">
          Chatter
          <Image
            src={chatIcon}
            width={25}
            height={25}
            className="object-contain ml-2 "
            alt="ChatIcon"
          />
        </h1>
        <p className="text-white mt-1">
          A private chat application for
          <span className="badge badge-success badge-md ml-2 bg-green-500 animate-pulse font-semibold ring-1 ring-white">
            anonymity
          </span>
        </p>
        <div className="mt-5 w-full max-w-xs text-white flex justify-space-between items-center p-2 flex-col">
          <form onSubmit={formik.handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white font-semibold">
                  Create a room
                </span>
                <span className="label-text-alt  text-white">
                  {formik.touched.room && formik.errors.room ? (
                    <p className="text-red-500">{formik.errors.room}</p>
                  ) : (
                    <p> Enter a room name</p>
                  )}
                </span>
              </div>
              <input
                type="text"
                name="room"
                placeholder="Room Name or Id: Class1 "
                value={formik.values.room}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered input-success w-full max-w-xs placeholder:text-center dark:text-white text-black text-center font-semibold"
              />
            </label>

            <div className="divider">OR</div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-white font-semibold">
                  Join a room
                </span>
                <span className="label-text-alt text-white">
                  Enter a valid ID
                </span>
              </div>
              <input
                type="text"
                placeholder="Room Name or Id "
                className="input input-bordered input-success w-full max-w-xs placeholder:text-center  dark:text-white text-black text-center font-semibold"
              />
            </label>
          </form>
        </div>
        <button className="btn btn-outline btn-succes border-white w-full mt-5 rounded-full hover:bg-green-500 text-white hover:text-black">
          Submit
          {/* <span className="loading loading-spinner"></span> */}
        </button>
      </div>
    </main>
  );
}
