import React, { Component } from 'react';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import { InputBox, CheckBox, MyRadio, DropDown } from './InputBox';
import { Label, FormGroup, Input, Form } from 'reactstrap';
import server from 'utilities.js';
import 'scss/my-scss.scss';
import axios from 'axios';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        sku: '',
        category: '',
        mediaType: '',
        lightingType: '',
        sizex: 0,
        sizey: 0,
        unit: '',
        lat: '',
        lng: '',
        location: '',
        locality: '',
        landmark: '',
        city: '',
        state: '',
        ratePerMonth: 0,
        ratePerDay: 0,
        tier: 0,
        initialCost: 0
      },
      formError: {
        sku: null,
        category: null,
        mediaType: null,
        lightingType: null,
        size: null,
        unit: null,
        lat: null,
        lng: null,
        loaction: null,
        locality: null,
        landmark: null,
        city: null,
        state: null,
        ratePerMonth: null,
        ratePerDay: null,
        tier: null,
        initialCost: null
      }
    };
    this.categoryList = [
      { value: "Hoarding", label: "Hoarding" },
      { value: "Billboard", label: "Billboard" },
      { value: "Mobile", label: "Mobile" },
      { value: "Digital", label: "Digital" },
      { value: "Bridge", label: "Bridge" },
      { value: "Transit", label: "Transit" },
      { value: "Retail", label: "Retail" },
    ];
    this.mediaList = [
      { value: "Hoarding", label: "Hoarding" },
      { value: "Kiosk", label: "Kiosk" },
      { value: "Unipole", label: "Unipole" },
    ];
    this.unitList = [
      { value: "Feet", label: "Feet" },
      { value: "Inch", label: "Inch" },
      { value: "Meter", label: "Meter" },
    ];
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
  onFileChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

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
    const { ip, port } = this.props;
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
      console.log(`http://${server.ip}:${server.port}/product/addProduct`);
      axios.post(`http://${server.ip}:${server.port}/product/addProduct`, formDataProduct, config)
        .then(res => alert("File uploaded successfully."))
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { formError, formData } = this.state
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Add Product</h4>
                <p>Complete your product details</p>
                {/* <h4 className={classes.cardTitleWhite}>Add Product</h4>
							<p className={classes.cardCategoryWhite}>Complete your product details</p> */}
              </CardHeader>
              <CardBody>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <InputBox
                      label='Product SKU'
                      type='text'
                      name='sku'
                      placeHolder='product unique Id'
                      value={formData.sku}
                      isReq={true}
                      errorMessage={formError.sku}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <DropDown
                      label='Category'
                      isReq={true}
                      name='category'
                      list={this.categoryList}
                      value={formData.category}
                      onChange={this.dataHandler}
                      errorMessage={formError.category}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <DropDown
                      label='MediaType'
                      isReq={true}
                      name='mediaType'
                      list={this.mediaList}
                      value={formData.mediaType}
                      onChange={this.dataHandler}
                      errorMessage={formError.mediaType}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <InputBox
                      label='Lighting Type'
                      type='text'
                      name='lightingType'
                      placeHolder='ab123456'
                      value={formData.lightingType}
                      isReq={true}
                      errorMessage={formError.lightingType}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <FormGroup className="input-box-style" >
                      <Label className="label">
                        Size
                      {<span style={{ color: "red" }}> * </span>}
                      </Label><br />
                      <input
                        className="input"
                        placeholder="12"
                        type="text"
                        name="sizex"
                        size="4"
                        value={formData.sizex}
                        onChange={this.dataHandler}
                        onBlur={this.validationHandler}
                      />
                      <Label className="label"> X </Label>
                      <input
                        className="input"
                        placeholder="12"
                        type="text"
                        name="sizey"
                        size="4"
                        value={formData.sizey}
                        onChange={this.dataHandler}
                        onBlur={this.validationHandler}
                      /><br /><br />
                    </FormGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <DropDown
                      label='Unit'
                      isReq={true}
                      name='unit'
                      list={this.unitList}
                      value={formData.unit}
                      onChange={this.dataHandler}
                      errorMessage={formError.unit}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormGroup className="input-box-style" >
                      <Label className="label">
                        Image of Product
                      {<span style={{ color: "red" }}> * </span>}
                      </Label><br />
                      <input
                        type="file"
                        className="form-control"
                        name="file"
                        onChange={this.onFileChangeHandler}
                      />
                    </FormGroup>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Latitude'
                      type='text'
                      name='lat'
                      placeHolder='ab123456'
                      value={formData.lat}
                      isReq={true}
                      errorMessage={formError.lat}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Longitude'
                      type='text'
                      name='lng'
                      placeHolder='ab123456'
                      value={formData.lng}
                      isReq={true}
                      errorMessage={formError.lng}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Location'
                      type='text'
                      name='location'
                      placeHolder='ab123456'
                      value={formData.location}
                      isReq={true}
                      errorMessage={formError.loaction}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Locality'
                      type='text'
                      name='locality'
                      placeHolder='1234567890'
                      value={formData.locality}
                      isReq={true}
                      errorMessage={formError.locality}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Landmark'
                      type='text'
                      name='landmark'
                      placeHolder='Xyz@123'
                      value={formData.landmark}
                      isReq={true}
                      errorMessage={formError.landmark}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='City'
                      type='text'
                      name='city'
                      placeHolder=''
                      value={formData.city}
                      isReq={true}
                      errorMessage={formError.city}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='State'
                      type='text'
                      name='state'
                      placeHolder='1234567890'
                      value={formData.state}
                      isReq={true}
                      errorMessage={formError.state}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Rate per Month'
                      type='number'
                      name='ratePerMonth'
                      placeHolder='Xyz@123'
                      value={formData.ratePerMonth}
                      isReq={true}
                      errorMessage={formError.ratePerMonth}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Rate per Day'
                      type='number'
                      name='ratePerDay'
                      placeHolder=''
                      value={formData.ratePerDay}
                      isReq={true}
                      errorMessage={formError.ratePerDay}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Tier'
                      type='number'
                      name='tier'
                      placeHolder=''
                      value={formData.tier}
                      isReq={true}
                      errorMessage={formError.tier}
                      onChange={this.dataHandler}
                      onBlur={this.validationHandler}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <InputBox
                      label='Initial Cost'
                      type='number'
                      name='initialCost'
                      placeHolder='Xyz@123'
                      value={formData.initialCost}
                      isReq={true}
                      errorMessage={formError.initialCost}
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

export default AddProduct;
