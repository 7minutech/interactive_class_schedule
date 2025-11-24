class ResultPage extends React.Component {
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
    
    fetch(`/results?${params}`)
      .then(res => res.json())
      .then(data => this.setState({ results: data, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  render() {
    const { results, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="container">
        <h1>Sections Found</h1>
        <div className="button_container">
          <button onClick={() => window.location.href = `/`}>Home</button>
          <button onClick={() => window.location.href = '/search'}>Back to Search</button>
          <button onClick={() => window.location.href = `/registration?${params}`}>Schedule</button>
        </div>
        {results.map((result) => <CourseCard result={result} />)}
        <div className="button_container">
          <button onClick={() => window.location.href = `/`}>Home</button>
          <button onClick={() => window.location.href = '/search'}>Back to Search</button>
          <button onClick={() => window.location.href = `/registration?${params}`}>Schedule</button>
        </div>
      </div>
    );
  }
}