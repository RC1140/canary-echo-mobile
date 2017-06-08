import React, { Component } from 'react';
import { View,AppRegistry, Text, Alert } from 'react-native';
import { Label,Container, Content, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import ExNavigator from '@expo/react-native-navigator';
import NotificationClient from './notification';

var CanaryRouter = require('./router')

export default class CanaryMobile extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: '',
            loaded: false
        };
    }
    render() {
        if (!this.state.loaded) {
            return (
                <Grid>
                    <Row>
		        <NotificationClient
			    onChangeToken={token => this.setState({token:token,loaded:true})} />
		    </Row>
                    <Row>
                        <Col></Col>
                        <Col style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Spinner/>
                            <Text>Loading...</Text>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row ></Row>
                </Grid>
            );
        }
        return (
		<View>
		<ExNavigator
		initialRoute={CanaryRouter.getRegisterRoute(this.state.token)}
		showNavigationBar={false}
		style={{ flex: 1 }}
		/>
		<NotificationClient
		onChangeToken={token => this.setState({token:token,loaded:true})} />
		</View>

        );
    }
}

AppRegistry.registerComponent('CanaryMobile', () => CanaryMobile);
