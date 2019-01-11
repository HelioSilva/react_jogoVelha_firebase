import React,{Component} from 'react';
import {View,StyleSheet,Animated,Easing} from 'react-native';


export default class O extends Component{

    constructor(props){
        super(props);
        this.state = {
            altura:new Animated.Value(0)
        };

        Animated.timing(
            this.state.altura,{
                toValue:60,duration:500,easing:Easing.elastic(0.5)
            }
        ).start();
    
    }

    render(){
        return(
            <Animated.View style={styles.area}>
                <Animated.View style={[styles.circulo,{height:this.state.altura}]}></Animated.View>           
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    area:{
        width:60,
        height:60,
        justifyContent:'center',
        alignItems:'center'
    },
    circulo:{
        width:60,
        backgroundColor:'#FF0000',
        borderRadius:30
    }
});