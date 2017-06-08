import React, { Component } from 'react';
import { View,StyleSheet,AsyncStorage,AppRegistry, Text, Alert } from 'react-native';
import { Form,Label,Input,Item, Drawer, Container,
         Header, Title, Content, Footer, FooterTab,
         Button, Left, Right, Body, Icon } from 'native-base';

import ExNavigator from '@expo/react-native-navigator';
var CanaryRouter = require('./router')

export default class HomeScene extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    logout = () => {
        AsyncStorage.setItem("echoHost", '');
        let route = CanaryRouter.getRegisterRoute();
        this.props.navigator.push(route);
    }

    render() {
        return (
            <Container style={{ flex: 1 }} >
                <Header>
                    <Body>
                        <Title>Canary Echo</Title>
                    </Body>
                    <Right>
                        <Button light transparent onPress={this.logout} >
                            <Icon name='log-out' />
                        </Button>
                    </Right>
                </Header>
                        <View style={styles.topBox}>
                        <Text style={styles.headline}> Device Registered </Text>
                        </View>
            </Container>
        );
    }
}
var styles = StyleSheet.create({
    topBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline :{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        flex: 1,
    },

});


module.exports = HomeScene
