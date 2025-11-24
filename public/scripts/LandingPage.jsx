class LandingPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            terms: [],
            loading: true,
            selectedTerm: '',
        }
    }

    componentDidMount = () => {
        this.fetchTerms()
    }
        
    fetchTerms = () => {
        fetch('/terms')
        .then((res) => {
            console.log('Response status:', res.status);
            return res.json();
        })
        .then((data) => {
            console.log('Fetched data:', data);
            this.setState({ terms: data, loading: false });
        })
        .catch((err) => {
            console.error('Fetch error:', err);
            this.setState({ loading: false });
        });
    };

    onChange = (event) => {
        this.setState({ selectedTerm: event.target.value });
    };

    onView = () => {
        const { selectedTerm } = this.state;

        if (!selectedTerm) {
            alert("must select a term first");
            return
        }

        const studentId = 1;
    

        window.location.href = `/registration?termId=${selectedTerm}&studentId=${studentId}`;
    };

    onSearch = (event) => {
        const { selectedTerm } = this.state;

         if (!selectedTerm) {
            alert("must select a term first");
            return
        }
    
        window.location.href = `/search?term=${selectedTerm}`;
    };

    render() {
        const { terms, loading, selectedTerm } = this.state;

        if (loading) {
        return (
            <select disabled>
            <option>Loading...</option>
            </select>
        );
        }

        return (
            <div>
                <h1>Interactive Class Schedule</h1>
                <select value={selectedTerm} onChange={this.onChange} id="terms">
                <option value="" disabled>
                    Select a term
                </option>
                {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                    {term.name}
                    </option>
                ))}
                </select>
                <button type="submit" onClick={this.onSearch} id="search_button">Search</button>
                <button type="submit" onClick={this.onView} id="view_schedule_button">View Schedule Page</button>
            </div>

        );
    }
}
