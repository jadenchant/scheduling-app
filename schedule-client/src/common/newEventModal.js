import React, {useState, useEffect} from 'react';
import {Text, Modal, Pressable, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {MaskedTextInput} from 'react-native-mask-text';
import {ScrollView} from 'react-native-gesture-handler';

export default function NewEventModal({
  modalvisible,
  predefinedChildname,
  toggleModalVisible,
  confirm,
}) {
  const [activity, setActivity] = useState('');
  const [childname, setChildname] = useState(predefinedChildname || '');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [stime, setStime] = useState('');
  const [etime, setEtime] = useState('');
  // const [duration, setDuration] = useState('')

  useEffect(() => {
    setChildname(predefinedChildname);
  }, [predefinedChildname]);

  return (
    <Modal animationType='slide' transparent={true} visible={modalvisible}>
      <View style={styles.modalView}>
        <ScrollView style={styles.addeventform}>
          <Text style={styles.formHeader}>{'Add Event'}</Text>
          <TextInput
            // style={styles.formInput}
            label='Activity'
            value={activity}
            mode='outlined'
            onChangeText={act => setActivity(act)}
          />
          <TextInput
            // style={styles.formInput}
            label='Childname'
            value={childname}
            mode='outlined'
            onChangeText={act => setChildname(act)}
            disabled={!!predefinedChildname}
          />
          <TextInput
            // style={styles.formInput}
            label='Location'
            value={location}
            mode='outlined'
            onChangeText={local => setLocation(local)}
          />
          <TextInput
            // style={styles.formInput}
            label='Date'
            mode='outlined'
            placeholder={'00/00/0000'}
            maxLength={10}
            keyboardType='numeric'
            value={date}
            render={props => (
              <MaskedTextInput
                {...props}
                onChangeText={(text, rawText) => {
                  setDate(text);
                }}
                mask='99/99/9999'
              />
            )}
          />
          <TextInput
            // style={styles.formInput}
            label='Start Time'
            mode='outlined'
            placeholder={'00:00'}
            maxLength={5}
            keyboardType='numeric'
            value={stime}
            render={props => (
              <MaskedTextInput
                {...props}
                onChangeText={(text, rawText) => {
                  setStime(text);
                }}
                mask='99:99'
              />
            )}
          />
          <TextInput
            // style={styles.formInput}
            label='End Time'
            mode='outlined'
            placeholder={'00:00'}
            maxLength={5}
            keyboardType='numeric'
            value={etime}
            render={props => (
              <MaskedTextInput
                {...props}
                onChangeText={(text, rawText) => {
                  setEtime(text);
                }}
                mask='99:99'
              />
            )}
          />
          {/* <TextInput
                // style={styles.formInput}
                label='Duration'
                mode='outlined'
                placeholder={'00:00'}
                maxLength={5}
                keyboardType='numeric'
                value={duration}
                render={props => (
                  <MaskedTextInput
                    {...props}
                    onChangeText={(text, rawText) => {
                      setDuration(rawText);
                    }}
                    mask='99:99'
                  />
                )}
                disabled={true}
              />  */}
        </ScrollView>
        <View style={styles.bottomButtonView}>
          <Pressable
            style={styles.bottomButton}
            onPress={() => toggleModalVisible()}
          >
            <Text style={{color: 'red', fontSize: 20}}>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.bottomButton}
            onPress={() => {
              confirm({
                activity,
                childname,
                date,
                location,
                stime,
                etime,
                // duration,
              });
              toggleModalVisible();
            }}
          >
            <Text style={{color: 'green', fontSize: 20}}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
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
  formHeader: {
    fontSize: 40,
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 7,
  },
  addeventform: {
    margin: '8%'
  },
  formInput: {
    fontSize: 20,
    marginBottom: 7,
    borderWidth: 2,
    padding: 5,
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    width: 100,
    height: 40,
    position: 'relative',
  },
});
