import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch, withRouter } from "react-router";
import moment from "moment";
import styled from "styled-components";
import "./style/Calendar.css"; //부모과 자식이 같은 css 이용할 때에는 부모에만 import
import Header from "./Header";
import Calendar from "./Calendar";
import InputForm from "./InputForm";
import Button from "./Button";
import FullCalendar, { disableCursor } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { firestore } from "./firebase";
import { loadScheduleFB, addScheduleFB } from "./redux/modules/schedule";
import { parseJSON } from "date-fns";

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateToProps = (state) => ({
    schedule_list: state.schedule,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => {
    return {
        load: () => {
            dispatch(loadScheduleFB());
        },
        create: (new_item) => {
            dispatch(addScheduleFB(new_item));
            console.log(new_item);
        },
    };
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.load();
    }
    render() {
        return (
            <div>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => (
                            <div>
                                <Button history={this.props.history} />
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView="dayGridMonth"
                                    weekends={true}
                                    events={this.props.schedule_list.list}
                                />
                            </div>
                        )}
                    />
                    <Route path="/input" component={InputForm} />
                </Switch>
            </div>
        );
    }
}

const CalendarLayout = styled.div`
    width: 80%;
    height: 100vw;
    margin: 0 auto;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
