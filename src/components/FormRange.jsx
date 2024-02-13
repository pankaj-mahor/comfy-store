import React, { useState } from "react";
import { formatPriceInr } from "../utils";

const FormRange = ({ label, name, size, price }) => {
	const step = 1000;
	const maxPrice = 100000;
	const [selectedPrice, setSelectedPrice] = useState(price || maxPrice);

	return (
		<div className="form-control">
			<label htmlFor={name} className="label cursor-pointer">
				<span className="label-text capitalize">{label}</span>
				<span>{formatPriceInr(selectedPrice)}</span>
			</label>
			<input
				type="range"
				name={name}
				min={0}
				max={maxPrice}
				value={selectedPrice}
				onChange={(e) => setSelectedPrice(e.target.value)}
				className={`range range-primary ${size}`}
				step={step}
			/>
			<div className="w-full flex justify-between text-xs px-2 mt-2">
				<span className="font-bold text-md">1</span>
				<span className="font-bold text-md">
					Max : {formatPriceInr(maxPrice)}
				</span>
			</div>
		</div>
	);
};

export default FormRange;
