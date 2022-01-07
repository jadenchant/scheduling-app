import React, {Component} from 'react';
import {
  Text,
  Modal,
  Pressable,
  View,
  StatusBar,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import {MaskedTextInput} from 'react-native-mask-text';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default class EventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.42.235.127:3000',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      refreshing: false,
      projFriendOrange: '#F58C19',
      projFriendRed: '#DD1514',
      projFriendBlue: '#2894D8',
      showDate: true,
      uid: 1,
      modalvisable: false,
      activity: '',
      description: '',
      date: new Date(),
      stime: '',
      duration: '',
      location: '',

      events: [],
    };
  }

  handle_confirm_request = () => {
    const op = 'events/new';
    const method = 'POST';
    const formattedDate = this.state.date.toISOString().split('T')[0];
    console.log(formattedDate);
    let params = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      body: `uid=${this.state.uid}&date=${formattedDate}&stime=${this.state.stime}&activity=${this.state.activity}&description=${this.state.description}&location=${this.state.location}&duration=${this.state.duration}`,
    };
    params.method = method;
    fetch(this.state.url + '/' + op, params)
      .then(res => res.text)
      .then(res => {
        console.log(`response text: ${res}`);
      })
      .catch(error => {
        console.error(error);
      });
    this.setState({modalvisable: false});
    setTimeout(() => {
      this.state.activity = '';
      this.state.description = '';
      this.state.date = new Date();
      this.state.location = '';
      this.onRefresh();
    }, 2000)
  };

  forceUpdateHandler() {
    this.forceUpdate();
  }

  handle_remove_request = eid => {
    console.log('Delete event ' + eid);
    const op = 'events/delete/' + eid;
    const method = 'DELETE';
    let params = {};
    params.method = method;
    fetch(this.state.url + '/' + op, params)
      .then(res => res.text)
      .then(res => {
        console.log(`response text: ${res}`);
      })
      .catch(error => {
        console.error(error);
      });
    setTimeout(() => {
      this.onRefresh();
    }, 4000)
  };

  componentDidMount() {
    const op = 'events/' + this.state.uid;
    const method = 'GET';
    let params = {};
    if (method != '') params.method = method;
    fetch(this.state.url + '/' + op, params)
      .then(res => res.json())
      .then(res => {
        console.log(res.events);
        this.setState({
          events: res.events,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    const op = 'events/' + this.state.uid;
    const method = 'GET';
    let params = {};
    if (method != '') params.method = method;
    fetch(this.state.url + '/' + op, params)
      .then(res => res.json())
      .then(res => {
        console.log(res.events);
        this.setState({
          events: res.events,
        });
        this.setState({refreshing: false});
      })
      .catch(error => {
        console.error(error);
      });
  };

  parseTime = time => {
    let arr = time.split(':');
    return parseInt(arr[0] + arr[1], 10);
  };

  formatTime = time => {
    if (typeof time === 'string') {
      parseInt(time, 10);
    }
    const ampm = time >= 1200 ? 'PM' : 'AM';
    let hour = ~~(time / 100);
    hour = hour % 12;
    hour = hour ? hour : 12;
    let min = time % 100;
    if (!min) {
      min = '00';
    }
    return hour + ':' + min + ' ' + ampm;
  };

  formatDate = date => {
    var pattern = /(\d{4})\-(\d{2})\-(\d{2})/;
    if (!date || !date.match(pattern)) {
      return null;
    }
    return date.replace(pattern, '$2/$3/$1');
  };

  render() {
    return (
      <SafeAreaView style={
        {
          backgroundColor: String(this.props.route.params.get_Scolor()), //background
          width: '100%',
          height: '100%',
        }
      }>
        <View style={
     {
              marginTop: StatusBar.currentHeight || 0,
          
        }}>
          <Text style={{color: String(this.props.route.params.get_Pcolor()),fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
            {'Upcoming Events'}
          </Text>
          <ScrollView
            style={{height: '90%'}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            {this.state.events !== [] || this.state.events !== undefined ? (
              <View>
                {this.state.events.map(event => (
                  <View style={styles.item} key={event.eid}>
                    <View style={styles.itemCol1}>
                      <Text style={styles.activity}>{event.activity}</Text>
                      <Text style={styles.date}>
                        {this.formatDate(event.date)}
                      </Text>
                      <Text style={styles.time}>
                        {this.formatTime(event.stime)} -{' '}
                        {this.formatTime(
                          parseInt(event.stime, 10) +
                          parseInt(event.duration, 10)
                        )}
                      </Text>
                    </View>
                    <View style={styles.itemCol2}>
                      <Text style={styles.location}>{event.location}</Text>
                      <Pressable
                        onPress={() => this.handle_remove_request(event.eid)}
                      >
                        <MaterialCommunityIcons
                          name='close'
                          size={34}
                          color={this.state.projFriendRed}
                        />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No Events</Text>
            )}
          </ScrollView>
        </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.modalvisable}
          >
            <View style={styles.modalView}>
              <ScrollView style={styles.addeventform}>
                <Text style={styles.formHeader}>{'Add Event'}</Text>
                <TextInput
                  style={styles.formInput}
                  label='Activity'
                  value={this.state.activity}
                  mode='outlined'
                  activeOutlineColor={this.state.projFriendBlue}
                  onChangeText={act => this.setState({activity: act})}
                />
                <TextInput
                  style={styles.formInput}
                  label='Description'
                  value={this.state.description}
                  mode='outlined'
                  activeOutlineColor={this.state.projFriendBlue}
                  onChangeText={descript =>
                    this.setState({description: descript})
                  }
                />
                <View style={styles.addDate}>
                  <Text style={styles.formTitle}>{'Date:'} </Text>
                  {this.state.showDate && (
                    <View style={{alignItems: 'flex-start'}}>
                      <DateTimePicker
                        style={{width: 130}}
                        testID='datePicker'
                        value={this.state.date}
                        mode={'date'}
                        is24Hour={true}
                        display='default'
                        onChange={(event, selectedDate) => {
                          let currentDate = selectedDate || this.state.date;
                          // const platform = Platform.OS === 'ios';
                          const platform = true;
                          this.setState({showDate: platform});
                          this.setState({date: currentDate});
                          console.log(this.state.date);
                        }}
                      />
                    </View>
                  )}
                </View>
                <TextInput
                  style={styles.formInput}
                  label='Start Time'
                  mode='outlined'
                  activeOutlineColor={this.state.projFriendBlue}
                  placeholder={'00:00'}
                  maxLength={5}
                  keyboardType='numeric'
                  value={this.state.stime}
                  render={props => (
                    <MaskedTextInput
                      {...props}
                      onChangeText={(text, rawText) => {
                        this.setState({stime: rawText});
                      }}
                      mask='99:99'
                    />
                  )}
                />
                <TextInput
                  style={styles.formInput}
                  label='Duration'
                  mode='outlined'
                  activeOutlineColor={this.state.projFriendBlue}
                  placeholder={'0:00'}
                  maxLength={4}
                  keyboardType='numeric'
                  error={false}
                  value={this.state.duration}
                  render={props => (
                    <MaskedTextInput
                      {...props}
                      onChangeText={(text, rawText) => {
                        this.setState({duration: rawText});
                      }}
                      mask='9:99'
                    />
                  )}
                />
                <TextInput
                  style={styles.formInput}
                  label='Location'
                  value={this.state.location}
                  mode='outlined'
                  activeOutlineColor={this.state.projFriendBlue}
                  onChangeText={local => this.setState({location: local})}
                />
                {/* <View style={styles.} */}
              </ScrollView>
              <View style={styles.bottomButtonView}>
                <Pressable
                  style={styles.bottomButton}
                  onPress={() => this.setState({modalvisable: false})}
                >
                  <Text style={{color: 'red', fontSize: 20}}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.bottomButton}
                  onPress={() => this.handle_confirm_request()}
                >
                  <Text style={{color: 'green', fontSize: 20}}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* <NewEventModal
            modalvisible={this.state.modalvisable}
            toggleModalVisible={()=>{this.setState((prevState)=>({modalvisable: !prevState.modalvisable}))}}
            confirm={this.handle_confirm_request}
          /> */}
        <Pressable
          style={styles.addeventbutton}
          onPress={() => this.setState({modalvisable: true})}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            {'Add Event'}
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomButtonView: {
    //window bottom bar
    flexDirection: 'row',
    width: '100%',
    height: '12%',
    backgroundColor: 'goldenrod',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    position: 'absolute',
    bottom: 0,
  },
  modalView: {
    // add window
    marginTop: '12%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: 'palegoldenrod',
    width: '90%',
    height: '75%',
    borderRadius: 25,
    borderWidth: 2,
    shadowColor: '#808080',
    shadowOffset: {},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  addeventbutton: {
    //add event
    backgroundColor: 'gold',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    borderWidth: 2,
    width: '40%',
    height: '10%',
    bottom: 10,
    left: '30%',
    justifyContent: 'center',
  },
  buttonClose: {
    // close
    justifyContent: 'flex-start',
    position: 'absolute',
    borderRadius: 5,
    width: '10%',
    borderWidth: 0.5,
    height: '30%',
    backgroundColor: 'gold',
    left: '39%',
    top: '37.5%',
  },
  buttonConfirm: {
    // confirm
    justifyContent: 'flex-start',
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 0.5,
    width: '10%',
    height: '30%',
    backgroundColor: 'gold',
    right: '39%',
    top: '37.5%',
  },
  textStyle: {
    color: 'black',
    // fontWeight: "bold",
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'palegoldenrod', //events
    padding: 16,
    marginVertical: 8,
    justifyContent: 'space-between',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    borderWidth: 1,
    flexDirection: 'row',
  },
  itemCol1: {},
  itemCol2: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  activity: {
    fontSize: 26,
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
  },
  location: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
  },
  formHeader: {
    fontSize: 40,
  },
  formTitle: {
    fontSize: 24,
  },
  addeventform: {
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
  },
  formInput: {
    marginVertical: 5,
  },
  addDate: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    width: 100,
    height: 40,
    position: 'relative',
  }
});
