import React from 'react'
import { Text, View, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import NavigationService from 'App/Services/NavigationService'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

class LoginPage extends React.Component {
  state = {
    formData: {
      username: '',
      password: '',
    },
  }

  componentDidMount() {
    this.props.clearError()
  }

  componentDidUpdate() {
    console.log('Component did update', this.props.isLoggedIn)
    if (this.props.isLoggedIn) NavigationService.navigateAndReset('MainScreen')
  }

  handleChange = (name) => (e) => {
    const data = {}
    data[name] = e.nativeEvent.text
    this.setState({ formData: { ...this.state.formData, ...data } })
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <ActivityIndicator animating={this.props.isLoading} size="large" color="#0000ff" />
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
          textContentType={'username'}
          id="username"
          placeholder="Username"
          onChange={this.handleChange('username')}
        />
        <TextInput
          textContentType={'password'}
          autoCompleteType={'password'}
          secureTextEntry
          name="password"
          placeholder="Password"
          onChange={this.handleChange('password')}
        />
        <View style={{ margin: 7 }} />
        <Button onPress={() => this.props.loginUser({ ...this.state.formData })} title="Submit" />

        <Text style={{ fontSize: 27 }}>{this.props.loginError}</Text>
      </ScrollView>
    )
  }
}

LoginPage.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  liveInEurope: PropTypes.bool,
  loginUser: PropTypes.func,
  isLoading: PropTypes.bool,
  loginError: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  clearError: PropTypes.func,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  loginError: state.login.loginError,
  isLoading: state.session.isLoading,
  isLoggedIn: state.login.isLoggedIn,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (formData) => dispatch(LoginActions.loginUser(formData)),
  clearError: () => dispatch(LoginActions.clearError()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
