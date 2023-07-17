import { useState, useEffect } from "react";
import useAssessmentStore from "@/store/assessmentStore";
import { Assessment } from ".";

export function AssessmentsList() {
  const fetchAssessments = useAssessmentStore(
    (state) => state.fetchAssessments
  );
  const assessments = useAssessmentStore((state) => state.assessments);
  const categories = [
    "Algorithms and Data Structures",
    "Artificial Intelligence",
    "Computer Architecture",
    "Computer Graphics",
    "Computer Networks",
    "Computer Security and Cryptography",
    "Computer Systems and Operating Systems",
    "Database Systems",
    "Human-Computer Interaction",
    "Machine Learning",
    "Programming Languages",
    "Software Engineering",
    "Web Development",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchAssessments();
  }, []);

  const filteredAssessments = assessments.filter((assessment) => {
    const nameMatch = assessment.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch =
      !selectedCategory || assessment.category === selectedCategory;
    return nameMatch && categoryMatch;
  });

  return (
    <div className="h-full overflow-scroll px-6 pb-10 pt-4">
      <div className="mb-3 flex space-x-3">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-64 rounded-md border px-2 py-1"
        />
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="rounded-md border px-2 py-1"
          style={{ height: "40px", width: "20px" }}
        >
          <option value="">All categories</option>
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {filteredAssessments.map((assessment, i) => {
        return (
          <div className="mb-3" key={i}>
            <Assessment assessment={assessment} />
          </div>
        );
      })}
    </div>
  );
}

export default AssessmentsList;
