import React from 'react'
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import LoginActions from 'App/Stores/Login/Actions'
import FunctionalityAction from 'App/Stores/Functionality/Actions'
import NavigationService from 'App/Services/NavigationService'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera as Camera } from 'react-native-camera'
import CollapsibleList from 'react-native-collapsible-list'
import { Switch } from 'react-native-switch'
import { Dropdown } from 'react-native-material-dropdown'
import Toast from 'react-native-root-toast'

import DateTimePicker from 'react-native-modal-datetime-picker'
import { red } from 'ansi-colors'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

class ScannerPage extends React.Component {
  state = {
    formData: {
      serial: '',
      accountHead: '',
      amount: '',
      remark: '',
    },
    qrCode: '',
    torch: Camera.Constants.FlashMode.torch.off,
    showScanner: false,
    scannedCode: '',
    isDateTimePickerVisible: false,
    selectedDate: new Date(),
    showAccounts: true,
    submitToast: false,
    toastColor: '#ff0000',
    toastMessage: '',
    toastPosition: '',
  }

  componentDidMount() {
    const { accessToken, userId, deviceId } = this.props
    console.log('insid ewill mount')
    this.props.clearError()
    this.props.getAccountHeads({ accessToken, userID: userId, deviceID: deviceId })
    this.props.getPaymentHistory({ accessToken, userID: userId, deviceID: deviceId })
  }

  componentDidUpdate(prevProps) {
    const { accessToken, userId, deviceId } = this.props
    console.log('Component did update', this.props.getPaymentHistoryError)
    if (
      this.props.submitPaymentStatus !== prevProps.submitPaymentStatus &&
      this.props.submitPaymentStatus
    ) {
      this.setState({ formData: { ...this.state.formData, amount: '', remark: '' } })
      this.setState({
        submitToast: true,
        toastColor: '#00ff00',
        toastMessage: 'Payment entered successfully',
        toastPosition: Toast.positions.CENTER,
      })
      this.props.getPaymentHistory({ accessToken, userID: userId, deviceID: deviceId })
    }
  }

  handleChange = (name) => (e) => {
    const data = {}
    data[name] = e.nativeEvent.text
    if (name === 'amount') {
      console.log('inside amount *********************')
      this.setState({
        formData: { ...this.state.formData, amount: data[name].replace(/[^0-9]/g, '') },
      })
    } else this.setState({ formData: { ...this.state.formData, ...data } })
  }

  onSuccess(e) {
    this.setState({ scannedCode: e.data })
    console.log('reading qr success', e.data)
  }
  logoutUser() {
    console.log('log out pressed', this.props.userIsLoading, ' end of medsage')

    this.props.logoutUser()
    NavigationService.navigateAndReset('LoginPage')
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this.setState({ selectedDate: date })
    this.hideDateTimePicker()
  }

  submitAccountForm = () => {
    const { remark, amount, accountHead } = this.state.formData
    const { selectedDate } = this.state
    const { accessToken, userId, deviceId } = this.props
    if (
      !this.state.formData.accountHead ||
      !this.state.formData.remark ||
      !this.state.formData.amount
    ) {
      this.setState({
        submitToast: true,
        toastColor: '#ff0000',
        toastMessage: 'Please fill all fields',
        toastPosition: Toast.positions.BOTTOM,
      })
    } else {
      if (!this.props.isLoading)
        this.props.submitPayment({
          accessToken,
          userID: userId,
          deviceID: deviceId,
          remark,
          amount,
          accountHead,
          date: selectedDate,
        })
      this.setState({
        submitToast: true,
        toastColor: '#00ff00',
        toastMessage: 'Adding payment entry',
        toastPosition: Toast.positions.BOTTOM,
      })
    }

    setTimeout(
      () =>
        this.setState({
          submitToast: false,
        }),
      5000
    ) // show toast after 2s

    console.log(' going to submit account form', this.state.formData)
  }
  toggleScanner(e) {
    console.log('current state is ', e)
    this.setState({ showScanner: !this.state.showScanner })
  }

  toggleAccounts(e) {
    console.log('current state is ', e)
    this.setState({ showAccounts: !this.state.showAccounts })
  }

  render() {
    var selectedDate = new Date(this.state.selectedDate)
    var dd = selectedDate.getDate()
    var mm = selectedDate.getMonth() + 1 //January is 0!
    var yyyy = selectedDate.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    selectedDate = dd + '-' + mm + '-' + yyyy

    const scanResult = this.state.scannedCode
    return (
      <ScrollView style={{ padding: 20 }}>
        <Toast
          visible={this.state.submitToast}
          position={this.state.toastPosition}
          backgroundColor={this.state.toastColor}
          textColor={'#000000'}
          shadow={false}
          animation={false}
          hideOnPress={true}
        >
          {this.state.toastMessage}
        </Toast>

        <ActivityIndicator animating={this.props.isLoading} size="large" color="#0000ff" />
        <Button onPress={() => this.logoutUser()} title="Logout" />
        <Text> {'Scanner'} </Text>

        <Switch
          activeText={'Scanner on'}
          inActiveText={'Scanner Off'}
          circleBorderWidth={3}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          circleActiveColor={'#30a566'}
          circleInActiveColor={'#000000'}
          innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          onValueChange={(e) => this.toggleScanner(e)}
          value={this.state.showScanner}
        />

        <Text> {'Accounts'} </Text>

        <Switch
          activeText={'Scanner on'}
          inActiveText={'Scanner Off'}
          circleBorderWidth={3}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          circleActiveColor={'#30a566'}
          circleInActiveColor={'#000000'}
          innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          onValueChange={(e) => this.toggleAccounts(e)}
          value={this.state.showAccounts}
        />

        {this.state.showScanner && (
          <View>
            <QRCodeScanner
              cameraStyle={{
                height: 200,
                marginTop: 20,
                width: 200,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              flashMode={this.state.torch}
              ref={(node) => {
                this.scanner = node
              }}
              reactivate={true}
              onRead={(e) => this.onSuccess(e)}
              reactivateTimeout={1000}
            />
            <Text style={{ fontSize: 27, paddingTop: 40 }}>{scanResult}</Text>

            <TextInput
              style={{ paddingTop: 50 }}
              id="serial"
              placeholder="serial"
              onChange={this.handleChange('serial')}
            />
            <Button
              onPress={() => this.props.loginUser({ ...this.state.formData })}
              title="Submit"
            />

            <Text style={{ fontSize: 27 }}>{this.props.scanError}</Text>
          </View>
        )}
        {this.state.showAccounts && (
          <View>
            <Button title={`Date ${selectedDate}`} onPress={this.showDateTimePicker} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />

            <Dropdown
              label="Account Heads"
              data={this.props.accountHeads}
              onChangeText={(value) => {
                this.setState({ formData: { ...this.state.formData, accountHead: value } })
              }}
            />

            <TextInput
              style={{ paddingTop: 20 }}
              id="remark"
              placeholder="Remark"
              value={this.state.formData.remark}
              onChange={this.handleChange('remark')}
            />
            <TextInput
              style={{ paddingTop: 20 }}
              id="amount"
              placeholder="Amount"
              value={this.state.formData.amount}
              onChange={this.handleChange('amount')}
            />

            <Button onPress={() => this.submitAccountForm()} title="Add entry" />
            <Text> {`Payment History ${this.props.getPaymentHistoryError}`} </Text>


          </View>
        )}
      </ScrollView>
    )
  }
}

ScannerPage.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  getAccountHeads: PropTypes.func,
  submitPayment: PropTypes.func,
  isLoading: PropTypes.bool,
  scanError: PropTypes.string,
  submitPaymentError: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  clearError: PropTypes.func,
  submitPaymentStatus: PropTypes.string,
  getPaymentHistoryError: PropTypes.string,
}

const mapStateToProps = (state) => ({
  accountHeads: state.functionality.accountHeads,
  accessToken: state.login.accessToken,
  userId: state.login.userId,
  deviceId: state.login.deviceId,
  test: state.login,
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  getAccountHeadsError: state.functionality.getAccountHeads,
  getPaymentHistoryError: state.functionality.getPaymentHistoryError,
  isLoading: state.session.isLoading,
  isLoggedIn: state.login.isLoggedIn,
  submitPaymentError: state.functionality.submitPaymentError,
  submitPaymentStatus: state.functionality.submitPaymentStatus,
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (formData) => dispatch(LoginActions.loginUser(formData)),
  submitPayment: (formData) => dispatch(FunctionalityAction.submitPayment(formData)),
  getPaymentHistory: ({ accessToken, userID, deviceID }) =>
    dispatch(FunctionalityAction.getPaymentHistory({ accessToken, userID, deviceID })),
  clearError: () => dispatch(FunctionalityAction.clearError()),
  logoutUser: () => dispatch(LoginActions.logoutUser()),
  getAccountHeads: ({ accessToken, userID, deviceID }) =>
    dispatch(FunctionalityAction.getAccountHeads({ accessToken, userID, deviceID })),
})

const styles = StyleSheet.create({
  cameraStyle: {
    marginTop: 120,
    marginBottom: 120,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerPage)
