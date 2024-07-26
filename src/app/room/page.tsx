"use client";

import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { Formik } from "formik";
import * as yup from "yup";
import ChatBubble from "@/components/ChatBubble";
import { io } from "socket.io-client";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [msgs, setMsgs] = useState<Array<string>>([]);
  const socket = io("http://127.0.0.1:3100", {
    auth: {
      serverOffset: 0,
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // console.log("hi");

    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  return (
    <div className="flex justify-center h-screen p-5">
      <div className="mockup-window bg-base-300 border h-full w-full">
        <div className="flex h-full">
          <div className="md:flex flex-none w-1/4 bg-stone-800 justify-center hidden">
            <ul className="menu p-4 rounded-box w-full m-2 bg-slate-900 gap-6">
              <li>
                <a href="">
                  <div className="avatar online">
                    <div className="w-14 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  Room1
                </a>
              </li>
              <li>
                <a href="">Room2</a>
              </li>
              <li>
                <a href="">Room2</a>
              </li>
              <li>
                <a href="">Room2</a>
              </li>
              <li>
                <a href="">Room2</a>
              </li>
              <li>
                <a href="">Room2</a>
              </li>
            </ul>
          </div>
          <div className="grow bg-stone-800 grid grid-rows-12 grid-cols-1 p-2 gap-3">
            <div
              id="chatBox"
              className="bg-zinc-700 p-4 m-1 w-full row-span-11 mx-auto rounded-lg overflow-y-auto"
            >
              {msgs}
            </div>
            <Formik
              initialValues={{ message: "" }}
              validationSchema={yup.object().shape({
                message: yup
                  .string()
                  .required("Required")
                  .min(1, "Does not match pattern")
                  .max(500, "Does not match pattern")
                  .trim("Does not match pattern"),
              })}
              onSubmit={(values, { setSubmitting, setValues }) => {
                const msg = (
                  <ChatBubble
                    key={Math.random()}
                    message={values?.message}
                    sender="Me"
                    position="end"
                    status="Delivered"
                  />
                );
                setValues({ message: "" });

                setMsgs([...msgs, msg.toString()]);

                setSubmitting(false);
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex row-span-1">
                    <input
                      type="text"
                      name="message"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      placeholder="Send Message"
                      className="input input-bordered w-full bg-green-900 dark:text-white text-black "
                      autoComplete="off"
                    />
                    <button type="submit" className="btn btn-square ml-1">
                      <RiSendPlaneFill className="text-2xl" />
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
