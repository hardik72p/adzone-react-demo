import React from 'react';
import { Label, FormGroup, Input, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import 'scss/my-scss.scss';


// import './LogIn.css';


export const InputBox = (props) => {
	return (
		<FormGroup className="input-box-style" >
			<Label className="label">
				{props.label}
				{props.label && props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<Input
				className="input"
				title={props.label}
				placeholder={props.placeHolder}
				className={props.className}
				type={props.type}
				name={props.name}
				data-attribute={props.isReq}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				onClick={props.onClick}
			/><br />
			{props.errorMessage ? <span style={{ color: "red" }}> {props.errorMessage} </span> : <br />}
		</FormGroup >
	);
}

InputBox.defaultProps = {
	isReq: false
}

InputBox.propTypes = {
	type: PropTypes.string.isRequired,                                                                                                    //when we declare any props which is Required then must be defined their "its default value".
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.oneOf(
		['number', 'string']
	)
}

export const CheckBox = (props) => {

	return (
		<FormGroup className="input-box-style">
			<Label>
				{props.label}
				{props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			{
				props.list.map((item, i) => {
					return (
						<label className="label" key={i} className="mr-2">
							{
								props.checkOne
									?
									<input
										className="input"
										type="checkbox"
										name={props.name}
										title={props.label}
										value={item.value}
										data-attribute={props.isReq}
										checked={props.checkOne == item.value}
										onChange={props.onChange}
										onBlur={props.onBlur}
									/>
									: <input
										className="input"
										type="checkbox"
										name={props.name}
										title={props.label}
										value={item.value}
										data-attribute={props.isReq}
										onChange={props.onChange}
										onBlur={props.onBlur}
									/>
							}
							{item.label}
						</label>
					);
				})
			}
			{props.errorMessage && <span style={{ color: "red" }}> {props.errorMessage} </span>}
		</FormGroup>
	);
}

export const MyRadio = (props) => {
	return (
		<FormGroup className="input-box-style">
			<Label className="label">
				{props.label}
				{props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			{props.list.map((item, i) => {
				return (
					<label key={i} className="mr-2">
						<input
							className="input"
							type="radio"
							name={props.name}
							title={props.label}
							value={item.value}
							data-attribute={props.isReq}
							onChange={props.onChange}
							onBlur={props.onBlur}
						/> {item.label}
					</label>
				);
			})}<br />
			{props.errorMessage && <span style={{ color: "red" }}> {props.errorMessage} </span>}
		</FormGroup>
	);
}


export const DropDown = (props) => {
	return (
		<FormGroup className="input-box-style">
			<Label className="label">
				{props.label}
				{props.isReq && <span style={{ color: "red" }}> * </span>}
			</Label><br />
			<select
				className="input"
				name={props.name}
				title={props.label}
				data-attribute={props.isReq}
				onChange={props.onChange}
				onBlur={props.onBlur}
			>
				<option value='' >Select...</option>
				{props.list.map((item, i) => {
					return (
						<option
							value={item.value}
						>	{item.label}</option>
					);
				})}
			</select><br />
			{props.errorMessage && <span style={{ color: "red" }}> {props.errorMessage} </span>}
		</FormGroup>
	);
}