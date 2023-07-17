import React, { useState } from "react";
import { format } from "date-fns";
import { Card, Row, Col, Button } from "react-bootstrap";
import image from "../../../public/img/logo.png";
import { Link } from "react-router-dom";
export default function OneCourse(props) {
  const [course] = useState(props.product);
  const buttonStyle = {
    backgroundColor: "green",
    color: "white",
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '10px',
  };
  
  return (
    <Card style={{ width: "20rem" }}>
      {/* <Card.Img
        variant="top"
        src={image}
        height="200"
        width="50"
      /> */}
      <Card.Body>
        <Card.Title>
          <Link>
            {course.name} Course ({course.enrollment})
          </Link>
        </Card.Title>

        <Card.Text>{course.description}</Card.Text>
        <Row>
          <Col>
            {" "}
            <Card.Text>
              {format(new Date(course.startdate), "yyyy-MM-dd")}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              {" "}
              {format(new Date(course.enddate), "yyyy-MM-dd")}
            </Card.Text>
          </Col>
        </Row>

        <Card.Text> {course.category}</Card.Text>
        <Card.Text> {course.duration} Months</Card.Text>
        <Card.Text> {course.price} Dt</Card.Text>
        <Row>
          <Col md={6}>
            <Button variant="success" size="sm" style={buttonStyle}>
              Enroll
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
