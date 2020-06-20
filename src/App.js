import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import MeetingList from './panels/MeetingList';
import Party from './panels/Party';

const DEFAULT_MEETING = {
	avatar: '',
	title: 'ДР Лехи',
	type: 'Вечеринка',
	sum: '6500',
	date: 'Вчера в 14:88'
}

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	// const [room, setRoom] = useState(null);
	const [meetings, setMeetings] = useState(null);
	const [creators, setCreators] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
			setCreators(user);
			setMeetings({

			})
		}
		fetchData();

		// async function getData() {

		// 	const data = {
		// 		"operation": "test"
		// 	};

		// 	fetch("https://b3a936e984e4.ngrok.io", {
		// 		method: "POST",
		// 		body:  JSON.stringify(data),
		// 		headers: new Headers({
		// 			'Content-Type': 'application/json;charset=utf-8'
		// 		})
		// 	})
		// 	.then(res => {
		// 		res.json().then(data => {
		// 			setRoom(data);
		// 		});
				

		// 	})
			
		// }

		// getData();
	}, []);

	// console.log(room);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<MeetingList id='meetingsList' go={go} meetings={meetings} creators={creators} default_meeting={DEFAULT_MEETING} />
			<Party id='party' go={go} fetchedUser={fetchedUser} />
		</View>
	);
}

export default App;

