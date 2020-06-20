import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import PanelHeaderContent from '@vkontakte/vkui/dist/components/PanelHeaderContent/PanelHeaderContent';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { platform, IOS, CardGrid, Card } from '@vkontakte/vkui';
import persik from '../img/persik.png';

const osName = platform();

const Party = ({ id, go, fetchedUser }) => {	
	return (
		<Panel id={id} >
			<PanelHeader 
				left={
					<PanelHeaderButton 
					onClick={go} 
					data-to="home">
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
					</PanelHeaderButton>}>
				<PanelHeaderContent
					style = {HeadStyle.Avatar}
					status="14 человек"
					before={<Avatar size={50} src={persik}/>}>
					На шашлыки
				</PanelHeaderContent>
			</PanelHeader>
			
			<Group>
				<CardGrid>
					<Card size="m" >
						<div style={{ height: 40}} /> 
						<div style={HeadStyle.small}>22.04 </div>
						<div style={HeadStyle.large}>14:50 </div>
					</Card>
					<Card size="m" >
						<div style={{ height: 40}} />
						<div style={HeadStyle.place}>Гриль-бар “Пушкин” </div>
					</Card>
				</CardGrid>
			</Group>
		</Panel>
	)
};

const HeadStyle =  {
	Icon28ChevronBack, Icon24Back, Avatar:{
		padding: '1rem',
		margin: '1rem',
	},
	large: {
		fontWeight: 'Bold',
		color: 'Indigo',
		fontSize: '36px',
		paddingLeft: '2rem',
		marginBottom: '1.5rem',
		textAlign: 'left',
	},
	small: {
		fontWeight: 'Bold',
		color: 'Indigo',
		fontSize: '18px',
		paddingLeft: '2.5rem',		
		textAlign: 'left',
	},
	place: {
		fontSize: '22px',
		paddingRight: '3rem',
		marginBottom: '3rem',		
		textAlign: 'right',
	}
}

Party.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Party;