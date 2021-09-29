import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, 
  Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

const CGO_API = process.env.REACT_APP_CGO_API

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      danger: false,
      username: '',
      password: '',
      usernameValue: '',
      passwordValue: '',
      loginError: false
    }

    this.toggleDanger = this.toggleDanger.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);

  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  handleUsernameInput(event) {
    this.setState({usernameValue: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({passwordValue: event.target.value});
  }

  handleLoginButton() {
    const { history } = this.props;

    fetch(CGO_API + '/api/token/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username" : this.state.usernameValue,
        "password" : this.state.passwordValue,
      }),

    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        throw Error(res.statusText) 
      }
        
    })
    .then((data) => {
      sessionStorage.setItem("cc", data.access)
      sessionStorage.setItem("refresh", data.refresh)

      const user = jwt_decode(sessionStorage.getItem("cc"))

      sessionStorage.setItem("user_id", user.user_id)
      sessionStorage.setItem("user_name", user.user_details.username)
      sessionStorage.setItem("user_group", user.user_details.groups)

      history.push('/cgo-mkt/custom-audience');
    })
    .catch((err) => {
      this.setState({ danger: !this.state.danger, });
    })

  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                        className={'modal-danger ' + this.props.className}>
                        <ModalHeader toggle={this.toggleDanger}>Login is invald.</ModalHeader>
                        <ModalBody>
                          Please contact administrator.
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={this.toggleDanger}>OK</Button>
                        </ModalFooter>
                      </Modal>
                      
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" 
                          onChange={this.handleUsernameInput}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" 
                          onChange={this.handlePasswordInput}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button id="login-button" color="primary" className="px-4" onClick={this.handleLoginButton}>
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
