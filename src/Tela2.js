import React,{Component} from 'react' ;
import {View,Text,StyleSheet,TextInput,Button} from 'react-native';

export default class Tela2 extends Component{
    
    render(){
        let parametros = this.props.navigation.state.params ; 
        return(
            <View><Text>{parametros.nome}</Text></View>
        );
    }
}