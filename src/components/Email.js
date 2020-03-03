import React, { Component, createRef } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'scss/my-scss.scss';


class Email extends Component {
  constructor(props) {
    super(props);
    this.my = createRef();
  }

  handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  writeMode = () => {
    console.log("*******************************************");
    this.my.current.focus();
  }


  render() {
    return (
      <>
        <Form>
          <FormGroup>
            <Label>File</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
            />
          </FormGroup><br />
          <FormGroup tag="fieldset"  onClick={this.writeMode}>
            <legend>Description</legend>
            <Input
              type="textarea"
              innerRef={this.my}
              name="text"
              className="exampleText"
              onKeyDown={this.handleKeyDown}
            />
          </FormGroup>
        </Form>
        {/* <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup> 


            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option two can be something else and selecting it will deselect option one
          </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" disabled />{' '}
                Option three is disabled
          </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
        </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>*/}
      </>
    );
  }
}

export default Email;