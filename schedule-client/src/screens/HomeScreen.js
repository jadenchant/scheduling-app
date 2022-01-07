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
  Switch,
} from 'react-native';
import GlobalFont from 'react-native-global-font';
import {useLinkTo} from '@react-navigation/native';

const NEXT_EVENT = [
  {
    title: '4:00 pm Thursday, November 12th ',
    data: ['Location: St Olaf Campus - Mentee: John'],
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const UpcomingEventsButton = () => {
  const linkTo = useLinkTo();
  return (
    <View>
    <Pressable
      style={styles.upcomingeventsbutton}
      onPress={() => useLinkTo('/Events')}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          
        }}
      >
        {'All Upcoming Events'}
      </Text>
    </Pressable>
    </View>
  );
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.42.235.127:3000',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      uid: 1,
      textsize: 12,
      mentor: true,
      alerts: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={{
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          marginHorizontal: 0,
          backgroundColor: String(this.props.route.params.get_Scolor()), //background
 
      }}>
        <Text
          style={{
            color:  String(this.props.route.params.get_Pcolor()),
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {'Next Upcoming Event'}
        </Text>
        <SectionList
          sections={NEXT_EVENT}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <Item title={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: String(this.props.route.params.get_Pcolor()),
          }}
        >
          {'Notifications'}
        </Text>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Joel'},
            {key: 'Jillian'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  eventContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    margin: 15,
  },
  event: {
    fontSize: 20,
  },
  ProfileStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9800',
  },
  input: {
    height: 0,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
  SettingsSyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
  },
  item: {
    backgroundColor: 'palegoldenrod',
    padding: 10,
    marginVertical: 5,
    width: '90%',
    //fontFamily: 'Roman, //Roman not working
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 20,
    left: '5%',
    borderWidth: 2,
    borderColor: 'black',
  },
  header: {
    fontSize: 20,
    backgroundColor: 'palegoldenrod',
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
  },

  data: {
    fontSize: 16,
  },

  upcomingeventsbutton: {
    fontSize: 20,
    backgroundColor: '#FFBF00',
    borderRadius: 20,
    borderWidth: 2,
    width: '70%',
    height: '7%',
    justifyContent: 'center',
    borderColor: 'black',
    padding: 1,
    alignItems: 'center',
    left: '15%',
    bottom: '11%',
  },
});
