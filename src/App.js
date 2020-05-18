import React from 'react';
import { Auth } from 'aws-amplify';

class App extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authenticationCode: '',
    step: 0,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  signUp = async () => {
    const { username, password, email, phone_number } = this.state;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number },
      });
      this.setState({ step: 1 });

      console.log('Successfully  signed up!');
    } catch (err) {
      console.log('Error signing up: ', err);
    }
  };

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;

    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('User successfully signed up!');
    } catch (err) {
      console.log('Error confirming signup: ', err);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.step === 0 && (
          <>
            <input
              type="text"
              placeholder="Enter a username"
              onChange={this.onChange}
              name="username"
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Enter a password"
              onChange={this.onChange}
              name="password"
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Enter an email"
              onChange={this.onChange}
              name="email"
              style={styles.input}
            />
            <input
              type="type"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter your phone number"
              onChange={this.onChange}
              name="phone_number"
              style={styles.input}
            />
            <button type="button" onClick={this.signUp} name="signUpButton">
              Sign up
            </button>
          </>
        )}
        {this.state.step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter a username"
              onChange={this.onChange}
              name="username"
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Authentication code"
              onChange={this.onChange}
              name="authenticationCode"
              style={styles.input}
            />

            <button
              type="button"
              onClick={this.confirmSignUp}
              name="confirmSignUp"
            >
              Confirm sign up
            </button>
          </>
        )}
      </div>
    );
  }
}

const styles = {
  input: {
    height: 35,
    margin: 5,
  },
};

export default App;
