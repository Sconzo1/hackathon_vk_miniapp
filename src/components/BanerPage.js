import React from 'react';
import {Group, Cell, Div, Avatar} from '@vkontakte/vkui';

import recipes from '../data/Recipes'

import Icon16InfoOutline from '@vkontakte/icons/dist/16/info_outline';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon16Recent from '@vkontakte/icons/dist/16/recent';

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

function getFires(i) {
    const num = [...Array(i).keys()];
    return num.map(i => <Icon16Fire key={i}/>) 

}

const BanerPage = ({ index, go, setRecipeID }) =>{

    let img_src = null;
    for (let key in recipes[index].IMG) {
        img_src = recipes[index].IMG[key];
    }

    return(
        <Cell 					
			data-to='recipePage'
			onClick={(e) => {
				go(e);
				setRecipeID(recipes[index])
			}} 
			>

            <Avatar size = {"100%"} mode="image" src = {img_src} ></Avatar>            
            
            <Div style={head.Div}>
        <Cell before={<Icon16InfoOutline />}>{recipes[index].DESCRIPTION}</Cell>
            </Div>
            
            <Group 
                title="Cooking Level"
                style={{margin: "0%",  padding: "0%"}} >
                
                <Cell style={{margin: "0%", padding: "0%"}}
                    before={<Div style={{display: 'flex', marginTop: "0px"}}>Сложность:  &nbsp; {getFires(recipes[index].HARD)}</Div>}
                    asideContent = {<Div style={{display: 'flex', marginTop: "0px"}}><Icon16Recent/>&nbsp; {recipes[index].TIME}
                </Div>}>
                </Cell>
            </Group>
        </Cell>
    );
}

export default BanerPage