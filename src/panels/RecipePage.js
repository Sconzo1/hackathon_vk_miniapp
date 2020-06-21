import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Panel, PanelHeader, Header, Group, Cell, Div, PanelHeaderButton, Avatar, Button } from '@vkontakte/vkui';

import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16CheckCircle from '@vkontakte/icons/dist/16/check_circle';

import colors from '../data/colors';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const osName = platform();

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
		fontSize: "15px",
		margin: "0%",
		padding: "0%",
		fontWeight: "620",
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

const RecipePage = ({ id, go, friendIngridients, recipeID }) => {
    const data = recipeID.PRODUCTS;
    const ingredients = Object.keys(data);

    const updatedFriendIngridients = friendIngridients
                    .filter(({INGRIDIENTS}) => INGRIDIENTS.some(t => ingredients.includes(t)))
                    .map(({USER, INGRIDIENTS}, i) => {
                        const temp_photo = USER.photo_100 ? 
                            <Avatar style={{border: `2.5px ridge ${colors[i % colors.length]}`}} size={48} src={USER.photo_100}/> :
                            null;
                        return ( {
                            "fullName_Text": `${USER.first_name + " " + USER.last_name}`,
                            "color_Hex": colors[i % colors.length],
                            "photo_100_Avatar": temp_photo,
                            "needIngredients_Array": INGRIDIENTS.filter(v => ingredients.includes(v))
                        } )
                    });

    updatedFriendIngridients.sort((a, b) => {
        if (a.needIngredients_Array.length < b.needIngredients_Array.length) {
            return 1;
        } 
        if (a.needIngredients_Array.length > b.needIngredients_Array.length) {
            return -1;
        } 
        return 0;
    });
    // console.log(updatedFriendIngridients);
    
    const listIngredients = ingredients.map((ingred,i) => {
        let t_color = "transparent";
        for (let friend of updatedFriendIngridients) {
            if ((friend.needIngredients_Array).includes(ingred)) {
                t_color = friend.color_Hex;
                break;
            }
        }
        return (<Cell 
            style={{margin: "-20px", padding: "-20px"}}
            key = {i}
            before={<Icon16CheckCircle style={{color: t_color}}/>}
            asideContent= {data[ingred]}>
            {ingred} 
        </Cell>)
    }); 

    listIngredients.sort((a, b) => {
        if (a.props.before.props.style.color !== "transparent" && b.props.before.props.style.color === "transparent") {
            return 1;
        }
        if (b.props.before.props.style.color !== "transparent" && a.props.before.props.style.color === "transparent") {
            return -1;
        }
        return 0; 
    });


    const listFriends = updatedFriendIngridients.map(data => 
                            <Cell
                            key={data.fullName_Text}
                            before={data.photo_100_Avatar}
                            >
                                {`${data.fullName_Text}`}
                            </Cell>)

    let img_src = null;
    for (let key in recipeID.IMG) {
        img_src = recipeID.IMG[key];
    }

    return(
        <Panel id={id}>
            <PanelHeader 
                left={<PanelHeaderButton onClick={go} data-to="homePage">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>
                {recipeID.NAME}
            </PanelHeader>
            
            <Avatar size = {"100%"} mode="image" src = {img_src} ></Avatar>
            
            <Div style={head.Div}>
                <Div style = {{width: "90%"}}>
                    <p style={head.p}>Ингридиенты:</p>
                    <br />
                    {listIngredients}
                    <br />
                </Div>
                
            </Div>

            <Group style={{margin: "0px", padding:"0px"}}>
            <Header mode="secondary" style={{marginBottom: "0px"}}>Рецепты:</Header>
                <Div style={{color: "#616161",padding:"0px"}}>
                    <Div style={{width: "80%", marginTop: "0px", marginRight: "0px", paddingRight: "0px"}}>
                    Таким образом реализация намеченных плановых заданий позволяет оценить значение систем массового участия. Значимость этих проблем.
                </Div>
            </Div>
            </Group>

            <Group>
                <Header mode="secondary">Список друзей</Header>
                {listFriends}
                    
            </Group>

            <Button size="xl" level="2" onClick={go} data-to="foodPartner">
					Повкусняшить вместе!
			</Button>     
        </Panel>        
    );    
}

RecipePage.propTypes = {
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

export default RecipePage;