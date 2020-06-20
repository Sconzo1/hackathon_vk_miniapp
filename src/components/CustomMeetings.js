import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Panel, Button, List, Cell, Avatar, FixedLayout, Search, Group} from '@vkontakte/vkui';

const CustomMeetings = () => {

    return (
        <Panel>
            <Group>
                <List>         
                    <Cell
                        before={<Avatar size={72}/>}
                        size="l"
                        description='asdas'
                        asideContent={'500 ₽'}
                        bottomContent={
                            <Button size="l">Взять</Button>
                        }
                    >
                        FFFF FFFFF FFFFFF
                    </Cell>
                </List>
            </Group>
        </Panel>
    )
}

export default CustomMeetings;