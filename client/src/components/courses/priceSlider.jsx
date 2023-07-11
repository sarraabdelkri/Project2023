import React from "react";
import { Card, CardContent, Typography, Slider } from  "@mui/material";

function PriceRangeSlider({ priceRange, handlePriceRangeChange }) {
  return (
    <Card>
      <CardContent>
        <Typography component="div" fontSize={15}>
          Choose a price range
        </Typography>
        <div style={{ width: 150 }}>
          <Slider
            getAriaLabel={() => "price range"}
            value={priceRange}
            min={0}
            max={10000}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            color="primary"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PriceRangeSlider;
