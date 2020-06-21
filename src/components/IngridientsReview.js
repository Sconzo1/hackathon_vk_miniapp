import React, {useState, Fragment} from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {Group, Cell, List} from '@vkontakte/vkui';

const IngridientsReview = ({id, requiredIngridients, availableIngridient}) => {

    return (
        <List id='ingridients-list' >
            {                
                requiredIngridients.map((ingridient, i) => {                    
                if (availableIngridient.indexOf(ingridient) != -1) {
                    return <Cell key={i} style={{textAlign: 'center', border: 1}}> {ingridient} </Cell>
                } else return <Cell key={i} style={{textAlign: 'center'}}> {ingridient} </Cell>
            })}
        </List>
    )
}

export default IngridientsReview;