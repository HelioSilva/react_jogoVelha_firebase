/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import firebase from './src/conn';

import Tela1 from './src/Tela1';
import Tela2 from './src/Tela2';
import JogoVelha from './src/JogoVelha';

const Navegador = createStackNavigator({
  Tela1:{
    screen:Tela1
  },
  JogoVelha:{
    screen:JogoVelha
  }
});

export default createAppContainer(Navegador);

