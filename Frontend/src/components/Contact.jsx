import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Contact() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        const contactInfo = {
          fullname: data.fullname,
          email: data.email,
          message: data.message,
        };
        await axios
          .post("http://localhost:4002/contact", contactInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              toast.success("Message Sent Successfully");
              navigate(from, { replace: true });
            }
            
          })
          .catch((err) => {
            if (err.response) {
              console.log(err);
              toast.error("Error: " + err.response.data.message);
            }
          });
      };
  return (
    
    <>
    <div className="flex h-screen items-center justify-center">
      <div className=" w-[600px] ">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Contact Us</h3>
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("fullname", { required: true })}
              />
              <br />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Message</span>
              <br />
              {/* <input
                type="text"
                placeholder="Type your Message"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("message", { required: true })}
              /> */}
              <textarea  name="w3review" rows="4" cols="50" placeholder='Type your message'  className="w-80 px-3 py-1 border rounded-md outline-none" 
              {...register("message", { required: true })}>
     
</textarea>
              <br />
              {errors.message && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Button */}
            <button className="bg-pink-500 text-white rounded-md my-2 px-3 py-1 hover:bg-pink-700 duration-200">
                  Contact
                </button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default Contact
