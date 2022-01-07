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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://10.42.235.127:3000',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      uid: 1,
      theme: true,
      size: '12',
      mentor: true,
      header: true,
      p_color: 'black',
      s_color: 'goldenrod',
    };
  }
  styles = StyleSheet.create({
    eventContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
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
      
      alignItems: 'center',
      backgroundColor: '#FF9800',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });

  _handle_apply() {

  }
  _handle_mentorchange = Mentor => {
    this.setState({mentor: Mentor});
  };
  _handle_headerchange = header => {
    this.setState({header: header});
    this.props.route.params.changeh(header);
  };
  _handle_Pcolorchange = p_color => {
    this.setState({p_color: p_color});
    this.props.route.params.changePcolor(p_color);
  };
  _handle_Scolorchange = s_color => {
    this.setState({s_color: s_color});
    this.props.route.params.changeScolor(s_color);
  };

  render() {
    return (
      <SafeAreaView style = {{
        width: '100%', 
        height: '100%',
        backgroundColor: this.state.s_color,
        }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: String(this.props.route.params.get_Scolor()),
        }}>
          <Text
          style = {{
            color: String(this.state.p_color),
            fontSize: 32,
            }}>
            Settings
          </Text>
          <Text>Mentor - {this.state.mentor ? 'Yes' : 'No'}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={this.state.mentor ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={(Mentor) => this._handle_mentorchange(Mentor)}
            value={this.state.mentor}
          />
          <Text>Header - {this.state.header ? 'Yes' : 'No'}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={this.state.header ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor='#3e3e3e'
            onValueChange={header => this._handle_headerchange(header)}
            value={this.state.header}
          />
          <Text style={{fontSize: 24}}>{' Primary Color'} </Text>
          <TextInput
            style={this.styles.form_input}
            underlineColorAndroid='transparent'
            placeholder={this.state.p_color}
            placeholderTextColor='#808080'
            autoCapitalize='none'
            onChangeText={color => this._handle_Pcolorchange(color)}
          />
          <Text style={{fontSize: 24}}>{' Background Color'} </Text>
          <TextInput
            style={this.styles.form_input}
            underlineColorAndroid='transparent'
            placeholder={this.state.s_color}
            placeholderTextColor='#808080'
            autoCapitalize='none'
            onChangeText={color => this._handle_Scolorchange(color)}
          />
          <Button
          title='Apply Changes'
          onPress={this._handle_apply()}
          color={"black"}
          />
        </View>
      </SafeAreaView>
    );
  }
}