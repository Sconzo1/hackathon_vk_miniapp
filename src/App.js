import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import MeetingList from './panels/MeetingList';
import Party from './panels/Party';
import IngridientsCheck from './panels/IngridientsCheck';
import FoodPartner from './panels/FoodPartner';

import buzza from './img/Buzza.jpg';
import pancake from './img/Pancake.jpg';
import redsea from './img/RedSea.jpg';
import funchoza from './img/Funchoza.jpg';
import oreo from './img/Оreo.jpg';


const recipes = [
    {
        ID: 1,
        NAME: 'Буззы',
        DESCRIPTION: 'Праздник у подруги',
        IMG: {buzza},
        TIME: '1 час',
        PRODUCTS: {'Вода': '200 мл', 'Растительное масло': '1 Ст. ложка', 'Яйцо': '1шт',
                    'Мука': '500 гр', 'Говядина': '700 гр.', 'Лук': '3 шт', 
                    'Черный молотый перец': 'По вкусу', 'Соль': 'По вкусу'}
    },
    {
        ID: 2,
        NAME: 'Блины',
        DESCRIPTION: 'На десерт',
        IMG: {pancake},
        TIME: '30 мин',
        PRODUCTS: {'Мука': '75 гр', 'Молоко': '250 мл', 'Сливочное масло': '1 Ст. ложка', 
                    'Яйцо': '1 шт', 'Сахар': '1 Ст. ложка', 'Ванилин': 'По вкусу'}
    },
    {
        ID: 3,
        NAME: 'Красное море',
        DESCRIPTION: 'На скорую руку',
        IMG: {redsea},
        TIME: '10 мин',
        PRODUCTS: {'Крабовые палочки': '250-300 гр', 'Помидоры': '1-2 шт', 'Сыр': '150 гр', 
                    'Чеснок': '2 зубчика', 'Майонез': 'По вкусу', 'Соль': 'По вкусу'}
    },
    {
        ID: 4,
        NAME: 'Фунчоза',
        DESCRIPTION: 'На праздник',
        IMG: {funchoza},
        TIME: '40 мин',
        PRODUCTS: {'Курица': '400 гр', 'Лук': '1 шт', 'Морковь': '1 шт', 
                    'Болгарский перец': '1 шт', 'Фунчоза':  '200 гр', 'Соевый соус': '',
                    'Соль': 'По вкусу', 'Перец': 'По вкусу', 'Растительное масло': ''}
    },
    {
        ID: 5,
        NAME: 'Шоколадные печенья',
        DESCRIPTION: 'Что-то сладкое',
        IMG: {oreo},
        TIME: '20 мин',
        PRODUCTS: {'Масло сливочное': '115 гр', 'Молоко': '25 гр', 'Яйцо': '1 шт', 
                   'Мука': '150 г', 'Какао-порошок': '50 гр', 'Сахар': '100 гр',
                    'Сахар ванильный': '2 пакетика', 'Разрыхлитель': '5 гр', 'Пудра сахарная': '140 гр'}
    },
    
]

const DEFAULT_MEETING = {
	avatar: '',
	title: 'ДР Лехи',
	type: 'Вечеринка',
	sum: '6500',
	date: 'Вчера в 14:88'
}


const App = () => {
	const [activePanel, setActivePanel] = useState('checkGoods');   
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [meetings, setMeetings] = useState(null);
	const [creators, setCreators] = useState(null);
	const [AVAILABLE_INGRIDIENTS, setAVAILABLE_INGRIDIENTS] = useState([]);
	const [token, setToken] = useState(null);
	const [myFriends, setFriends] = useState(null);

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
		async function init() {
			bridge.send("VKWebAppInit", {})
				.then(data => {
					console.log("VKWebAppInit - Ready");
					fetchData();
				})
				.catch(e => console.log(e));
		}

		async function getToken() {
			bridge.send("VKWebAppGetAuthToken", {"app_id":7511047, "scope":"friends"})
								.then(data => {
									setToken(data.access_token);
								}).
								catch(e => console.log(e));
		}

		init();
		getToken();
	}, []);

	useEffect(() => {
		// console.log(token);
		async function getFriends() {
		    if (token != null && fetchedUser != null && fetchedUser !== undefined) {
		    	bridge
				.send("VKWebAppCallAPIMethod",
				{"method": "friends.get", "params": {"user_id": fetchedUser.id, "v":"5.110",
				"count":"5", "fields":"name, photo_100", "order":"random", "access_token":token}})
				.then(data => {
					setFriends(data.response);
					// console.log(data.response);
				})
				.catch(e => {
					console.log(e);
				});
		    }
			
		}

		getFriends();
	}, [token, fetchedUser]);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<IngridientsCheck id='checkGoods' go={go} receptList={recipes} setAvailableIngridients={setAVAILABLE_INGRIDIENTS} />
			<Home id='home' fetchedUser={fetchedUser} go={go} />
			<MeetingList id='meetingsList' go={go} meetings={meetings} creators={creators} default_meeting={DEFAULT_MEETING} />
			<Party id='party' go={go} fetchedUser={fetchedUser} />
			<FoodPartner id='foodPartner' go={go} fetchedUser={fetchedUser} availableIngridient={AVAILABLE_INGRIDIENTS} recipelist={recipes} recipeID={1} />
		</View>
	);
}

export default App;

