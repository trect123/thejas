import React from 'react'
import { Text, View, Button, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

class LoginPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <ActivityIndicator animating={this.props.isLoading} size="large" color="#0000ff" />
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" />
        <View style={{ margin: 7 }} />
        <Button
          onPress={() => this.props.loginUser({ username: 'apsadra', password: 'vpk11' })}
          title="Submit"
        />

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
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  loginError: state.login.loginError,
  isLoading: state.session.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (formData) => dispatch(LoginActions.loginUser(formData)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
