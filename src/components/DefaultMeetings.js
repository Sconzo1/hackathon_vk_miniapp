import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Panel, Group, CardScroll, Card} from '@vkontakte/vkui';

import GroupOfMeetings from './GroupOfMeetings';
import babies from '../img/BABIES.jpg';
import one from '../img/1.jpg';
import two from '../img/2.jpg';
import three from '../img/3.jpg';

const DEFAULT_MEETINGS_PARTY = [
    {
        ID: 1,
        DESCRIPTION: 'Праздник у подруги',
        IMG: {babies},
    },
    {
        ID: 2,
        DESCRIPTION: "Футбол с друзьями",
        IMG: {one},
    },
    {
        ID: 3,
        DESCRIPTION: "Пьянка",
        IMG: {two},
    },    
    {
        ID: 4,
        DESCRIPTION: "ЗОЖ вечеринка",
        IMG: {three},
    }
]
const DEFAULT_MEETINGS_DATE = {

}
const DEFAULT_MEETINGS_DINNER = {

}


const DefaultMeetings = ({go}) => {

    return (
        <Panel>
            <GroupOfMeetings meeting_list={DEFAULT_MEETINGS_PARTY} go={go} description='На вечеринку!'/>
            <GroupOfMeetings meeting_list={DEFAULT_MEETINGS_PARTY} go={go} description='Праздничный ужин'/>
            <GroupOfMeetings meeting_list={DEFAULT_MEETINGS_PARTY} go={go} description='На природу'/>
        </Panel>
    )
}

export default DefaultMeetings;