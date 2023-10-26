import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object({

    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

});

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log("working", data);
            const response = await axios.post("http://localhost:8000/users", data);

            console.log("Registration successful", response.data);

            // Optionally, you can show a success message using toast or other methods.

            // Clear the form
            document.getElementById("registration-form").reset();
        } catch (error) {
            console.error("Registration failed", error);

            // Optionally, you can show an error message using toast or other methods.
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} id="registration-form">

                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-white">Email</label>
                        <input
                            name="email"
                            type="text"
                            {...register("email")}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-white">Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register("password")}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-1">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}


export default Login;