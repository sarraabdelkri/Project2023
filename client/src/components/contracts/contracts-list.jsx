import { useEffect } from "react";
import useContractStore from "@/store/contractStore";
import { Contract } from ".";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import React, { useRef } from "react";
import Pagination from "./pagination";
import { Container, Row, Col } from "react-bootstrap";

export function ContractsList() {
  const fetchContracts = useContractStore((state) => state.fetchContracts);
  const contracts = useContractStore((state) => state.contracts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredContracts =
    selectedStatus && selectedStatus !== "All"
      ? contracts.filter(
        (contract) => contract.contractstatus === selectedStatus
      )
      : contracts;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = contracts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Row
      style={{
        overflowY: "scroll",
        maxHeight: "550px",
        maxWidth: "640px",
      }}
    >
      <Container>
        <Row>
          <Col md={6}>
            <input
              type="text"
              placeholder="Search for a contract"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Col>
          <Col md={6}>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="All">Select status</option>
              <option value="Active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="Renewed">Renewed</option>
            </select>
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Row>
          {filteredContracts.map((contract, i) => {
            if (
              contract.contractstatus
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return (
                <div className="mb-3" key={i}>
                  <Contract contract={contract} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </Row>
      </Container>
    </Row>
  );
}

export default ContractsList;