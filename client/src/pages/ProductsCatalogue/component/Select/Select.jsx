import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Selection({ arrayProps, setCurrentValue, nameLabel, value }) {
	const colorsTag = arrayProps.map((el) => (
		<MenuItem key={el} value={el} sx={{ width: "200px" }}>
			{el}
		</MenuItem>
	));
	const handleChange = (event) => {
		setCurrentValue(event.target.value);
	};

	return (
		<div>
			<FormControl fullWidth>
				<InputLabel color="secondary" id="demo-simple-select-autowidth-label">
					{nameLabel}
				</InputLabel>
				<Select
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					value={!value ? "" : value}
					autoWidth
					label={nameLabel}
					color="secondary"
					onChange={handleChange}
				>
					{colorsTag}
				</Select>
			</FormControl>
		</div>
	);
}
