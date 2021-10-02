import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  initBlogState,
} from "../../../redux/action";

import { Button, Card, CardBody, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import CardFooter from 'reactstrap/lib/CardFooter';

class BlogCards extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };

    this.props.initBlogState();
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
                <div className="card-header-actions">
                  {/*eslint-disable-next-line*/}
                  <a href="#" className="card-header-action btn btn-setting"><i className="icon-settings"></i></a>
                  {/*eslint-disable-next-line*/}
                  <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></a>
                  {/*eslint-disable-next-line*/}
                  <a className="card-header-action btn btn-close" onClick={this.toggleFade}><i className="icon-close"></i></a>
                </div>
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
    var rowsPerPage = [
      {
        "id": 1,
        "name": "test1",
        "content": "Content",
        "author": 
          {
            "name":"author1"
          }
      },
      {
        "id": 2,
        "name": "test1",
        "content": "Content",
        "author": 
          {
            "name":"author1"
          }
      },
      {
        "id": 3,
        "name": "test1",
        "content": "Content",
        "author": 
          {
            "name":"author1"
          }
      },
      {
        "id": 4,
        "name": "test1",
        "content": "Content",
        "author": 
          {
            "name":"author1"
          }
      },
      {
        "id": 5,
        "name": "test1",
        "content": "Content",
        "author": 
          {
            "name":"author1"
          }
      },
    ];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" md="4">
            <Card>
              <Button size="sm" color="success">Action</Button>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogCards);

