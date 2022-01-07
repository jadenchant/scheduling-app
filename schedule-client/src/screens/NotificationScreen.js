import React, {useState, Component} from 'react';
import {
  Text,
  Modal,
  Alert,
  Pressable,
  View,
  StatusBar,
  SectionList,
  Button,
  Settings,
  stylesheet,
  FlatList,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NewEventModal from '../common/newEventModal.js';

// const AcceptButton = ({newEvent, setModalVisible, navigation}) => {
//   //NotificationScreen.setState({modalvisable: false})
//   return (
//     <Button
//       title='Accept'
//       color='green'
//       onPress={() => {
//         setModalVisible();
//         navigation.navigate('Events', {newEvent});
//       }}
//     />
//   );
// };

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.42.235.127:3000',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      uid: 1,
      modalvisable: false,
      n_activity: '',
      n_childname: '',
      n_location: '',
      n_stime: new Date().setHours(0, 0, 0, 0),
      selectedChildname: '',
      //n_etime: new Date().setHours(0,0,0,0),
    };
  }

  styles = StyleSheet.create({
    eventContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'goldenrod',
    },
    header: {
      fontSize: 25,
      margin: 15,
      textAlign: 'center',
      backgroundColor: 'goldenrod',
    },
    event: {
      fontSize: 20,
      textAlign: 'center',
      backgroundColor: 'goldenrod',
    },
    item: {
      backgroundColor: 'goldenrod',
      borderRadius: 20,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginVertical: 5,
      width: '50%',
      left: '25%',
      textAlign: 'center',
      borderColor: 'black',
    },
    Profilestyles: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF9800',
    },
    modalView: {
      // add window
      marginTop: '10%',
      marginLeft: '10%',
      marginRight: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'palegoldenrod',
      width: '50%',
      height: '50%',
      borderRadius: 25,
      borderWidth: 2,
      // padding: 0,

      shadowColor: '#808080',
      shadowOffset: {},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 1,
    },
    container: {
      color:  String(this.props.route.params.get_Pcolor()),
      marginTop: StatusBar.currentHeight || 0,
    },
    bottomButtonView: {
      //window bottom bar
      flexDirection: 'row',
      width: '100%',
      height: '15%',
      backgroundColor: 'goldenrod',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomRightRadius: 24,
      borderBottomLeftRadius: 24,
      position: 'absolute',
      bottom: 0,
    },
  });

  addEvent = newEvent => {
    console.log('event: ', newEvent);
    this.props.navigation.navigate('Events', {newEvent});
  };

  render() {
    return (
      <SafeAreaView style={{
        width: '100%',
        height: '100%',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: String(this.props.route.params.get_Scolor()),
      }}>
        <Text
          style={{
            color:  String(this.props.route.params.get_Pcolor()),
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {' Notifications'}
        </Text>
        <NewEventModal
          modalvisible={this.state.modalvisable}
          toggleModalVisible={() => {
            this.setState(prevState => ({
              modalvisable: !prevState.modalvisable,
            }));
          }}
          confirm={this.addEvent}
          predefinedChildname={this.state.selectedChildname}
        />
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Joel'},
            {key: 'Jillian'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => (
            <Pressable
              style={this.styles.addeventbutton}
              onPress={() =>
                this.setState({modalvisable: true, selectedChildname: item.key})
              }
            >
              <Text style={this.styles.item}>{item.key}</Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    );
  }
}
