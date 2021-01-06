/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Switch,
} from 'react-native';

import RNRestart from 'react-native-restart';

import {
  Paper
} from "@material-ui/core";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {isEnabled} from "react-native/Libraries/Pressability/PressabilityDebug";

const apiPipelineInfo = () => {};

function refreshPage()
{
  window.location.reload();
}



/**
 * Note: make app work well by binding inputs to the base app,
 * and having views as their own components.
 *
 * More complicated views which need their own inputs will
 * manage their own state.
 *
 *
 */
class App extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      pipe_js: '',
      pipe_id: '',
      created_at: '',
      pipe_ref: '',
      enabled1: false,
      verboseSwitch: false,
      pipe_button_color: 'white'
    };
  }

  /**
   *
   * UI inputs should be bound to the base app's state, while
   * components with their own components will handle and
   * resolve their own inputs.
   *
   * TODO:: add extra pipeline info to the area beneath the main view
   * TODO:: create proper polling system of the back-end API so a refresh is not needed
   * TODO::
   * TODO::
   *
   *
   */
  toggleSwitch = () => {
    this.setState({
      enabled1: !this.state.enabled1
    });
  };

  toggleVerboseSwitch = () => {
    this.setState({
      verboseSwitch: !this.state.verboseSwitch
    });
  };

  forceUpdateHandler = () => {
    this.forceUpdate();
  };

  fetchData = () => {
    fetch('http://10.0.0.121:3750/pipeline/1234')
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            pipe_js: json.status,
            pipe_id: json.id,
            pipe_ref: json.ref,
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  componentDidMount() {
    /*
    fetch('http://10.0.0.121:3750/pipeline/1234')
        .then((response) => response.json())
        .then((json) => {
          this.setState({
            pipe_js: json.status,
          });
        })
        .catch((error) => {
          console.error(error);
        });

     */
    this.interval = setInterval(() => this.fetchData(), 15000);
    //this.fetchData();

  }

  componentWillUnmount()
  {
    clearInterval(this.interval);
  }


  mapPipeStatusToColor(stat)
  {
      if(stat === 'running')
      {
        return 'teal'
      }
      if(stat === 'failed')
      {
        return 'red'
      }
      if(stat === 'passed')
      {
        return 'green'
      }
      else
      {
        return 'white'
      }
  }

  render() {
    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
              {global.HermesInternal == null ? null : (
                  <View style={styles.engine}>
                    <Text style={styles.footer}>Engine: Hermes</Text>
                  </View>
              )}
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Gitlab Pipeline Viewer</Text>
                  <Text style={styles.sectionDescription}>

                    Pipelines will show up here
                  </Text>
                </View>
                <View style={styles.container}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={ this.state.enabled1 ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={this.toggleSwitch}
                    value={this.state.enabled1}
                />
                <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={ this.state.verboseSwitch ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={this.toggleVerboseSwitch}
                      value={this.state.verboseSwitch}/>
                </View>
                <Button variant="primary" title={`[${this.state.pipe_js}] :: ID: ${this.state.pipe_id} :: ${this.state.pipe_ref}` } color={this.mapPipeStatusToColor(this.state.pipe_js)} onPress={this.fetchData}/>
              </View>
              <View style={{ backgroundColor: "white", flex: 0.3 }}>
                <Text style={styles.sectionDescription}>{this.state.pipe_js}</Text>
              </View>
            </ScrollView>

          </SafeAreaView>
          <ScrollView
            style={styles.scrollView}>
            <Text style={styles.sectionDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.

            </Text>
          </ScrollView>
        </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
