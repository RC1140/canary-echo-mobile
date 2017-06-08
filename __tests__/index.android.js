import 'react-native';
import React from 'react';
import CanaryMobile from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-fcm', () =>({
	  on: jest.fn(),
	  requestPermissions: jest.fn(),
	  getFCMToken: jest.fn(()=> new Promise((accept, resolve) => accept('FakeToken'))),
	  FCMEvent: {
		      Notification: 'fakeNotification',
		    },
}));

it('renders correctly', () => {
	const tree = renderer.create(
		<CanaryMobile />
	).toJSON();
	expect(tree).toMatchSnapshot();
});
