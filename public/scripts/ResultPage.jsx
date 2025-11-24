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
        {results.map((result) => <CourseCard result={result} />)}
        <button onClick={() => window.location.href = '/search'}>Back to Search</button>
      </div>
    );
  }
}