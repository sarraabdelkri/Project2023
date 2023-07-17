import { useState } from "react";
import { toast } from "react-toastify";

const CoursesAdd = () => {
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
            <h1 className="text-xl font-bold">Add course</h1>
            <div className="mt-6 flex flex-col gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="p-3 outline-none bg-secondary rounded-md w-96 min-h-[150px]"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Category"
                        className="p-3 outline-none bg-secondary rounded-md"
                        onChange={(e) => setCourse({ ...course, category: e.target.value })}
                    />
                </div>
                <div className="flex gap-3 items-center text-darker-t">
                    <input
                        type="number"
                        min={1}
                        placeholder="Duration"
                        className="p-3 outline-none bg-secondary rounded-md w-28"
                        onChange={(e) => setCourse({ ...course, duration: e.target.value })}
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

export default CoursesAdd;
