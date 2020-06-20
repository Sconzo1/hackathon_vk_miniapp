import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import head from './head'

import Meeting from './Meeting';

import persik from '../img/persik.png';
import family from '../img/Family.jpg';


const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id} style={head.Panel}>
		<PanelHeader>FFF</PanelHeader>
		{fetchedUser &&
		<Group 
			style = {head.Group}
			title="User Data Fetched with VK Bridge">
			<Cell
				before={fetchedUser.photo_200 ? <Avatar size={65} src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				<p style={head.p}>{`Здравствуйте,`} <br/>{`${fetchedUser.first_name}!`}</p>
			</Cell>
		</Group>}

		<Group 
			style = {head.Group}
			title="My friends' hangouts">			
			<Cell style={{marginRight: "0%"}}>
            	<label>Мероприятия друзей</label>		
				<Meeting 
					title="На шашлыки" 
					picture = {family}
					date={'22.04'} 
					time={'14:00'} 
					num = {'11'}
					fetchedUser={fetchedUser}/>
				
				<Meeting 
					title="Романтика" 
					picture = {persik}
					date={'14.04'} 
					time={'22:50'} 
					num = {'23'}
					fetchedUser={fetchedUser}/>
			</Cell>
		</Group>


		<Group title="Navigation Example">
			<Div>
				<Button mode="secondary" size="xl" level="2" onClick={go} data-to="foodPartner">
					Создать комнату
				</Button>
				<Button mode="tertiary" size="xl" level="2" onClick={go} data-to="checkGoods">
					Присоединиться к VIP
				</Button>
			</Div>
		</Group> 
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
