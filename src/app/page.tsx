"use client";

import Image from "next/image";
import chatIcon from "../../public/chat.png";
import { Formik } from "formik";
import * as yup from "yup";
import { ImInfo } from "react-icons/im";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center min-h-screen light:text-black ">
      <div className=" bg-green-950 ring-1 ring-white shadow-lg shadow-green-400 p-10 m-5 rounded-md">
        <h1 className="text-3xl font-bold text-white flex">
          Chatter
          <button>
            <Image
              src={chatIcon}
              width={25}
              height={25}
              className="object-contain ml-4 mt-1 hover:origin-top-left hover:rotate-12 duration-300"
              alt="ChatIcon"
            />
          </button>
        </h1>
        <p className="text-white mt-1">
          A private chat application for
          <span className="badge badge-success badge-md ml-2 bg-green-500 animate-pulse font-semibold ring-1 ring-white">
            anonymity
          </span>
        </p>
        <div className="mt-5 w-full max-w-xs text-white flex justify-space-between items-center p-2 flex-col">
          <Formik
            initialValues={{ createRoom: "", joinRoom: "" }}
            validationSchema={yup.object().shape({
              createRoom: yup
                .string()
                .min(3, "Does not match pattern")
                .max(15, "Does not match pattern")
                .matches(/^[a-zA-Z0-9]{3,15}$/, "Does not match pattern"),
              joinRoom: yup
                .string()
                .min(3, "Does not match pattern")
                .max(15, "Does not match pattern")
                .matches(/^[a-zA-Z0-9]{3,15}$/, "Does not match pattern"),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              setSubmitting(true);
              if (
                (!values.createRoom && !values.joinRoom) ||
                (values.createRoom && values.joinRoom)
              ) {
                setSubmitting(false);
                setFieldError("createRoom", "Either one required");
                setFieldError("joinRoom", "Either one required");
              } else {
                let time1 = setTimeout(() => {
                  clearTimeout(time1);
                  setSubmitting(false);

                  router.push(
                    `/room?id=${values.createRoom || values.joinRoom}`
                  );
                }, 2000);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white font-semibold">
                      Create a room
                    </span>
                    <span className="label-text-alt  text-white flex gap-2">
                      {touched.createRoom && errors.createRoom ? (
                        <p className="text-red-500">{errors.createRoom}</p>
                      ) : (
                        <p>Enter valid name</p>
                      )}
                      <span
                        className="tooltip tooltip-right tooltip-success"
                        data-tip="
                      Needs to be unique,
                      alphanumeric, 3-15 chars and required
                      "
                      >
                        <ImInfo className="text-sm text-gray-300" />
                      </span>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="createRoom"
                    placeholder="Create a room"
                    value={values.createRoom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="input input-bordered input-success w-full max-w-xs placeholder:text-center dark:text-white text-black text-center font-semibold border-l-0 border-r-0 focus:border-0  bg-green-900"
                  />
                </label>

                <div className="divider light:text-white">OR</div>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-white font-semibold">
                      Join a room
                    </span>
                    <span className="label-text-alt text-white flex gap-2">
                      {touched.joinRoom && errors.joinRoom ? (
                        <p className="text-red-500">{errors.joinRoom}</p>
                      ) : (
                        <p>Enter valid name</p>
                      )}
                      <span
                        className="tooltip tooltip-right tooltip-success"
                        data-tip="
                      Needs to be unique,
                      alphanumeric, 3-15 chars and required
                      "
                      >
                        <ImInfo className="text-sm text-gray-300" />
                      </span>
                    </span>
                  </div>
                  <input
                    name="joinRoom"
                    value={values.joinRoom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Join a room"
                    className="input input-bordered input-success w-full max-w-xs placeholder:text-center  dark:text-white text-black text-center border-l-0 border-r-0 focus:border-0 font-semibold bg-green-900"
                  />
                </label>
                <button
                  type="submit"
                  className="btn btn-outline btn-succes border-white w-full mt-5 rounded-full hover:bg-green-500 text-white hover:text-black"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
