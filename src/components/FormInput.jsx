import React from "react";

const FormInput = ({ label, name, type, defaultValue, placeholder = "" }) => {
	return (
		<div className="form-control ">
			<label className="label">
				<span className="label-text">{label}</span>
				{/* <span className="label-text-alt">Top Right label</span> */}
			</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className="input input-bordered "
			/>
			{/* <label className="label">
				<span className="label-text-alt">Bottom Left label</span>
				<span className="label-text-alt">Bottom Right label</span>
			</label> */}
		</div>
	);
};

export default FormInput;
