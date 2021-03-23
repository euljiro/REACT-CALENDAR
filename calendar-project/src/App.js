import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Switch, withRouter} from  "react-router";
import moment from 'moment';
import styled from 'styled-components';
import './style/Calendar.css';  //부모과 자식이 같은 css 이용할 때에는 부모에만 import
import Header from "./Header";
import Calendar from './Calendar';
import Schedule from './Schedule';
import InputForm from './InputForm';
import Button from './Button';



class App extends Component {
    constructor(props){
        super(props);
   
        this.state = {
            calendarYM: moment(),
            today: moment(),
            }
    
        }
        moveMonth = (month) => {
            this.setState({
                calendarYM: this.state.calendarYM.add(month,'M')
            })
        }
        

    render() {
        return (
            <div>
                
                    <Switch>
                        <Route path="/" 
                            exact render={(props) => (
                            <div className="layout">
                            <CalendarContainer>
                                <Header 
                                    calendarYM={this.state.calendarYM.format("YYYY년 MM월")}
                                    today={this.state.today.format("오늘은 YYYY/MM/DD")}
                                    moveMonth={this.moveMonth}
                                />
                                <Calendar YM={this.state.calendarYM.format("YYYY-MM-DD")}/>
                            </CalendarContainer>
                            <Container>
                                <Title>일정</Title>
                                <Line/>
                                <Schedule /> 
                            </Container>
                            <Button history={this.props.history}/>
                            </div>)} />
                        <Route path="/input" component={InputForm} /> 
                    </Switch>
            </div>
        )
    }
}


const CalendarContainer =styled.div`
max-width: 800px;
flex-grow: 1;
justify-items: stretch;
padding: 16px;
margin: 20px auto;
border-radius: 5px;
border: 1px solid #ddd;
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

export default withRouter(App);