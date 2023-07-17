import { AppLayout } from "@/widgets/layout";
import { useEffect, useState } from "react";
import courseStore from "@/store/courseStore";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import PriceRangeSlider from "../courses/priceSlider";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Form, FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import dollaricon from "../../../public/img/money.png";
import durationicon from "../../../public/img/duration.png";
import courseicon from "../../../public/img/course.png";
import stylesheet from "../../../public/css/stylesheet.css"
import { Card } from "@material-ui/core";
export function Courses() {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchCourses = courseStore((state) => state.fetchCourses);
    const predictRecommandedCourses = courseStore((state) => state.predictRecommandedCourses);
    const userId = user ? user._id : null;
    const courses = courseStore((state) => state.courses);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [recommendedCourses, setRecommandedCourses] = useState([]);

    const [priceRange, setPriceRange] = useState([900, 9000]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const buttonStyle = {
        backgroundColor: "green",
        color: "black",
        border: "2px solid green",
        borderRadius: "20px",
    };

    const customselect = {
        border: "1px solid grey",
        borderRadius: "5px",
        padding: "5px 10px",
        fontSize: "16px",
        color: "grey",
        backgroundColor: "#fff",
        width: "11rem",
    };

    const filteredCourses = courses.filter((course) => {
        if (selectedCategory && selectedCategory !== "All") {
            return (
                course.category === selectedCategory &&
                course.price >= priceRange[0] &&
                course.price <= priceRange[1] &&
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return (
            course.price >= priceRange[0] &&
            course.price <= priceRange[1] &&
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleCourseClick = (id) => {
        setSelectedCourseId(id);
    };
    const predict = async () => {
        if (!userId) {
            return;
        }
        const res = await predictRecommandedCourses(userId);
        console.log('res:', res.data);
        setRecommandedCourses(res.data);
    };
    useEffect(() => {
        fetchCourses();
        predict()
    }, []);
    return (
        <>
            <AppLayout>
                <AppLayout.Header>Courses</AppLayout.Header>
                <Container className="border-r pb-2 pt-2">
                    <Row>
                        <Col className="mr-auto pb-1">
                            <Row
                                style={{
                                    overflowY: "scroll",
                                    maxHeight: "calc(100vh-100px)",
                                    maxWidth: "640px",
                                }}
                            >
                                {filteredCourses.map((course) => {
                                    return (
                                        <div className="mb-32 w-full lg:mb-5" key={course._id}>
                                            <ul>
                                                <li className="hover:bg-gray-gray0 relative flex cursor-pointer border-b border-gray-300">
                                                    <a className="w-full" href="">
                                                        <div className="flex items-start p-2 sm:p-5 ">
                                                            <div className="mr-2">
                                                                <img
                                                                    alt=" "
                                                                    loading="lazy"
                                                                    width="30"
                                                                    height="30"
                                                                    decoding="async"
                                                                    data-nimg="1"
                                                                    className="mr-1  object-cover"
                                                                    src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${course.name}.svg`}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="mb-0.5 flex items-center justify-between">
                                                                    <p className="text-base font-medium  ">
                                                                        <Link
                                                                            to={`/courses/${course._id}`}
                                                                            onClick={() =>
                                                                                handleCourseClick(course._id)
                                                                            }
                                                                        >
                                                                            {" "}
                                                                            <span>{course.name} </span>
                                                                        </Link>

                                                                        <span className="text-sm font-normal">
                                                                            at Tunisia
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className="mb-3 flex flex-wrap items-center">
                                                                    <p className="mb-1 mr-1 text-xs font-normal sm:mb-0">
                                                                        {" "}
                                                                        • {course.enrollment} Participants{" "}
                                                                    </p>
                                                                    <p className=" text-gray mb-1 mr-1 text-xs font-normal sm:mb-0">
                                                                        {" "}
                                                                        • [{" "}
                                                                        {format(
                                                                            new Date(course.startdate),
                                                                            "yyyy-MM-dd"
                                                                        )}{" "}
                                                                        -{" "}
                                                                        {format(
                                                                            new Date(course.enddate),
                                                                            "yyyy-MM-dd"
                                                                        )}
                                                                    </p>
                                                                    <p className=" mb-1 text-xs font-normal sm:mb-0">
                                                                        {" "}
                                                                        ] • 8 days ago
                                                                    </p>
                                                                </div>
                                                                <div className="mt-2 hidden lg:block">
                                                                    <div className="mt-1 flex flex-wrap items-start">
                                                                        <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                                                            <img
                                                                                alt=" "
                                                                                loading="lazy"
                                                                                width="16"
                                                                                height="16"
                                                                                decoding="async"
                                                                                data-nimg="1"
                                                                                className="mr-1 h-4 w-4 object-cover"
                                                                                src={courseicon}
                                                                            />

                                                                            <span className="capitalize leading-5 lg:inline">
                                                                                {course.category}
                                                                            </span>
                                                                        </span>
                                                                        <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                                                            <img
                                                                                alt=" "
                                                                                loading="lazy"
                                                                                width="16"
                                                                                height="16"
                                                                                decoding="async"
                                                                                data-nimg="1"
                                                                                className="mr-1 h-4 w-4 object-cover"
                                                                                src={durationicon}
                                                                            />
                                                                            <span className="capitalize leading-5 lg:inline">
                                                                                {course.duration} Months{" "}
                                                                            </span>
                                                                        </span>
                                                                        <span className="border-primaryBorder hover:bg-gray-gray1 mb-2 mr-2 inline-flex items-center justify-between rounded-full border bg-white px-3 py-0.5 text-xs capitalize ">
                                                                            <img
                                                                                alt=" "
                                                                                loading="lazy"
                                                                                width="18"
                                                                                height="18"
                                                                                decoding="async"
                                                                                data-nimg="1"
                                                                                className="mr-1 h-5 w-5 object-cover"
                                                                                src={dollaricon}
                                                                            />
                                                                            <span className="capitalize leading-5 lg:inline" />
                                                                            {course.price} Dt
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col className="mr-12 pt-5" sm={4}>
                            <Container className="d-flex flex-column justify-content-between h-40">
                                {user && recommendedCourses.length > 0 && (
                                    <div style={{ border: "1px solid #DEE2E6", padding: "10px", borderRadius: "10px", backgroundColor: "#FFF3E0" }} className="mr-5">
                                        <Row className="d-flex mb-2 justify-content-center pt-2">
                                            <p style={{ fontSize: "14px", color: "black", textAlign: "center" }}>Best suitable to you:</p>
                                            {recommendedCourses.slice(0, 2).map((course) => (
                                                <Col key={course._id} sm={9} md={4} lg={4} xl={5} className="my-3">
                                                    <Link to={`/courses/${course._id}`} className="text-decoration-none">
                                                        <div className="card course-card h-90 text-center">
                                                            <img
                                                                src={`https://d26c7l40gvbbg2.cloudfront.net/tool_icons/${course.name}.svg`}
                                                                alt={course.name}
                                                                className="mb-2 mx-auto"
                                                                width={"30"}
                                                                height={"30"}
                                                            />
                                                            <h5 className="card-title">{course.name}</h5>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>)}
                                <Row className="mb-2 mt-5 ml-8">
                                    <Col className="pb-5">
                                        <Form>
                                            <FormControl
                                                type="text"
                                                placeholder="Search for courses"
                                                value={searchTerm}
                                                onChange={handleSearchTermChange}
                                                style={{ maxWidth: "175px" }}
                                            />
                                        </Form>
                                    </Col>
                                </Row>
                                <Row className="mb-2 ml-8">
                                    <Col>
                                        <select
                                            className="mb-5"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            style={customselect}
                                        >
                                            {" "}
                                            <option value="All">All</option>
                                            <option value="Artificial Intelligence">
                                                Artificial Intelligence
                                            </option>
                                            <option value="Web Development">Web Development</option>
                                            <option value="Computer Graphics">
                                                Computer Graphics
                                            </option>
                                            <option value="Database Systems">Database Systems</option>
                                            <option value="Machine Learning">Machine Learning</option>
                                            <option value="Computer Security">
                                                Computer Security
                                            </option>
                                            <option value="Algorithms and Data Structures">
                                                Algorithms and Data Structures
                                            </option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="d-flex mb-2 justify-center ml-8">
                                    <Col>
                                        <PriceRangeSlider
                                            priceRange={priceRange}
                                            handlePriceRangeChange={handlePriceRangeChange}
                                        />
                                    </Col>
                                </Row>

                            </Container>
                        </Col>
                    </Row>
                </Container>
            </AppLayout>
        </>
    );
}

export default Courses;
