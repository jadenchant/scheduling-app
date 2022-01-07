import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EventsScreen from './src/screens/EventsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ChildEventsScreen from './src/screens/ChildEventsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import MyErrorBoundary from './src/common/errorBoundary';

const Tab = createBottomTabNavigator();

export default class SchedulingClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://',
      formContentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      m: true,
      h: true,
      primary_color: 'black',
      secondary_color: 'goldenrod',
    };
  }

  render() {
    return (
    <MyErrorBoundary>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: this.state.h,
            }}
          >
            <Tab.Screen
              name='Home'
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name='home'
                    color={color}
                    size={size}
                  />
                ),
              }}
              
              initialParams={{
                get_Pcolor: () => this.state.primary_color
                ,
                get_Scolor: () => this.state.secondary_color,
              }}
            />

            <Tab.Screen
              name='Events'
              component={this.state.m ? EventsScreen : ChildEventsScreen}
              options={{
                tabBarLabel: 'Events',
                tabBarIcon: ({color, size}) => (
                  <MaterialIcons name='event' size={24} color={color} />
                ),
              }}
              initialParams={{
                get_Pcolor: () => this.state.primary_color,

                get_Scolor: () => this.state.secondary_color,
              }}
            />

            <Tab.Screen
              name='Notifications'
              component={NotificationScreen}
              options={{
                tabBarLabel: 'Notificiations',
                tabBarIcon: ({color, size}) => (
                  <Ionicons name='notifications' size={24} color={color} />
                ),
              }}
              initialParams={{
                get_Pcolor: () => {
                  return this.state.primary_color;
                },
                get_Scolor: () => {
                  return this.state.secondary_color;
                },

                set_NewEvent: newEvent => {
                  console.log(newEvent);
                  if (this.state.upcoming_events)
                    return this.setState({
                      upcoming_events: [
                        ...this.state.upcoming_events,
                        newEvent,
                      ],
                    });
                },
              }}
            />

            <Tab.Screen
              name='Profile'
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name='account'
                    color={color}
                    size={size}
                  />
                ),
              }}
              initialParams={{
                changem: Mentor => {
                  this.setState({m: Mentor});
                },
                changeh: H => {
                  this.setState({h: H});
                },
                changePcolor: color => 
                  this.setState({primary_color: color}),

                changeScolor: color => {
                  this.setState({secondary_color: color});
                },
                get_Pcolor: () => {
                  return this.state.primary_color;
                },
                get_Scolor: () => {
                  return this.state.secondary_color;
                },
              }}
              
            />
          </Tab.Navigator>
        </NavigationContainer>
      </MyErrorBoundary>
    );
  }
}
