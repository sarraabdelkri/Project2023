import { AppLayout } from "@/widgets/layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddContract } from "@/components/contract";
import { PrimaryButton } from "../widgets/buttons/primary-button";
import { Container, Row, Col } from "react-bootstrap";

export function AddContracts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const checkUser = () => {
    if (!user) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppLayout>
      <AppLayout.Header>Dashboard</AppLayout.Header>

      <Container>
        <Row>
          <Col md={8}>
            <AddContract />;
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </AppLayout>
  );
}

export default AddContracts;
