import moment from "moment";
import { firestore } from "../../firebase";

const calendar_db = firestore.collection("calendar");

// Action
const LOAD = "schedule/LOAD";
const CREATE = "schedule/CREATE";

export const initialState = {
    today: moment(),
    schedule: [
        {
            date: "2021-03-21",
            title: "밥먹기",
            done: false,
        },
        {
            date: "2021-03-21",
            title: "밥먹기",
            done: false,
        },
    ],
};

// Action Creators
export const loadSchedule = (schedule) => {
    // console.log('여기',schedule);
    return { type: LOAD, schedule };
};
export const createSchedule = (schedule) => {
    // console.log(`test`+schedule)
    return { type: CREATE, schedule };
};

export const loadScheduleFB = () => {
    return function (dispatch) {
        calendar_db.get().then((docs) => {
            let calendar_data = [];
            docs.forEach((doc) => {
                if (doc.exists) {
                    calendar_data = [...calendar_data, { id: doc.id, ...doc.data() }];
                }
            });
            dispatch(loadSchedule(calendar_data));
        });
    };
};

export const addScheduleFB = (schedule) => {
    return function (dispatch) {
        calendar_db.add(schedule).then((docRef) => {
            schedule = { ...schedule, id: docRef.id };
            dispatch(createSchedule(schedule));
        });
    };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "schedule/LOAD": {
            if (action.schedule.length > 0) {
                // console.log('리스트',action.schedule)
                return { list: action.schedule };
            }
            return state;
        }
        case "schedule/CREATE": {
            const new_schedule_list = [...state.list, action.schedule];
            return { list: new_schedule_list };
        }

        default:
            return state;
    }
}
