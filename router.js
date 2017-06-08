import RegisterScene from './register';
import React, { Component } from 'react';

let CanaryRouter = {
    getRegisterRoute(token) {
        return {
            renderScene(nav) {
                return <RegisterScene navigator={nav} token={token} />;
            }
        };
    },
    getHomeRoute() {
        return {
            getSceneClass() {
                return require('./home');
            },
            onDidFocus(event) {
                console.log('Home Scene received focus.');
            }
        };
    }
};

module.exports = CanaryRouter
