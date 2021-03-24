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
import { CardActions, TextField } from '@material-ui/core';
import './style/Calendar.css'
import {connect} from 'react-redux';




const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      width: '225px',
      margin: '8px 0',
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
    const [lists, setList] = useState();
    const showRef = () => {
      let list = [];
      const new_item = textRef.current.value;
      const new_date = selectedDate;
      setList({lists: [...list, new_date, new_item]});    
    };
    console.log(lists)


  return (
    <body className="input-body">
    <div className="input-style">

        <form className={classes.root} noValidate autoComplete="off">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Block>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="날짜를 선택해 주세요"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Block>
        <Block>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="시간을 선택해 주세요"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </Block>
    </MuiPickersUtilsProvider>
            <TextField id="standard-basic" label="일정" inputRef={textRef}/>
        </form>
        <button className='list-btn' onClick={showRef} >
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

const Block= styled.div`
    display:block
`;

export default withRouter(BasicTextFields);