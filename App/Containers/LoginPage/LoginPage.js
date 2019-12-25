import React, { Component } from 'react';
import { Platform, Text, View, Button,  TextInput,     ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'


/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class LoginPage extends React.Component {
  componentDidMount() {
 
  }

  render() {
    return (
        <ScrollView style={{padding: 20}}>
            <Text 
                style={{fontSize: 27}}>
                Login
            </Text>
            <TextInput placeholder='Username' />
            <TextInput placeholder='Password' />
            <View style={{margin:7}} />
            <Button 
                      onPress={()=>this.props.loginUser({username:'apsadra',password:'vpk11'})}
                      title="Submit"
                  />


<Text 
                style={{fontSize: 27}}>
                {this.props.loginError}
            </Text>
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
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  loginError: state.login.loginError,

})


const mapDispatchToProps = (dispatch) => ({
    loginUser: (formData) => dispatch(LoginActions.loginUser(formData)),
  })

export default connect(
  mapStateToProps,mapDispatchToProps
)(LoginPage)
