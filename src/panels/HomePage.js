import React from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, Group, Cell, Avatar, Separator, Button} from '@vkontakte/vkui';

import Icon28WriteOutline from '@vkontakte/icons/dist/28/write_outline';

import recipes from '../data/Recipes'
import BanerPage from '../components/BanerPage'

const head ={
	Panel: {
		display: "flex",
		alignItems: "center",
		alignContent: "center"
	},
	Group: {
		marginLeft: "0%"
	},
	p: {
		lineHeight: "25px",
		fontSize: "18px",
		margin: "0%",
		padding: "0%",
		fontWeight: "520",
		fontFamily: "Tahoma",
		color: "#000000"
	},
	Div: {
        lineHeight: "25px",
		fontSize: "18px",
		margin: "0%",
		padding: "0%",
		fontWeight: "520",
		fontFamily: "Tahoma",
		background: "#F0F0F0",
		borderRadius: "0.5rem 0.5rem 1.25rem 1.25rem",
		marginTop: "0px"
	}
}

const HomePage = ({ id, go, fetchedUser, setRecipeID }) => {

    return(
        <Panel id={id} >
            <PanelHeader>Three F</PanelHeader>
            {fetchedUser &&
            <Group 
                style = {head.Group}
                title="User Data Fetched with VK Bridge">
                <Cell
                    before={fetchedUser.photo_200 ? <Avatar size = {65} src={fetchedUser.photo_200}/> : null}
                    description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
                >
                    <p style={head.p}>{`Здравствуйте,`} {`${fetchedUser.first_name}!`}</p>
                </Cell>
                <Button 
					size="xl" 
					mode="secondary"
					data-to="checkGoods"
					onClick={(e) => go(e)}
					> 
						{ <span role='img'>✏️ Редакторовать список продуктов</span> } 
				</Button>
            </Group>}
            
			<Separator style={{ marginTop: '8px' }} />
            {
			recipes.map(o => 
				<BanerPage 
					key={o.ID}
					go={go}
					setRecipeID={setRecipeID}
					index ={o.ID-1}/>) 
			}
        </Panel>        
    );
    
}

HomePage.propTypes = {
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

export default HomePage;