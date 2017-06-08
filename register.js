import React, { Component } from 'react';
import { AsyncStorage,Text} from 'react-native';
import { Form,Label,Input,Item, Container,
         Spinner, StyleProvider,
         Header, Title, Content,
         Button,Toast , Left, Right, Body, Icon } from 'native-base';

import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/material';

export default class RegisterScene extends Component {
    constructor(props){
        super(props);
        this.state = {
            host:'https://echo.superuser.co.za',
            username:'',
            password:'',
            token: this.props.token,
            loading: false,
            registered:false
        };
    }

    componentDidUpdate = (prevProps,prevState) => {
        if(this.state.registered){
            let route = require('./router').getHomeRoute();
            this.props.navigator.push(route);
        }
    }

    componentDidMount = async () => {
        var host = await AsyncStorage.getItem("echoHost")
        if (host !== null){
            let route = require('./router').getHomeRoute();
            this.props.navigator.push(route);
        }
    }

    register = () => {
        let that = this;
        this.setState({loading:true});
        fetch(this.state.host +'/register-token/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: this.state.username,
                Password: this.state.password,
                Token: this.state.token,
            }),
        }).then(function(response) {
            that.setState({loading:false});
            if (response.status == 200) {
                that.setState({registered:true});
                AsyncStorage.setItem("echoHost", that.state.host);
                Toast.show({
                    text: 'Device Registered',
                    position: 'bottom',
                    buttonText: 'Okay'
                });
            } else {
                if (response.status == 401) {
                    Toast.show({
                        text: 'Invalid Creds',
                        position: 'bottom',
                        buttonText: 'Okay'
                    });
                };
            };
        }).catch(function(error) {
            that.setState({loading:false});
            Toast.show({
              text: 'Failed To Register Device',
              position: 'bottom',
              buttonText: 'Okay'
            });
        });
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    onIds = (device) => {
        this.setState({token:device.userId});
    }

    render() {
        let loginButtonInner;
        let finalURL = this.state.host + '/personal/' + this.state.username;
        if (this.state.loading) {
            loginButtonInner = (
                <Spinner color='white' />
            )
        } else {
            loginButtonInner = (
                <Text style={{ color: '#5A3662' }} >Register Device</Text>
            )
        }
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Left/>
                        <Body>
                            <Title style={{ color: '#5A3662' }}>Canary Echo</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Form>
                            <Item inlineLabel>
                                <Label>Device ID</Label>
                                <Input
                                    onChangeText={(text) => this.setState({username:text})}
                                    value={this.state.username}
                                />
                            </Item>
                            <Item inlineLabel>
                                <Label>Device Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({password:text})}
                                    value={this.state.password}
                                />
                            </Item>
                            <Item inlineLabel>
                                <Label>Echo Host</Label>
                                <Input
                                    placeholder={this.state.host}
                                    onChangeText={(text) => this.setState({host:text})}
                                    value={this.state.host}
                                />
                            </Item>
                            <Item last>
                                <Label>Your Canary URL is <Text>{ finalURL }</Text></Label>
                            </Item>
                            <Button block onPress={this.register}>
                                {loginButtonInner}
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

module.exports = RegisterScene
