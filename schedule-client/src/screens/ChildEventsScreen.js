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
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import NewEventModal from '../common/newEventModal';

const Item = ({event}) => (
  <SafeAreaView>
    <View style={styles.item}>
      <Text style={{fontSize: 18, textAlign: 'center'}}>
        <Text>Date: {event.date}</Text>
        <br />
        <Text>Location: {event.location}</Text>
        <br />
        <Text>Activity: {event.activity}</Text>
        <br />
        <Text>
          Duration: {event.stime} - {event.etime}
        </Text>
      </Text>
    </View>
  </SafeAreaView>
);

const PastItem = ({event}) => (
  <SafeAreaView>
    <View style={styles.item}>
      <Text style={{fontSize: 18, textAlign: 'center'}}>
        <Text>Date: {event.past_date}</Text>
        <br />
        <Text>Location: {event.past_location}</Text>
        <br />
        <Text>Activity: {event.past_activity}</Text>
        <br />
        <Text>
          Duration: {event.past_stime} - {event.past_etime}
        </Text>
      </Text>
    </View>
  </SafeAreaView>
);

const renderItem = ({item}) => {
  //  to do: show error message when item is missing attribute
  if (
    !item.date ||
    !item.location ||
    !item.activity ||
    !item.stime ||
    !item.etime
  )
    return null;
  return <Item event={item} />;
};

const renderPastItem = ({item}) => <PastItem event={item} />;

export default class ChildEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.42.235.127:3000',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      uid: 1,
      modalvisable: false,
      n_activity: 'activity',
      n_childname: 'childname',
      n_location: 'location',
      n_duration: 'duration',
      setModalVisible: true,

      upcoming_events: [
        {
          eid: '1',
          activity: 'Activity',
          childname: 'Dave',
          date: '01/01/2022',
          location: 'St. Olaf College',
          stime: '12:00 PM',
          duration: '01:00',
          etime: '1:00 PM',
        },
      ],
      past_events: [
        {
          past_eid: 1,
          past_activity: 'Activity',
          past_childname: 'Dave',
          past_date: '01/01/2022',
          past_location: 'St. Olaf College',
          past_stime: '12:00 PM',
          past_duration: '01:00',
          past_etime: '1:00 PM',
        },
        {
          past_eid: 2,
          past_activity: 'Activity',
          past_childname: 'Dave',
          past_date: '01/01/2022',
          past_location: 'St. Olaf College',
          past_stime: '12:00 PM',
          past_duration: '01:00',
          past_etime: '1:00 PM',
        },
      ],
    };
    this.setModalVisible = false;
  }

  componentDidUpdate(prevProps) {
    const {newEvent} = this.props.route.params;
    console.log('newEvent: ', newEvent);
    if (newEvent && newEvent.activity !== prevProps.route.params.newEvent?.activity)
      this.setState({
        upcoming_events: [...this.state.upcoming_events, newEvent],
      });
  }

  /**
   * function takes new event and adds it to upcoming events
   * @param {*} newEvent new events object
   * @returns void
   */
  addEvent = newEvent => {
    const {upcoming_events} = this.state;
    upcoming_events.push(newEvent);
    this.setState({upcoming_events});
  };

  deleteEvent = eventToDelete => {
    const {upcoming_events} = this.state;
    const updated_events = upcoming_events.filter(
      event =>
        event.activity !== eventToDelete.activity &&
        event.childname !== eventToDelete.childname &&
        event.location !== eventToDelete.location
    );
    this.setState({upcoming_events: updated_events});
  };

  handle_confirm_request = event => {
    if (this.n_activity != 'activity') {
      this.addEvent(event);
      console.log('event: ', event);
    }
    // this.setState({modalvisable: false});
    // this.forceUpdateHandler();
  };

  // forceUpdateHandler() {
  //   this.forceUpdate();
  // }

  render() {
    return (
      <View style={styles.EventStyles}>
        <SafeAreaView style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {'Child Upcoming Events'}
          </Text>
          {
            <FlatList
              data={this.state.upcoming_events}
              renderItem={({item}) => {
                //  to do: show error message when item is missing attribute
                if (
                  !item.date ||
                  !item.location ||
                  !item.activity ||
                  !item.stime ||
                  !item.etime
                )
                  return null;
                return (
                  <Pressable onPress={() => this.deleteEvent(item)}>
                    <Item event={item} />
                  </Pressable>
                );
              }}
              keyExtractor={item => item?.eid || item.activity}
            />
          }
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {'Past Events'}{' '}
          </Text>
          <FlatList
            data={this.state.past_events}
            renderItem={renderPastItem}
            keyExtractor={item => item?.past_eid || item.activity}
          />
        </SafeAreaView>
        <NewEventModal
          modalvisible={this.state.modalvisable}
          toggleModalVisible={() => {
            this.setState(prevState => ({
              modalvisable: !prevState.modalvisable,
            }));
          }}
          confirm={this.handle_confirm_request}
        />
        <Pressable
          style={styles.addeventbutton}
          onPress={() => this.setState({modalvisable: true})}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {'Add Event'}
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  EventStyles: {
    backgroundColor: 'goldenrod', //background
    width: '100%',
    height: '100%',
  },
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
    height: '15%',
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
  addeventbutton: {
    //add event
    backgroundColor: 'gold',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    borderWidth: 0.5,
    width: '20%',
    height: '10%',
    bottom: 10,
    left: '40%',
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
    padding: 20,
    marginVertical: 8,

    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: '5%',
    marginRight: '5%',
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  form_title: {
    fontSize: 24,
  },
  addeventform: {},
  form_input: {},
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
});
