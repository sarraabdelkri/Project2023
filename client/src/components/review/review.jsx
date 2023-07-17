import React from "react";

import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useReviewStore from "@/store/reviewStore";
import courseStore from "@/store/courseStore";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

export function Review() {
    const course = courseStore((state) => state.course);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    console.log("userId", userId);
    const { id } = useParams();
    const courseId = id;
    console.log("courseId", courseId);
    const [rating, setRating] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const reviewData = {
            rating: rating,
        };
        let url = `https://expertise-shaper-37ut.onrender.com/api/review/${courseId}/reviews/${userId}`;
        console.log("url", url);
        try {
            const response = await axios.post(url, reviewData);
            console.log("response", response);
            toast.success("Review added successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while adding your review");
        }
        setRating("");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="rating"
                    value={rating}
                    precision={1}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default Review;
