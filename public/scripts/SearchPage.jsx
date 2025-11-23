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
            selectedCourseNumber: ''
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const term = params.get("term");
        this.setState({term: term})
        this.fetchAll()
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
                <div>
                    <button type="submit" >Search</button>
                </div>
            </div>

        );
    }
}
