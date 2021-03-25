import React, {Component, useRef, useState} from 'react';
import {withRouter} from  "react-router";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import './style/Calendar.css'
import TextField from '@material-ui/core/TextField';
import store from './redux/configStore';
// 리덕스 스토어와 연결하기 위해 connect라는 친구를 호출할게요!
import {connect, useDispatch} from 'react-redux';
// 리덕스 모듈에서 (bucket 모듈에서) 액션 생성 함수 두개를 가져올게요!
import {loadSchedule, createSchedule, loadScheduleFB, addScheduleFB} from './redux/modules/schedule';
import { firestore } from './firebase';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '225px',
      margin: '8px 0',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  
}));


const BasicTextFields = (props) =>  {
    const classes = useStyles();
    const textRef = useRef();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const dispatch = useDispatch();
    const addPlan = () => {
      const new_date = dateTime;
      if (new_date === "" ){
        window.alert('날짜를 선택해 주세요');
      } else if(textRef.current.value ==="" ){
        window.alert('일정을 입력해 주세요');
      } else{
      const schedule = {'title':textRef.current.value, 'date':new_date, 'done':false};
      dispatch(createSchedule(schedule));
      {props.history.goBack('/')}
      }

    };
    
  
    let dateTime='';

  return (
    <body className="input-body">
    <div className="input-style">

        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="date"
          label="날짜를 선택해 주세요"
          type="date"
          defaultValue="2021-03-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event)=>{
            dateTime = event.target.value
          }}
        />
        <TextField id="standard-basic" label="일정" inputRef={textRef}/>
        </form>
        <button className='list-btn' onClick={addPlan} >
                    일정 추가하기
                </button>
                <button className='list-cancle-btn' 
                onClick={() => {props.history.goBack();}}>
                    취소
                </button>
    </div>
    </body>
    
  );
  
}


const InputForm = (props) => {

    return  (
        <body className="input-body">
            <div className="input-style">
                <BasicTextFields/>
            </div>
        </body>
            );

}


export default withRouter(BasicTextFields);