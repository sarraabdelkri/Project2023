import { useRef, useState, useEffect, useMemo } from "react";
import { MoreVertical } from "react-feather";
import { useNavigate } from "react-router-dom";
import "./table.less";
import TableHeader from "./TableHeader";
import TableSearch from "./TableSearch";
import CrudDropdown from "../dropdown/CrudDropdown";

import UserRow from "@users/components/table/UserRow";
import CourseRow from "@courses/components/table/CourseRow";
import JobRow from "@jobs/components/table/JobRow";
import ContractRow from "@/features/contracts/components/table/ContractRow";
import AssessmentRow from "@/features/assessments/components/table/AssessmentRow";
import EmployerRow from "@/features/users/components/table/EmployerRow";

const Table = ({ headers, items, noAdd, users, courses, jobs, contracts, assessments, employers }) => {
    const navigate = useNavigate();

    const [isAllChecked, setAllChecked] = useState(false);
    const [search, setSearch] = useState("");

    let allCheckedRef = useRef();

    const selectAll = (ref) => {
        allCheckedRef = ref;
        const checked = allCheckedRef.current.checked;
        setAllChecked(checked);
    };

    useMemo(() => {
        const mycheckboxes = document.querySelectorAll(".checkbox-select");
        if (!isAllChecked) {
            mycheckboxes.forEach((c) => {
                c.checked = false;
            });
        } else {
            mycheckboxes.forEach((c) => {
                c.checked = true;
            });
        }
    }, [isAllChecked]);

    const handleChange = (e) => {
        // const checked = e.target.checked;
        // if (!checked) {
        //     allCheckedRef.current.checked = false;
        // }
    };

    const handleSearch = (value) => {
        setSearch(value);
    };

    const getItems = () => {
        if (!search.trim()) return items;

        let filtered = items.filter((u) => {
            return Object.keys(u).some((key) => {
                if (typeof u[key] === "string") {
                    return u[key].toLowerCase().includes(search);
                }
                return false;
            });
        });
        return filtered;
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <TableSearch placeholder="Search..." onSearch={handleSearch} />
                {!noAdd && (
                    <CrudDropdown
                        element={
                            <div className="btn btn-ghost btn-xs cursor-pointer">
                                <span className="text-xs font-bold">
                                    <MoreVertical size={20} />
                                </span>
                            </div>
                        }
                        onAddClick={() => {
                            navigate("./add");
                        }}
                        onDeleteClick={() => { }}
                    />
                )}
            </div>
            <div className="overflow-x-auto w-full overflow-hidden">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <TableHeader header headers={headers} handleCheckbox={selectAll} />
                    <tbody>
                        {users &&
                            getItems().map((item, index) => (
                                <UserRow key={index} user={item} />
                            ))}
                        {courses &&
                            getItems().map((item, index) => (
                                <CourseRow key={index} course={item} />
                            ))}
                        {jobs &&
                            getItems().map((item, index) => (
                                <JobRow key={index} job={item} />
                            ))}
                        {contracts &&
                            getItems().map((item, index) => (
                                <ContractRow key={index} contract={item} />
                            ))}
                        {assessments &&
                            getItems().map((item, index) => (
                                <AssessmentRow key={index} assessment={item} />
                            ))}
                        {employers &&
                            getItems().map((item, index) => (
                                <EmployerRow key={index} user={item} />
                            ))}
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th></th>
                            {headers.map((h, index) => (
                                <th key={index}>{h}</th>
                            ))}
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Table;
