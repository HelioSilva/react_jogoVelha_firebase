import React,{Component} from 'react' ;
import {View,Text,StyleSheet,TextInput,Button} from 'react-native';

import firebase from './conn';

export default class Tela1 extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            nome : ""
        }
    }

    jogarCOM1(){
        if(this.state.nome.length > 0){
            let jog = firebase.database().ref('game/sala1') ;
            jog.child('jogador1').set({
                nome:this.state.nome
            });
        }
        this.props.navigation.navigate('JogoVelha', {
            nome: this.state.nome,
        });

        alert("OK!");
    }
    jogarCOM2(){
        if(this.state.nome.length > 0){
            let jog = firebase.database().ref('game/sala1') ;
            jog.child('jogador2').set({
                nome:this.state.nome
            });
        }
        this.props.navigation.navigate('Tela2', {
            nome: this.state.nome,
        });

        alert("OK!");
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Nome do Usuário</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(nome) => this.setState({nome})}
                />

                <View style={{flexDirection:"row"}}>
                    <Button
                        title="Jogador 1"
                        onPress={()=>{this.jogarCOM1()}}
                    />
                    <Text> </Text>
                    <Button
                        title="Jogador 2"
                        onPress={()=>{this.jogarCOM2()}}
                    />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center' 
    }
  });