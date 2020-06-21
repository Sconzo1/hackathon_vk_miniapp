import React from 'react';
import {Cell, List} from '@vkontakte/vkui';

const IngridientsReview = ({id, requiredIngridients, availableIngridient, nextUser}) => {

    return (
        <List id='ingridients-list' >
            {            
                requiredIngridients.map((ingridient, i) => {                    
                if ((availableIngridient.indexOf(ingridient) !== -1) && (nextUser.needIngredients_Array.indexOf(ingridient) !== -1)) {
                    return <Cell key={i} style={{textAlign: 'center', border: 1}}> {`✔\t` +  ingridient + `\t✔`} </Cell>
                } else if (availableIngridient.indexOf(ingridient) !== -1) {
                    return <Cell key={i} style={{textAlign: 'center'}}> {`✔\t` + ingridient + `\t` } </Cell>
                } else if (nextUser.needIngredients_Array.indexOf(ingridient) !== -1) {
                    return <Cell key={i} style={{textAlign: 'center'}}> {`\t`+ingridient + `\t✔`} </Cell>
                } else return <Cell key={i} style={{textAlign: 'center'}}> {ingridient} </Cell>
                })
            }
        </List>
    )
} 

export default IngridientsReview;