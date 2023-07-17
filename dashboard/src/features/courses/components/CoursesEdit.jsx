import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import useCourseStore from "../store";

const CoursesEdit = () => {
    const navigate = useNavigate();

    const courseId = useSearchParams()[0].get("id");
    const _course = useCourseStore((state) => state.courses.find((course) => course._id === courseId));
    useEffect(() => {
        if (!_course || !courseId) {
            navigate("/courses");
        } else {
            setCourse(_course);
        }
    }, [])

    const handleSubmit = () => {
        setError("");
        if (!course.name || !course.description || !course.category) {
            setError("Please fill all fields");
            return;
        }
    };

    const [error, setError] = useState("");

    const [course, setCourse] = useState({
        name: "",
        description: "",
        category: "",
        duration: 1,
        price: 1,
    });

    return (
        <div>
            <h1 className="text-xl font-bold">Edit course</h1>
            <div className="mt-6 flex flex-col gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                        value={course.name}
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="p-3 outline-none bg-secondary rounded-md w-96 min-h-[150px]"
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                        value={course.description}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Category"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setCourse({ ...course, category: e.target.value })}
                        value={course.category}
                    />
                </div>
                <div className="flex gap-3 items-center text-darker-t">
                    <input
                        type="number"
                        min={1}
                        placeholder="Duration"
                        className="p-3 outline-none bg-secondary rounded-md w-28"
                        onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                        value={course.duration}
                    />
                    <div>Week(s)</div>
                </div>
                <div className="flex gap-3 items-center text-darker-t">
                    <input
                        type="number"
                        min={1}
                        placeholder="Price"
                        className="p-3 outline-none bg-secondary rounded-md w-20"
                        onChange={(e) => setCourse({ ...course, price: e.target.value })}
                        value={course.price}
                    />
                    <div>TND</div>
                </div>
                {error && (
                    <div>
                        <p className="text-red-400 text-sm italic font-medium">{error}</p>
                    </div>
                )}
                <div>
                    <button
                        className="py-3 px-6 rounded-md flex items-center bg-emerald-500/80 hover:bg-emerald-500/60"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoursesEdit;
