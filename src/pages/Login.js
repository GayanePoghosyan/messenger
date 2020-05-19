import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import {userLoginRequest} from "../store/actions/users";
import {Redirect} from "react-router-dom";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Login extends Component {
    static propTypes = {};
    login = (ev) => {
        ev.preventDefault();
        const {userForm} = this.state;
        this.props.userLoginRequest(userForm.email, userForm.password);
    };

    constructor(props) {
        super(props);
        this.state = {
            userForm: {
                email: '',
                password: '',
            }
        }
    }

    handleChange = (path, value) => {
        const {userForm} = this.state;
        _.set(userForm, path, value);
        this.setState({userForm});
    };

    render() {
        const {token, error} = this.props;
        const {userForm} = this.state;
        if (token) {
            return <Redirect to="/account"/>
        }
        return (
            <div className="container center">
                <h1>Login</h1>
                <form onSubmit={this.login}>
                    <p><label htmlFor="email">Email</label><br/>
                        <input
                            onChange={(ev) => this.handleChange('email', ev.target.value)}
                            value={userForm.value}
                            type="text"
                            placeholder="Email"/>
                        <br/>
                    </p>
                    <p><label htmlFor="password">Password</label><br/>
                        <input
                            onChange={(ev) => this.handleChange('password', ev.target.value)}
                            type="password"
                            value={userForm.password}
                            placeholder="Password"/>
                    </p>

                    <br/>
                    <p><input type="submit"/></p>
                </form>
                <NotificationContainer/>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    token: state.users.token,
    error: state.users.errors
});

const mapDispatchToProps = {
    userLoginRequest
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default Container;
