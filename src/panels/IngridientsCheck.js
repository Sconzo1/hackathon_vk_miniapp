import React, {useState} from 'react';
import {Panel, Cell, Group, FixedLayout, Div, PanelHeader, List, Button} from '@vkontakte/vkui';

const IngridientsCheck = ({id, go, receptList, availableIngridients, setAvailableIngridients}) => {

    let goods = [];
    receptList.forEach(element => {
        for (var key in element.PRODUCTS) {
            goods.push(key);
        }
    });
    goods = [...new Set(goods)];

    let [available, setAvailable] = useState(availableIngridients);

    function handleChange(event) {
        if (event.target.checked) {
            setAvailable(prevState => [...prevState, event.target.id]);
        } else {
            if (available.indexOf(event.target.id !== 1)) {
                setAvailable(prevState => prevState.filter(t => (t !== event.target.id)))
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
            header={<Div mode="secondary">Ниже приведен список самых часто используемых в наших рецептах ингредиентов. Попробуй вспомнить, какие из них имеются у тебя дома!</Div>}>
                <List id='ingridients-list'>
                    {
                    goods.map((good, i) => 
                        <Cell
                            checked={available.includes(good) ? true : false}
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
                        console.log(available);
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