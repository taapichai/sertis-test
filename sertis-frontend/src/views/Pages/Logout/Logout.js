import React, { Component } from 'react';

class Logout extends Component {

    constructor(props) {
        super(props);
        const { history } = this.props;
        this.state = {
            username: '',
            password: '',
            usernameValue: '',
            passwordValue: '',
        }

        sessionStorage.clear();
        history.push("/");

    }

    componentWillUnmount() {

    }

    render() {
        return (<h1>Logout... </h1> );
    }
}

export default Logout;