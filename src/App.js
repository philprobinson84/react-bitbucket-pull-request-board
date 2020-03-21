import React, { Component } from 'react';
import { Grommet } from 'grommet';
import getEnv from './env'
import getPRData from './dataFuncs/getPRData'
import MainWindow from './components/MainWindow'

const theme = {
    global: {
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
    },
};

class App extends Component {
    constructor(props) {
        super(props);

        this.getReposData = this.getReposData.bind(this);

        this.state = {
            prData: null,
            reposFound: getEnv().bitbucket.repoNameSuggestions,
            reposSelected: getEnv().bitbucket.repoNameSuggestions
        };
    }

    componentDidMount() {
        this.getReposData(this.state.reposSelected);
    }

    getReposData(repoNames) {
        console.log(`Fetching data for repos: ${repoNames}`)
        getPRData(repoNames).then(prData => {
            // console.log(prData)
            this.setState({
                prData: prData,
                reposSelected: repoNames
            });
        }).catch(error => alert(`${error}. API key expired?`))
    }

    render() {
        return (
            <Grommet theme={theme}>
                <MainWindow
                    prData={this.state.prData}
                    reposSelected={this.state.reposSelected}
                    repoNameSuggestions={this.state.reposFound}
                    updateRepoList={this.getReposData}
                />
            </Grommet>
        );
    }
}

export default App;
