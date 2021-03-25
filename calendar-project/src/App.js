import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch, withRouter} from  "react-router";
import moment from 'moment';
import styled from 'styled-components';
import './style/Calendar.css';  //부모과 자식이 같은 css 이용할 때에는 부모에만 import
import Header from "./Header";
import Calendar from './Calendar';
import InputForm from './InputForm';
import Button from './Button';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {useDispatch, useSelector} from 'react-redux';
import {connect} from 'react-redux';
import { firestore } from './firebase';
import {loadSchedule, createSchedule, loadScheduleFB} from './redux/modules/schedule';

const ScheduleList = (props) => {
    // 버킷리스트를 리덕스 훅으로 가져오기
    const schedule_list = useSelector((state) => state.schedule.schedule);
    console.log(schedule_list);

    return(
        <div>
     <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={true}
        events= {schedule_list}
        />
        </div>   
    )
};

class App extends Component {
    constructor(props){
        super(props);
    
        
    }
    componentDidMount(){
            const plan = firestore.collection("calendar");
            console.log(plan)
        }
    render() {
        return (
            <div>
                
                    <Switch>
                        <Route path="/" 
                            exact render={(props) => (
                            <div >
                                <Button history={this.props.history}/>
                                <ScheduleList/>
                            </div>
                            )} />
                        <Route path="/input" 
                            component={InputForm}
                            /> 
                    </Switch>
            </div>
        )
    }
}

const CalendarLayout = styled.div`
    width:80%;
    height:100vw;
    margin:0 auto;
`;

const Container = styled.div`
    width: 400px;
    justify-items: stretch; 
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: #3f51b5;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  background-color: aliceblue;
`;


export default withRouter(App);