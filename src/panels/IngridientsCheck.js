import React from 'react';
import { element } from 'prop-types';
import {Panel, Cell, Group, FixedLayout, Div, PanelHeader, List, Button} from '@vkontakte/vkui';

const IngridientsCheck = ({id, go, receptList, setAvailableIngridients}) => {

    let goods = [];
    receptList.forEach(element => {
        for (var key in element.PRODUCTS) {
            goods.push(key);
        }
    });
    goods = [...new Set(goods)];

    let available = [];

    function handleChange(event) {
        if (event.target.checked) {
            available.push(event.target.id)
        } else {
            if (available.indexOf(event.target.id != 1)) {
                available.splice(available.indexOf(event.target.id), 1)
            }
        }
    }

    return(
        <Panel id={id}>

            <PanelHeader>
                Привет!
            </PanelHeader>

            <Group
            style={{paddingBottom: 45}} 
            header={<Div mode="secondary">Ниже приведен список самых часто используемых в наших рецептах ингридентов. Попробуй вспомнить, какие из них имеются у тебя дома!</Div>}>
                <List id='ingridients-list'>
                    {
                    goods.map((good, i) => 
                        <Cell 
                            selectable 
                            onChange={(e) => {
                                handleChange(e)
                            }} 
                            key={i}
                            id={good}
                            >
                            {good}
                            </Cell>
                    )}
                </List>
            </Group>

             
            <FixedLayout vertical="bottom">
                <Button 
                    size="xl" 
                    mode="commerce" 
                    data-to='homePage'
                    onClick={(e) => {
                        setAvailableIngridients(available);
                        go(e)
                    }}                     
                >
                    Перейти к поиску рецепта
                </Button>
            </FixedLayout>
        </Panel>
    )
}

export default IngridientsCheck;