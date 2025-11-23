const HOURS_12 = Array.from({ length: 13 }, (_, i) => i.toString().padStart(2, "0"));
const MINUTES = Array.from({ length: 4 }, (_, i) => (i * 15).toString().padStart(2, "0"));
const AM_PM = ["AM", "PM"]; 

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
        let hour24 = this.to24Hour(event.target.value, this.state.selectedStartTimePeriod)
        this.setState({ selectedStartTime:  hour24 +  ":" + this.state.selectedStartTime.substring(3) });
        console.log(hour24 +  ":" + this.state.selectedStartTime.substring(3))
    }

    onStartTimeMinuteChange = (event) => {
        this.setState({ selectedStartTime:  this.state.selectedStartTime.substring(0, 2) + ":" + event.target.value});
        console.log(this.state.selectedStartTime.substring(0, 2) + ":" + event.target.value)
    }
    
    onStartTimePeriodChange = (event) => {
        let startTimeHour = this.state.selectedStartTime.substring(0,2)
        let hour24 = this.to24Hour(startTimeHour, event.target.value)
        this.setState({ selectedStartTime:  hour24 +  ":" + this.state.selectedStartTime.substring(3) });
        this.setState({ selectedStartTimePeriod: event.target.value });
        console.log(hour24 +  ":" + this.state.selectedStartTime.substring(3))
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
                <div>
                    <button type="submit" >Search</button>
                </div>
            </div>

        );
    }
}
