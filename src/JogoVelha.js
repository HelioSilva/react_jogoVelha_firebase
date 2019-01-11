import React from 'react';
import { StyleSheet,TextInput, 
  Text, View,Keyboard,TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import X from './x';
import O from './o';

import firebase from './conn';


export default class JogoVelha extends React.Component {

  constructor(props){
      super(props);
      this.state = {
        resultado: "",
        camposVencedores:[],
        jogadas:0,
        aVez : 'x', 
        a1:'',
        a2:'',
        a3:'',
        b1:'',
        b2:'',
        b3:'',
        c1:'',
        c2:'',
        c3:'', 
      };   
      
      let data = firebase.database();
      let baseURL = "game/sala1/core/";
      let state = this.state; 
      
      data.ref(baseURL).on('value',(snapshot)=>{
        state.aVez    = snapshot.child("aVez").val();
        state.jogadas = snapshot.child("jogadas").val();
        state.a1      = snapshot.child("a1").val();
        state.a2      = snapshot.child("a2").val();
        state.a3      = snapshot.child("a3").val();
        state.b1      = snapshot.child("b1").val();
        state.b2      = snapshot.child("b2").val();
        state.b3      = snapshot.child("b3").val();
        state.c1      = snapshot.child("c1").val();
        state.c2      = snapshot.child("c2").val();
        state.c3      = snapshot.child("c3").val();
        state.resultado = snapshot.child("resultado").val();
        
        this.setState(state);       
      });  

  };


  getStyle(campo){
    if(this.state.resultado == ""){
      return{      
        flex:1 ,
        backgroundColor: '#abdfff',
        borderTopWidth:5 ,
        borderTopColor:'#032334'  ,
        justifyContent:'center',
        alignItems:'center' 
      }
    }else{
      var i;

        if( (this.state.camposVencedores[0] == campo) || (this.state.camposVencedores[1] == campo) ||
            (this.state.camposVencedores[2] == campo)  ){
          return{
            flex:1 ,
            backgroundColor: 'rgba(200,10,100,0.3)',
            borderTopWidth:5 ,
            borderTopColor:'#032334'  ,
            justifyContent:'center',
            alignItems:'center' 
          }
        } else {
          return{      
            flex:1 ,
            backgroundColor: '#abdfff',
            borderTopWidth:5 ,
            borderTopColor:'#032334'  ,
            justifyContent:'center',
            alignItems:'center' 
          }
        }      
    }
    
  }

  verificaVitoria(p){ 
      let state = this.state ;  

      if(this.state.a1==p && this.state.a2==p && this.state.a3==p) {
        state.camposVencedores[0] = 'a1';
        state.camposVencedores[1] = 'a2';
        state.camposVencedores[2] = 'a3';
        this.setState(state);
        return true ;
      }else if (this.state.b1==p && this.state.b2==p && this.state.b3==p) {
        state.camposVencedores[0] = 'b1';
        state.camposVencedores[1] = 'b2';
        state.camposVencedores[2] = 'b3';
        this.setState(state);
        return true ;
      }else if (this.state.c1==p && this.state.c2==p && this.state.c3==p) {
        state.camposVencedores[0] = 'c1';
        state.camposVencedores[1] = 'c2';
        state.camposVencedores[2] = 'c3';
        this.setState(state);
        return true ;
      }else if (this.state.a1==p && this.state.b1==p && this.state.c1==p) {
        state.camposVencedores[0] = 'a1';
        state.camposVencedores[1] = 'b1';
        state.camposVencedores[2] = 'c1';
        this.setState(state);
        return true ;
      }else if (this.state.a2==p && this.state.b2==p && this.state.c2==p) {
        state.camposVencedores[0] = 'a2';
        state.camposVencedores[1] = 'b2';
        state.camposVencedores[2] = 'c2';
        this.setState(state);
        return true ;
      }else if (this.state.a3==p && this.state.b3==p && this.state.c3==p) {
        state.camposVencedores[0] = 'a3';
        state.camposVencedores[1] = 'b3';
        state.camposVencedores[2] = 'c3';
        this.setState(state);
        return true ;
      }else if (this.state.a1==p && this.state.b2==p && this.state.c3==p) {
        state.camposVencedores[0] = 'a1';
        state.camposVencedores[1] = 'b2';
        state.camposVencedores[2] = 'c3';
        this.setState(state);
        return true ;
      }else if (this.state.a3==p && this.state.b2==p && this.state.c1==p){
        state.camposVencedores[0] = 'a3';
        state.camposVencedores[1] = 'b2';
        state.camposVencedores[2] = 'c1';
        this.setState(state);
        return true ;
      }else{
        return false ;
      }      
  }

  clicou(p){    

    let state = this.state;

    if (state.resultado == ""){

        //if(eval('state.'+p) == ''){      
          firebase.database().ref('game/sala1/core/'+p).set(state.aVez);
          
          if (this.verificaVitoria(state.aVez)){            
              firebase.database().ref('game/sala1/core/resultado/').set("ho no!;!"); 
          }
          
          if (state.aVez == "x"){
            firebase.database().ref('game/sala1/core/aVez/').set("o"); 
          }else{
            firebase.database().ref('game/sala1/core/aVez/').set("x");
          }
          firebase.database().ref('game/sala1/core/jogadas').set("8");        
        //}          
    }    
  }

  reiniciar(){
    firebase.database().ref('game/sala1/core/').set({
      aVez:this.state.aVez ,
      jogadas:0,
      resultado:""
    });
   
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.area}>
          <View style={[styles.velhaVertical,{borderLeftWidth:0}]}>

       <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('a1')}} style={[this.getStyle('a1'),{borderTopWidth:0}]} > 
            
              <View>
                {this.state.a1 == 'x' && <X />}
                {this.state.a1 == 'o' && <O />}
              </View>             
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('a2')}} style={this.getStyle('a2')}>
              <View>
                {this.state.a2 == 'x' && <X />}
                {this.state.a2 == 'o' && <O />}
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('a3')}} style={this.getStyle('a3')}>
              <View> 
                {this.state.a3 == 'x' && <X />}
                {this.state.a3 == 'o' && <O />}
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.velhaVertical}>
            <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('b1')}} style={[this.getStyle('b1'),{borderTopWidth:0}]}>
              <View>
                {this.state.b1 == 'x' && <X />}
                {this.state.b1 == 'o' && <O />}  
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('b2')}} style={this.getStyle('b2')}>
                <View>
                {this.state.b2 == 'x' && <X />}
                {this.state.b2 == 'o' && <O />}
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('b3')}} style={this.getStyle('b3')}>
            <View>
                {this.state.b3 == 'x' && <X />}
                {this.state.b3 == 'o' && <O />}
                </View>
            </TouchableHighlight>
          </View>
          <View style={styles.velhaVertical}>
                <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('c1')}} style={[this.getStyle('c1'),{borderTopWidth:0}]}>
                <View>
                  {this.state.c1 == 'x' && <X />}
                  {this.state.c1 == 'o' && <O />}
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('c2')}} style={this.getStyle('c2')}>
                <View>
                  {this.state.c2 == 'x' && <X />}
                  {this.state.c2 == 'o' && <O />}
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#EEE" onPress={() => {this.clicou('c3')}} style={this.getStyle('c3')}>
                <View>
                  {this.state.c3 == 'x' && <X />}
                  {this.state.c3 == 'o' && <O />}
                  </View>
                </TouchableHighlight>
          </View>

        </View>

        <View style={styles.infoArea}>
            <View style={styles.infoVez}>
              <Text>Vez:</Text>
              {this.state.aVez == "x" && <X />}
              {this.state.aVez == "o" && <O />}
            </View>
            <View style={styles.infoAviso}>
              {this.state.resultado == "x" ? <Animatable.View animation="fadeInLeft" easing="ease-in-cubic" iterationCount={3} direction="alternate"  duration={500}><X /></Animatable.View> : null }
              {this.state.resultado == "o" ? <Animatable.View animation="fadeInLeft" easing="ease-in-cubic" iterationCount={3} direction="alternate"  duration={500}><O /></Animatable.View> : null }
              {this.state.resultado != "" ?
                <Text style={{fontSize:20,color:"#FF0000"}}>Venceu!</Text>
                :
                null           
              }
              {this.state.jogadas == 9 && this.state.resultado == "" ? 
               <Animatable.Text animation="slideInDown" iterationCount={3} direction="alternate" duration={500} style={{fontSize:20,color:"#FF0000"}}>Empate!</Animatable.Text> 
                :
                null            
              }
              
            </View>
        </View>
        <TouchableHighlight style={{justifyContent:"center",alignItems:"center"}} underlayColor='#CCC' onPress={() => {this.reiniciar()}}>
        <View style={styles.infoArea}> 
             <Icon name="ios-refresh" style={{fontSize:50}} />                     
        </View>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    alignItems: 'center',
    paddingTop:40
  },
  area:{
    width:300,
    height:300,
    backgroundColor:'#fff',
    flexDirection:'row'
  },
  velhaVertical:{
    flex:1 ,
    backgroundColor: '#ddddff',
    borderLeftWidth:5 ,
    borderLeftColor:'#032334'   ,
    width:2 
  },
  velhaHori:{
    flex:1 ,
    backgroundColor: '#abdfff',
    borderTopWidth:5 ,
    borderTopColor:'#032334'  ,
    justifyContent:'center',
    alignItems:'center'
  },
  infoArea:{
    marginTop:30,
    flexDirection:'row',
  },
  infoVez:{
    width:90,
    height:90,
    backgroundColor:'#CCCCCC',
    justifyContent:'center',
    alignItems:'center'
  },
  infoAviso:{
    flex:1,
    backgroundColor:'#EEE',
    justifyContent:'center',
    alignItems:'center'
  }

});
  