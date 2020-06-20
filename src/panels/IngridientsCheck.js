import React, {useState} from 'react';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {Panel, Cell, Group, FixedLayout, Div, PanelHeaderButton, PanelHeader, List, Button} from '@vkontakte/vkui';

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
            <Div> 
            <Group
            //style={{paddingBottom: 45}} 
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
                        data-to='home'
                        onClick={(e) => {
                            setAvailableIngridients(available);
                            go(e)
                        }}                     
                    >
                        Перейти к поиску рецепта
                    </Button>
                </FixedLayout>
            </Div>  
        </Panel>
    )
}

export default IngridientsCheck;