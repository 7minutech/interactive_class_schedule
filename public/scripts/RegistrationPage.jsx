class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
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

    const params = new URLSearchParams(window.location.search);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(this.state.results)

    return (
      <div className="container">
        <h1>Schedule</h1>
        {results.map((result) => <CourseCard result={result} />)}
        <button onClick={() => window.location.href = `/search?term=${params.get("termId")}`}>Back to Search</button>
        <button onClick={() => window.location.href = `/registration/add?${params}`}>Register</button>
        <button onClick={() => window.location.href = `/registration/drop?${params}`}>Drop</button>
        <button onClick={() => window.location.href = '/'}>Home</button>
      </div>
    );
  }
}