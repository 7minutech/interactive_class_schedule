const HOURS_12 = Array.from({ length: 13 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, "0"));
const AM_PM = ["AM", "PM"]; 
const DAYS  = {
    "MON": "M",
    "TUE": "T",
    "WED": "W",
    "THU": "R",
    "FRI": "F"
}

class SearchPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: null,
            scheduleTypes: null,
            courseLevels: null,
            loading: true,
            term: null,
            selectedSubject: '',
            selectedScheduleType: '',
            selectedCourseLevel: '',
            selectedCourseNumber: '',
            selectedStartTime: '00:00',
            selectedStartTimePeriod: 'AM',
            selectedEndTime: '00:00',
            selectedEndTimePeriod: 'AM',
            selectedDays: [
                {name: "MON", checked: false},
                {name: "TUE", checked: false},
                {name: "WED", checked: false},
                {name: "THU", checked: false},
                {name: "FRI", checked: false}
            ],
            
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const term = params.get("term");
        this.setState({term: term})
        this.fetchAll()
    }

    to24Hour(hour, period) {
        let parsedHour = parseInt(hour)

        if (parsedHour > 12) {
            parsedHour -= 12
        }

        if (period == "PM" && this.state.selectedStartTimePeriod == "AM" && hour == "00") {
            return "12"
        }

        if (hour == "00") {
            return hour
        }

        if (parsedHour === 12) {    
            if (period == "AM") {
                return "00"
            }
            return hour
        } else {
            if (period == "AM") {
                return parsedHour.toString().padStart(2, "0")
            }
            return (parsedHour + 12).toString()

        }
        
    }
    
    daysToString(days) {
        let dayString = ""
        let checkedDays = days.filter((day) => (day.checked))
        checkedDays.forEach((day) => {
            dayString += DAYS[day.name]
        })
        return dayString
    } 

    timeToString(time) {
        let hour = time.substring(0,2)
        if (hour == "00") {
            return null
        }
        return time
    }

    fetchAll = () => {
        Promise.all([
            fetch("/subjects").then((res) => res.json()),
            fetch("/scheduleTypes").then((res) => res.json()),
            fetch("/levels").then((res) => res.json()),
        ])
        .then(([subjectData, scheduleTypeData, courseLevelData]) => {
            this.setState({
                subjects: subjectData,
                scheduleTypes: scheduleTypeData,
                courseLevels: courseLevelData,
                loading: false
            });
        })
        .catch((err) => {
             console.error(err);
            this.setState({ loading: false });
        })
    }

    onSubjectChange = (event) => {
        this.setState({ selectedSubject: event.target.value });
    };

    onScheduleTypeChange = (event) => {
        this.setState({ selectedScheduleType: event.target.value });
    };

    onCourseLevelChange = (event) => {
        this.setState({ selectedCourseLevel: event.target.value });
    };

    onCourseNumberChange = (event) => {
        this.setState({ selectedCourseNumber: event.target.value });
    };

    onStartTimeHourChange = (event) => {
        const hour24 = this.to24Hour(event.target.value, this.state.selectedStartTimePeriod);
        const newTime = hour24 + ":" + this.state.selectedStartTime.substring(3);
        console.log(`[Start Hour Change] New hour24: ${hour24}, newTime: ${newTime}`);
        this.setState({ selectedStartTime: newTime });
    };

    onStartTimeMinuteChange = (event) => {
        const newTime = this.state.selectedStartTime.substring(0, 2) + ":" + event.target.value;
        console.log(`[Start Minute Change] New minute: ${event.target.value}, newTime: ${newTime}`);
        this.setState({ selectedStartTime: newTime });
    };

    onStartTimePeriodChange = (event) => {
        const startTimeHour = this.state.selectedStartTime.substring(0, 2);
        const hour24 = this.to24Hour(startTimeHour, event.target.value);
        const newTime = hour24 + ":" + this.state.selectedStartTime.substring(3);
        console.log(`[Start Period Change] New period: ${event.target.value}, hour24: ${hour24}, newTime: ${newTime}`);
        this.setState({ 
            selectedStartTime: newTime,
            selectedStartTimePeriod: event.target.value
        });
    };

    onEndTimeHourChange = (event) => {
        const hour24 = this.to24Hour(event.target.value, this.state.selectedEndTimePeriod);
        const newTime = hour24 + ":" + this.state.selectedEndTime.substring(3);
        console.log(`[End Hour Change] New hour24: ${hour24}, newTime: ${newTime}`);
        this.setState({ selectedEndTime: newTime });
    };

    onEndTimeMinuteChange = (event) => {
        const newTime = this.state.selectedEndTime.substring(0, 2) + ":" + event.target.value;
        console.log(`[End Minute Change] New minute: ${event.target.value}, newTime: ${newTime}`);
        this.setState({ selectedEndTime: newTime });
    };

    onEndTimePeriodChange = (event) => {
        const endTimeHour = this.state.selectedEndTime.substring(0, 2);
        const hour24 = this.to24Hour(endTimeHour, event.target.value);
        const newTime = hour24 + ":" + this.state.selectedEndTime.substring(3);
        console.log(`[End Period Change] New period: ${event.target.value}, hour24: ${hour24}, newTime: ${newTime}`);
        this.setState({ 
            selectedEndTime: newTime,
            selectedEndTimePeriod: event.target.value
        });
    };

    onDayChange = (event, name) => {
        const isChecked = event.target.checked
        this.setState((prevState) => ({
            selectedDays: prevState.selectedDays.map((day) => {
                if (day.name == name) {
                    return {...day, checked: isChecked}
                }
                return day
            })
        }))
    }

    onSearch = () => {



        const {
            term,
            selectedSubject, 
            selectedScheduleType, 
            selectedCourseLevel, 
            selectedCourseNumber,
            selectedStartTime,
            selectedEndTime,
            selectedDays,
        } = this.state


        const searchParams = [
            "termId=" + (term || ""),    
            "subject=" + (selectedSubject || ""),    
            "courseNumber=" + (selectedCourseNumber || ""),  
            "scheduleType=" + (selectedScheduleType || ""),  
            "courseLevel=" + (selectedCourseLevel || ""),   
            "start=" + (this.timeToString(selectedStartTime) || ""),    
            "end=" + (this.timeToString(selectedEndTime) || ""),     
            "days=" + (selectedDays ? this.daysToString(selectedDays) : "")
        ];


        let params = searchParams.join("&")

        console.log(params)

        fetch('/results?' + params)
        .then((res) => {
            console.log('Response status:', res.status);
            return res.json();
        })
        .then((data) => {
            console.log('Fetched data:', data);
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        });


    } 


    render() {

        const {
            selectedSubject, subjects, loading,
            selectedScheduleType, scheduleTypes, 
            selectedCourseLevel, courseLevels,
            selectedCourseNumber
        } = this.state

        if (loading) {
        return (
            <select disabled>
            <option>Loading Subjects...</option>
            </select>
        );
        }

        return (
            <div className="container">
                <div className="input_container">
                    <label>Subject: </label>
                    <select value={selectedSubject} onChange={this.onSubjectChange} size={5}>
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((subject) => (
                            <option value={subject.id}>
                            {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input_container">
                    <label htmlFor="courseNumber">Course Number: </label>
                    <input id="couresNumber" type="number" value={selectedCourseNumber} onChange={this.onCourseNumberChange} />
                </div>
                <div className="input_container">
                    <label>Schedule Type: </label>
                    <select value={selectedScheduleType} onChange={this.onScheduleTypeChange} size={5}>
                        <option value="" disabled>Select a schedule type</option>
                        {scheduleTypes.map((ScheduleType) => (
                            <option value={ScheduleType.id}>
                            {ScheduleType.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input_container">
                    <label>Course Level: </label>
                    <select value={selectedCourseLevel} onChange={this.onCourseLevelChange} size={3}>
                        <option value="" disabled>Select a course level</option>
                        {courseLevels.map((level) => (
                            <option value={level.id}>
                            {level.description}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="input_container">
                    <label htmlFor="start_time_hour">Start Time Hour:</label>
                    <select name="start_time_hour" id="start_time_hour" onChange={this.onStartTimeHourChange}>
                        {
                            HOURS_12.map((hour) => (<option value={hour}>{hour}</option>))
                        }
                    </select>
                    <label htmlFor="start_time_minute">Minute:</label>
                    <select name="start_time_minute" id="start_time_minute" onChange={this.onStartTimeMinuteChange}>
                        {
                            MINUTES.map((minute) => (<option value={minute}>{minute}</option>))
                        }
                    </select>
                    <label htmlFor="start_time_AM/PM">AM/PM:</label>
                    <select name="start_time_AM/PM" id="start_time_AM/PM" onChange={this.onStartTimePeriodChange} >
                        {
                            AM_PM.map((period) => (<option value={period}>{period}</option>))
                        }
                    </select>
                </div>
                <div className="input_container">
                    <label htmlFor="end_time_hour">End Time Hour:</label>
                    <select name="end_time_hour" id="end_time_hour" onChange={this.onEndTimeHourChange}>
                        {
                            HOURS_12.map((hour) => (<option value={hour}>{hour}</option>))
                        }
                    </select>
                    <label htmlFor="end_time_minute">Minute:</label>
                    <select name="end_time_minute" id="end_time_minute" onChange={this.onEndTimeMinuteChange}>
                        {
                            MINUTES.map((minute) => (<option value={minute}>{minute}</option>))
                        }
                    </select>
                    <label htmlFor="end_time_AM/PM">AM/PM:</label>
                    <select name="end_time_AM/PM" id="end_time_AM/PM" onChange={this.onEndTimePeriodChange} >
                        {
                            AM_PM.map((period) => (<option value={period}>{period}</option>))
                        }
                    </select>
                </div>
                <div className="input_container">
                        {
                            this.state.selectedDays.map((day) => (
                                <label htmlFor="">{day.name}
                                    <input type="checkbox" checked={day.checked} onChange={(event) => this.onDayChange(event, day.name)} />
                                </label>
                            ))
                        }
                </div>
                <div>
                    <button type="submit" onClick={this.onSearch}>Search</button>
                </div>
            </div>

        );
    }
}
