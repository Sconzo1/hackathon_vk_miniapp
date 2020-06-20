import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import head from './head'
import {List} from '@vkontakte/vkui';

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
        if (element.ID === recipeID)
            currentRecipe = element;        
    });        

    let img_src = null;
    for (let key in currentRecipe.IMG) {
        img_src = currentRecipe.IMG[key];
    }
    console.log(img_src);

    let requiredIngridients = []
    for (let key in currentRecipe.PRODUCTS) {
        requiredIngridients.push(key);
    }


    return(
        <Panel id={id} style={head.Panel}>
            <PanelHeader
                separator={false} 
                left={<PanelHeaderButton onClick={go} data-to="home">
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderButton>}>
                {currentRecipe.NAME}
            </PanelHeader>
            
            <Div>
                <Avatar 
                    size = {"100%"}mode="image" 
                    src = {img_src} 
                    >
                </Avatar>
                
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
                    <List id='ingridients-list' >
                    {                
                    requiredIngridients.map((ingridient, i) => {                    
                        if (availableIngridient.indexOf(ingridient) != -1) {
                            return <Cell key={i} style={{textAlign: 'center', border: 1}}> {ingridient} </Cell>
                        } else return <Cell key={i} style={{textAlign: 'center'}}> {ingridient} </Cell>
                    })}
                    </List>
                </Group>
            </Div>
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