import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';

import RecipePage from './panels/RecipePage';
import IngridientsCheck from './panels/IngridientsCheck';
import FoodPartner from './panels/FoodPartner';
import HomePage from './panels/HomePage';

import recipes from './data/Recipes';
import friends from './data/Friends';



// const DEFAULT_MEETING = {
// 	avatar: '',
// 	title: 'ДР Лехи',
// 	type: 'Вечеринка',
// 	sum: '6500',
// 	date: 'Вчера в 14:88'
// }


const App = () => {
	const [activePanel, setActivePanel] = useState('checkGoods');   
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	// const [meetings, setMeetings] = useState(null);
	// const [creators, setCreators] = useState(null);
	const [AVAILABLE_INGRIDIENTS, setAVAILABLE_INGRIDIENTS] = useState([]);
	const [token, setToken] = useState(null);
	// const [myFriends, setFriends] = useState(null);
	const [recipeID, setRecipeID] = useState(null);

	const [friendIngridients, setFriendIngridients] = useState(friends);
	const [nextUser, setNextUser] = useState(null);

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
		}
		// async function init() {
		// 	bridge.send("VKWebAppInit", {})
		// 		.then(data => {
		// 			console.log("VKWebAppInit - Ready");
		// 			fetchData();
		// 		})
		// 		.catch(e => console.log(e));
		// }

		async function getToken() {
			bridge.send("VKWebAppGetAuthToken", {"app_id":7511047, "scope":"friends"})
								.then(data => {
									setToken(data.access_token);
								})
								.catch(e => console.log(e));
		}

		fetchData();
		getToken();
	}, []);

	useEffect(() => {
		// console.log(token);
		async function getFriends() {
		    if (token != null && fetchedUser != null && fetchedUser !== undefined) {
		    	bridge
				.send("VKWebAppCallAPIMethod",
				{"method": "friends.get", "params": {"user_id": fetchedUser.id, "v":"5.110",
				"count":"5", "fields":"name, photo_100", "order":"name", "access_token":token}})
				.then(data => {
					// setFriends(data.response.items);
					// console.log(data.response.items);
					// 
					let t_friendIngridients = friendIngridients.map((frIng, i) => ({...frIng, "USER": data.response.items[i]}));
					// console.log(t_friendIngridients);
					setFriendIngridients(t_friendIngridients);
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
			<IngridientsCheck id='checkGoods' go={go} receptList={recipes} availableIngridients={AVAILABLE_INGRIDIENTS} setAvailableIngridients={setAVAILABLE_INGRIDIENTS} />
			<RecipePage id='recipePage' go={go} friendIngridients={friendIngridients} recipeID={recipeID} setNextUser={setNextUser}/>
			<HomePage id='homePage' fetchedUser={fetchedUser} go={go} setRecipeID={setRecipeID} />
			<FoodPartner id='foodPartner' go={go} fetchedUser={fetchedUser} nextUser={nextUser} availableIngridient={AVAILABLE_INGRIDIENTS} recipelist={recipes} recipeID={recipeID} />
		</View>
	);
}

export default App;

