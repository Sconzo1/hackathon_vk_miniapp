import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {Panel, PanelHeader, PanelHeaderButton, FixedLayout, Search, Div, Separator, Tabs, TabsItem, Button} from '@vkontakte/vkui';

import DefaultMeetings from '../components/DefaultMeetings';
import CustomMeetings from '../components/CustomMeetings';

const MeetingList = ({id, go}) => {

    const [activeTab, setActiveTab] = useState('defaultMeetings');

    function changeTab() {
        activeTab === 'defaultMeetings' ? setActiveTab('customMeetings') : setActiveTab('defaultMeetings');
    }

    return (
            <Panel id={id}>
                <PanelHeader left={
                    <PanelHeaderButton 
                        onClick={go} 
                        data-to="home">
                        <Icon28ChevronBack/>
			        </PanelHeaderButton>
                    }>
                    Подборки
                </PanelHeader>
                
                <FixedLayout vertical="top">
                    { (activeTab === 'defaultMeetings') ? <Button size="xl" mode="secondary" style={{marginTop: 10}}>Создать свою подборку</Button> : <Search /> }
                </FixedLayout>

                <Div id='content' style={{ paddingTop: 60, paddingBottom: 60, color: 'gray' }}>
                    { (activeTab === 'defaultMeetings') ? <DefaultMeetings go={go} /> : <CustomMeetings/> }
                </Div>

                <FixedLayout vertical="bottom">
                    <Separator wide />
                    <Tabs>
                        <TabsItem
                            selected={activeTab === 'defaultMeetings'}
                            onClick={tab => {
                                changeTab()
                            }}
                        >Рекомендуемое</TabsItem>
                        <TabsItem
                            selected={activeTab === 'customMeetings'}
                            onClick= {tab => {
                                changeTab()
                            }}
                        >Подборки друзей</TabsItem>
                    </Tabs>
                </FixedLayout>
            </Panel>

    )
};

export default MeetingList;