import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Admin Panel
                </h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email}
                            type="email"
                            id="email"
                            placeholder="your@email.com"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 font-medium mb-2"
                        >
                            Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-500 text-sm mt-4">
                    Forgot your password?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Reset it here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login
