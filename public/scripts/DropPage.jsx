class DropPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      error: null,
      crn: ""
    };
  }

  componentDidMount = () => {
    const params = new URLSearchParams(window.location.search);
    console.log(`/registrations?${params}`);
    fetch(`/registrations?${params}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  refreshRegistrations = () => {
    const params = new URLSearchParams(window.location.search);
    fetch(`/registrations?${params}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ results: data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
      });
  }

  onReset = () => {
    this.setState({ crn: "" });
  }

  onSubmit = () => {
    const searchParams = new URLSearchParams(window.location.search);
    let data = {
      studentId: searchParams.get("studentId"),
      termId: searchParams.get("termId"),
      crn: this.state.crn
    };
    
    console.log("1. Sending data:", data);
    
    fetch('/registrations', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(result => {
      this.refreshRegistrations();
    })
    .catch(err => {
      this.setState({ error: err.message });
    });
  }

  onChange = (event) => {
    this.setState({crn: event.target.value})
  }

  render() {
    const { results, loading, error } = this.state;

    const params = new URLSearchParams(window.location.search);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="container"> 
        <button onClick={() => window.location.href = `/registration?${params}`}>Schedule</button>
        <button onClick={() => window.location.href = `/search?term=${params.get("termid")}`}>Back to Search</button>
        <button onClick={() => window.location.href = `/registration/add?${params}`}>Register</button>
        <button onClick={() => window.location.href = '/'}>Home</button>
        <h1>Drop</h1>
        <div className="crn_container">
          <div className="crn_input_container">
            <label htmlFor="crn_input">CRN number(s):</label>
            <input type="number" id="crn_input" value={this.state.crn} onChange={this.onChange}/>
          </div>
          <div>
            <button id="submit_button" onClick={this.onSubmit}>Drop</button>
            <button id="reset_button" onClick={this.onReset}>Reset</button>
          </div>
        </div>
        {results.map((result) => <CourseCard result={result} />)}
      </div>
    );
  }
}

function CourseCard({ result }) {
  const {
    description,
    crn,
    num,
    section,
    termname,
    level,
    credits,
    start,
    end,
    days,
    location,
    termstart,
    termend,
    scheduletype,
    instructor
  } = result;

  return (
    <div className="section_container">
      <div className="section_heading">
        <p>{description} - {crn} - {num} - {section}</p>
      </div>
      <div className="section_body">
        <p>Associated Term: {termname}</p>
        <p>Level: {level}</p>
        <p>{credits}.000 Credits</p>
      </div>
      <div className="section_footer">
        <h3 className="section_time_header">Scheduled Meeting Times</h3>
        <table className="section_times">   
          <thead>
            <tr>
              <th>Time</th>
              <th>Days</th>
              <th>Where</th>
              <th>Data Range</th>
              <th>Schedule Type</th>
              <th>Instructors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{start} - {end}</td>
              <td>{days}</td>
              <td>{location}</td>
              <td>{termstart} - {termend}</td>
              <td>{scheduletype}</td>
              <td>{instructor}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}