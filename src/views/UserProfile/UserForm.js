import React, { Component } from 'react';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import 'scss/my-scss.scss';
import server from 'utilities.js';
import axios from 'axios';
import { InputBox, CheckBox, MyRadio, DropDown } from './InputBox';

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				companyName: '',
				userName: '',
				crn: '',
				email: '',
				passWord: '',
				confirmPassWord: '',
				contactNo: '',
				webSite: '',
				pinCode: '',
				type: '',
				state: '',
				city: ''
			},
			formError: {
				companyName: null,
				userName: null,
				crn: null,
				email: null,
				passWord: null,
				confirmPassWord: null,
				contactNo: null,
				webSite: null,
				pinCode: null,
				type: null,
				state: null,
				city: null

			}
		};

		this.typeList = [
			{ value: "government", label: "Government" },
			{ value: "commercial", label: "Commercial" },
			{ value: "private", label: "Private" },

		];
		this.stateList = [
			{ value: "gujarat", label: "Gujarat" },
			{ value: "rajasthan", label: "Rajasthan" },
			{ value: "punjab", label: "Punjab" },
			{ value: "maharashtra", label: "Maharashtra" }
		];
		this.cityList = [
			{ value: "rajkot", label: "Rajkot" },
			{ value: "ahmedabad", label: "Ahmedabad" },
			{ value: "surat", label: "Surat" },
			{ value: "jamnagar", label: "Jamnagar" }
		];
	}

	dataHandler = (e) => {
		const { formData, formError } = this.state;
		const { name, value, checked } = e.target;
		let formDataObj = formData;

		if (name === "hobbies") {
			if (checked)
				formDataObj[name].push(value);
			else {
				formDataObj = { ...formData, [name]: formData[name].filter(x => x !== value) }
			}
		} else formDataObj = { ...formData, [name]: value }

		this.setState({ formData: formDataObj, formError: { ...formError, [name]: '' } });
	}



	getRegEx = (name) => {
		switch (name) {
			case 'companyName':
				return /^[A-Z]*[a-z]+[0-9]*$/;

			case 'userName':
				return /^[A-Z]*[a-z]+$/;

			case 'contactNo':
				return /^[0-9]{10}$/;

			case 'pinCode':
				return /^[0-9]{6}$/;

			case 'email':
				return /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/;

			case 'passWord':
				return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
		}
	}
	validationHandler = (e) => {
		const { formData, formError } = this.state;
		const { name, value, title, attributes } = e.target;
		let errorMessage = '';
		let formDataColne = formData;
		// console.log("access coustom attribute", !e.target.attributes.getNamedItem("data-attribute").value, "set by InputBox #data-*att_name*");

		if (name === 'hobbies') {
			if (formData.hobbies.length === 0)
				errorMessage = `Please Select ${title}`;
		}
		else if (!value && attributes.getNamedItem("data-attribute").value === 'true')
			errorMessage = `Please Enter ${title}`;
		else if (name === 'passWord' && !this.getRegEx(name).test(value))
			errorMessage = `Invalid ${title} -use special, upper, lower, digit`;
		else if (value && this.getRegEx(name) && !this.getRegEx(name).test(value))
			errorMessage = `Invalid ${title}`;
		else if (!value && attributes.getNamedItem("data-attribute").value === 'false')
			delete this.state.formData.middleName;

		this.setState({ formData: formDataColne, formError: { ...formError, [name]: errorMessage } })
	}

	submitHandler = (e) => {
		const { ip, port } = this.props
		const { formData, formError } = this.state
		let errorMessage = '';
		let errorObj = formError;
		Object.keys(formData).map((value) => {
			if (!formData[value] || formData[value].length == 0) {
				errorMessage = `invalid ${value}`;
				errorObj[value] = errorMessage;
			}
		})
		this.setState({ formError: errorObj });

		if (errorMessage === '') {
			const formDataProduct = new FormData();
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			}
			console.log(this.state);
			formDataProduct.append('image', this.state.selectedFile);
			for (let name in this.state.formData) {
				console.log(name, this.state.formData[name])
				formDataProduct.set(name, this.state.formData[name]);
			}
			console.log(formDataProduct);
			axios.post(`http://${server.ip}:${server.port}/product/addProduct`, formDataProduct, config)
				.then(res => alert("File uploaded successfully."))
				.catch((err) => console.log(err));
		}
	}


	render() {
		const { formError, formData } = this.state
		return (<>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="primary">

							<h4 className>Edit Profile</h4>
							<p className>Complete your product details</p>
							{/* <h4 className={classes.cardTitleWhite}>Add Product</h4>
							<p className={classes.cardCategoryWhite}>Complete your product details</p> */}
						</CardHeader>
						<CardBody>
							<br />
							<GridContainer>
								<GridItem xs={12} sm={12} md={3}>
									<InputBox
										label='Company Name'
										type='text'
										name='companyName'
										placeHolder='xyz'
										value={formData.companyName}
										isReq={true}
										errorMessage={formError.companyName}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={3}>
									<InputBox
										label='User Name'
										type='text'
										name='userName'
										placeHolder='xyz'
										value={formData.userName}
										isReq={true}
										errorMessage={formError.userName}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<InputBox
										label='Email'
										type='text'
										name='email'
										placeHolder='xyz.Abc@gmail.com'
										value={formData.email}
										isReq={true}
										errorMessage={formError.email}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={12} sm={12} md={3}>
									<InputBox
										label='CRN'
										type='text'
										name='crn'
										placeHolder='ab123456'
										value={formData.crn}
										isReq={true}
										errorMessage={formError.crn}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={3}>
									<DropDown
										label='Company Type'
										isReq={true}
										name='type'
										list={this.typeList}
										value={formData.type}
										onChange={this.dataHandler}
										errorMessage={formError.type}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={6}>
									<InputBox
										label='Website'
										type='text'
										name='webSite'
										placeHolder='https://developer.mozilla.org/en-US/'
										value={formData.webSite}
										isReq={true}
										errorMessage={formError.webSite}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
							</GridContainer>

							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<DropDown
										label='State'
										isReq={true}
										name='state'
										list={this.stateList}
										value={formData.state}
										onChange={this.dataHandler}
										errorMessage={formError.state}
										onBlur={this.validationHandler}
									/>

								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<DropDown
										label='City'
										isReq={true}
										name='city'
										list={this.cityList}
										value={formData.city}
										onChange={this.dataHandler}
										errorMessage={formError.city}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<InputBox
										label='Pin Code'
										type='tel'
										name='pinCode'
										placeHolder='123456'
										value={formData.pinCode}
										isReq={true}
										errorMessage={formError.pinCode}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
							</GridContainer>
							<GridContainer>
								<GridItem xs={12} sm={12} md={4}>
									<InputBox
										label='Contact No'
										type='tel'
										name='contactNo'
										placeHolder='1234567890'
										value={formData.contactNo}
										isReq={true}
										errorMessage={formError.contactNo}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
								<GridItem xs={12} sm={12} md={4}>
									<InputBox
										label='Password'
										type='text'
										name='passWord'
										placeHolder='Xyz@123'
										value={formData.passWord}
										isReq={true}
										errorMessage={formError.passWord}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>

								<GridItem xs={12} sm={12} md={4}>
									<InputBox
										label='Address'
										type='textarea'
										name='address'
										placeHolder=''
										value={formData.address}
										isReq={true}
										errorMessage={formError.address}
										onChange={this.dataHandler}
										onBlur={this.validationHandler}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
						<CardFooter>
							<Button color="primary" onClick={this.submitHandler}>Add</Button>
						</CardFooter>
					</Card>
				</GridItem>
			</GridContainer>
		</>
		);
	}
}

export default UserForm;
