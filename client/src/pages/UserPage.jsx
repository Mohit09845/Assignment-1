import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";


const UserPage = () => {
    const [name, setName] = useState("");
    const [socialMedia, setSocialMedia] = useState("");
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };
    
    const { mutate, isLoading, isError, isSuccess, error } = useMutation(
        async (formData) => {
            return axios.post("http://localhost:8080/api/v1/user/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }
    );
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("socialMedia", socialMedia);
        Array.from(images).forEach((file) => formData.append("images", file));

        
        mutate(formData);
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold text-center">User Submission Form</h1>

            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Social Media Handle
                    </label>
                    <input
                        type="text"
                        value={socialMedia}
                        onChange={(e) => setSocialMedia(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-semibold">
                        Upload Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>

            {isSuccess && (
                <div className="mt-4 text-center text-green-600">
                    User submitted successfully!
                </div>
            )}
            {isError && (
                <div className="mt-4 text-center text-red-600">
                    Error: {error.message}
                </div>
            )}
        </div>
    );
};

export default UserPage;
