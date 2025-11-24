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

    onSubmit = (event) => {
    
    const { selectedTerm } = this.state;
    if (selectedTerm) {
        window.location.href = `/search?term=${selectedTerm}`;
    }
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
                <select value={selectedTerm} onChange={this.onChange}>
                <option value="" disabled>
                    Select a term
                </option>
                {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                    {term.name}
                    </option>
                ))}
                </select>
                <button type="submit" onClick={this.onSubmit}>Go</button>
            </div>

        );
    }
}
