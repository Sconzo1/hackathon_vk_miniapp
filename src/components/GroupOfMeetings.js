import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Panel, Group, CardScroll, Card, PanelHeader} from '@vkontakte/vkui';

const GroupOfMeetings = ({meeting_list, go, description}) => {

    return (
        <Panel>
            <Group separator="show">
                <div style={{textAlign: "left", fontSize: 20, marginLeft: 12}}>{description}</div>
                <CardScroll id='party' style={{marginTop: 8}}>
                    <Card size="s" onClick={go} data-to="party">
                        <div style={{ width: 184, height: 120 }}>
                            <img src={meeting_list[0].IMG.babies}/>
                        </div>
                    </Card>
                    <Card size="s" onClick={go} data-to="party">
                        <div style={{ width: 184, height: 120 }}>
                            <img src={meeting_list[1].IMG.one}/>
                        </div>
                    </Card>
                    <Card size="s" onClick={go} data-to="party">
                        <div style={{ width: 184, height: 120 }}>
                            <img src={meeting_list[2].IMG.two}/>
                        </div>
                    </Card>
                    <Card size="s" onClick={go} data-to="party">
                        <div style={{ width: 184, height: 120 }}>
                            <img src={meeting_list[3].IMG.three}/>
                        </div>
                    </Card>
                </CardScroll>
            </Group>
        </Panel>
    )
}

export default GroupOfMeetings;