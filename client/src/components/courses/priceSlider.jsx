import React from "react";
import { Card, CardContent, Typography, Slider } from "@mui/material";

import { Container, Row, Col } from "react-bootstrap";

function PriceRangeSlider({ priceRange, handlePriceRangeChange }) {
  return (
    <>
      <div className="d-flex">
        <div className="mr-3">Price:</div>

        <div style={{ width: 120 }}>
          <Slider
            getAriaLabel={() => "price range"}
            value={priceRange}
            min={0}
            max={10000}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            sx={{
              color: '#1E9645',
            }}
          />
        </div>
      </div>
    </>
  );
}

export default PriceRangeSlider;
