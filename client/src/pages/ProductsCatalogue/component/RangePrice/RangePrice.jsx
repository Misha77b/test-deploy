import React, { useState } from "react";
import { Box, Slider } from "@mui/material";

function RangeSlider({ setPriceParams }) {
	const [value, setValue] = useState([2000, 20000]);
	const valuetext = (val) => {
		return `${val}`;
	};
	return (
		<Box sx={{ width: 250, margin: 0 }}>
			<Slider
				sx={{
					margin: 0,
					"& .css-14pt78w-MuiSlider-rail": { margin: 0 },
					"& .css-ouckof-MuiSlider-valueLabel": { backgroundColor: "rgba(0,112,66,0.3)" },
					"& .MuiSlider-valueLabelLabel": {
						left: "calc(-50% + 4px)",
						padding: 0,
						margin: 0,
						color: "#000000",
					},
				}}
				color="secondary"
				getAriaLabel={() => "Ціна"}
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
					setPriceParams(value[0], value[1]);
				}}
				valueLabelDisplay="auto"
				min={2000}
				max={100000}
				step={500}
				getAriaValueText={() => {
					valuetext(value);
				}}
			/>
		</Box>
	);
}
export default RangeSlider;
