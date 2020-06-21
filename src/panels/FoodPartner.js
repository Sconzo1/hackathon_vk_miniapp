import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Panel, PanelHeader, Group, Cell, Div, PanelHeaderButton, Avatar } from '@vkontakte/vkui';

import head from '../styles/head'

import IngridientsReview from '../components/IngridientsReview'

import Icon56GoodsCollection from '@vkontakte/icons/dist/56/goods_collection';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon16InfoOutline from '@vkontakte/icons/dist/16/info_outline';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';

const num = [1,2,3,4]
const fires = num.map(i => <Icon16Fire key={i}/>) 
const osName = platform();

const styles ={
    p: {
        width: "50px",
        fontFamily: "Roboto",
        align: "center",
        margin: "0%",
        color: "#777777"
    }
}

const FoodPartner = ({ id, go, fetchedUser, availableIngridient, recipelist, recipeID }) => {

    let currentRecipe = [];
    recipelist.forEach(element => {
        if (element.ID === recipeID.ID)
            currentRecipe = element;        
    });        

    let img_src = null;
    for (let key in currentRecipe.IMG) {
        img_src = currentRecipe.IMG[key];
    }

    let requiredIngridients = []
    for (let key in currentRecipe.PRODUCTS) {
        requiredIngridients.push(key);
    }


    return(
        <Panel id={id} >
            <PanelHeader
                transparent={false}
                left={<PanelHeaderButton onClick={go} data-to="homePage">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>
                {currentRecipe.NAME}
            </PanelHeader> 

            <img 
                height = '100%'
                width = '100%'
                src = {img_src} 
                >
            </img>

            <Div style={head.Div}>
                <Cell before={<Icon16InfoOutline />}>{currentRecipe.DESCRIPTION}</Cell>
            </Div>
            
            <Group 
                title="Cooking Level"
                style={{margin: "0%",  padding: "0%"}} >
                
                <Cell style={{margin: "0%", padding: "0%"}}
                    before={<Div style={{display: 'flex', marginTop: "0px"}}>Сложность: &nbsp; {fires}</Div>}
                    asideContent = {<Div style={{display: 'flex', marginTop: "0px"}}><Icon16Recent/>&nbsp; {currentRecipe.TIME}
                </Div>}>
                </Cell>
            </Group> 

            <Group 
                title="My Friend"
                style={{margin: "0%",  padding: "0%"}}>

                <Cell style={{margin: "10%", marginTop: "0%", padding: "0%"}}
                    before={<Avatar size={70} description='олололо' src={fetchedUser.photo_200}/>}
                    asideContent = {<Avatar size={70} src={fetchedUser.photo_200}></Avatar>}>
                        <Div>
                            <p style={styles.p}></p>
                            <p style={styles.p}>{<Icon56GoodsCollection/>}</p>
                            <p style={styles.p}></p> 
                        </Div>
                </Cell>
            </Group>

            <Group>
                <IngridientsReview id='ingridients-list' requiredIngridients={requiredIngridients} availableIngridient={availableIngridient}/>
            </Group>

        </Panel>
    )
};

FoodPartner.propTypes = {
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

export default FoodPartner;