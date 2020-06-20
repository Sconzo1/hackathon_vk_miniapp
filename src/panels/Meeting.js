import React from 'react';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';

import head from './head'


function Meeting(props){
    return(
        <Div>
    {props.fetchedUser &&
                   
        <Div style={head.Div} size="xl">
            <Cell 
            before={<Avatar src={props.picture}/>}
            description={`${props.num} участников`}
            asideContent={
                        <div>
                            <p style={head.p}>{props.date}</p>
                            <p style={{lineHeight: "25px",
                                        fontSize: "22px",
                                        margin: "0%",
                                        padding: "0%",
                                        fontWeight: "bold",
                                        fontFamily: "Tahoma",
                                        color: "#000000"}}>{props.time}</p>
                        </div>}
            bottom={
                <UsersStack
                    photos={[
                        //getAvatarUrl('user_ox'),
                        //fetchedUser.photo_200,
                    ]}
                    size="m"
                >Настя и Jean пойдут на это мероприятие</UsersStack>
            }
            
        ><p style={head.p}>{props.title}</p>	
            </Cell>
                
        </Div>
            
        
    }</Div>)
}

export default Meeting