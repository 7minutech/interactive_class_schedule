class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      error: null
    };
  }

  componentDidMount = () => {
    const params = new URLSearchParams(window.location.search);

    console.log(`/registrations?${params}`)

    fetch(`/registrations?${params}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { results, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(this.state.results)

    return (
      <div className="container">
        <h1>Sections Found</h1>
        {results.map((result) => <CourseCard result={result} />)}
        <button onClick={() => window.location.href = '/search'}>Back to Search</button>
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