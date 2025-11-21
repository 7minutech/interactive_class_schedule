class SearchPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            term: null
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const term = params.get("term");
        this.setState({ term });
    }


    render() {

        const { term } = this.state;

        return (
            <div>
                <h1>Term selected {term}</h1>
            </div>
        );
    }
}
