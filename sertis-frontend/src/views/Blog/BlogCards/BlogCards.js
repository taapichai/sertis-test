import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  initBlogState,
  updateCardState,
  removeCardState,
} from "../../../redux/action";

import { 
  Button, ButtonGroup, ButtonDropdown, 
  Card, CardBody, CardHeader, Col, Collapse,
  DropdownToggle, DropdownMenu, DropdownItem,
  Row,  Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import CardFooter from 'reactstrap/lib/CardFooter';
import { useHistory } from "react-router-dom";


class BlogCards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.newCardHandle = this.newCardHandle.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      dropdownOpen: new Array(99).fill(false),
    };

    this.props.initBlogState();
  }
  
  handleEdit(event) {
    let id = event.currentTarget.id
    this.props.updateCardState(id, "EDIT");
    const { history } = this.props;
    history.push("/blog/forms");
  }

  handleRemove(event) {
    let id = event.currentTarget.id
    this.props.removeCardState(id);
  }

  newCardHandle() {
    const { history } = this.props;
    history.push("/blog/forms");
  }

  toggleDropDown(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }


  showAuthor = data => {
    var result = null;
    result = (
        <CardFooter>
          Author: {data.username}
        </CardFooter>  
      );
    return result;
  };

  showData = data => {
    var result = null;
    if (data.length > 0) {
      result = data.map((data, i) => {
        return (
        <Col xs="12" sm="6" md="4" key={i}>
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card>
              <CardHeader>
                {data.name}
                <ButtonGroup className="float-right">
                  <ButtonDropdown id={data.id} isOpen={this.state.dropdownOpen[data.id]} toggle={() => {
                      this.toggleDropDown(data.id);
                    }}>
                    <DropdownToggle caret className="p-0">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem id={data.id} onClick={this.handleEdit}>Edit</DropdownItem>
                      <DropdownItem id={data.id} onClick={this.handleRemove}>Remove</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
              </CardHeader>
              <Collapse isOpen={this.state.collapse} id="collapseExample">
                <CardBody>
                  {data.content}
                </CardBody>
              </Collapse>
              {this.showAuthor(data.author)}
            </Card>
          </Fade>
        </Col>          
        );
      });
    }
    return result;
  };

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <Button size="sm" color="success" onClick={this.newCardHandle}>New</Button>
            </Card>  
          </Col>
        </Row>  
        <Row>
          {this.showData(this.props.cards)}
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    cards,
  } = state.blog;
  return {
    cards: cards,
  };
}

export const mapDispatchToProps = dispatch => ({
  initBlogState: () => dispatch(initBlogState()),
  updateCardState: (id, mode) => dispatch(updateCardState(id, mode)),
  removeCardState: id => dispatch(removeCardState(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogCards);

