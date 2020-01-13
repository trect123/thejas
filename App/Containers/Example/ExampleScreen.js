import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { ApplicationStyles, Helpers, Metrics } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'

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

class ExampleScreen extends React.Component {
  componentDidMount() {
    console.log('thhhh',this.props)
    // this._fetchUser()
  }

  render() {
    console.log("account heads is ",this.props.accountHeads);
    return (
      <View
        style={[
          Helpers.fill,
          Helpers.rowMain,
          Metrics.mediumHorizontalMargin,
          Metrics.mediumVerticalMargin,
        ]}
      >
        {this.props.userIsLoading && 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <Text style={Style.text}>To gset started, edit App.js</Text>
            <Text style={Style.result}>{JSON.stringify(this.props)}end odf name</Text>
            <Text style={Style.instructions}>{instructions}</Text>
            {this.props.userErrorMessage ? (
              <Text style={Style.error}>{this.props.userErrorMessage}</Text>
            ) : (
              <View>
             
         
              </View>
            )}
            <Button
              style={ApplicationStyles.button}
              onPress={() => this.logoutUser()}
              title="Refresh"
            />
          </View>
        )}
      </View>
    )
  }

  logoutUser() {
    console.log("log out pressed",this.props.userIsLoading," end of medsage");
 
     this.props.logoutUser()
          NavigationService.navigateAndReset('LoginPage')
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
  accountHeads: PropTypes.array,

}

const mapStateToProps = (state) => ({
  accountHeads: state.functionality.accountHeads,
  accessToken: state.login.isLoggedIn,
  user: state.example.user,
  userIsLoading: state.login.isLoggedIn,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(LoginActions.logoutUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
