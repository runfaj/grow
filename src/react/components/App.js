import React, {Component} from "react";

import "./App.less";
import SearchForm from "./SearchForm";
import repAPI from "../apis/whoismyrep";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            results: [],
            selectedResult: -1,
        };
    }

    onSelectRow(i) {
        if(i === this.state.selectedResult) i = -1;
        this.setState({ selectedResult: i });
    }

    onSubmit(searchType, searchState) {
        this.setState(this.getInitialState());

        const errorFn = (response)=>{
            console.log('error', response);
            alert('Something went wrong. See console for details.');
        };

        if(searchType === 'representative')
            repAPI.getRepresentative(
                searchState,
                (response)=>{
                    if(!response.success) errorFn('representative request failed');
                    else this.setState({ results: response.results });
                },
                errorFn);

        else if(searchType === 'senator')
            repAPI.getSenator(
                searchState,
                (response)=>{
                    if(!response.success) errorFn('senator request failed');
                    else this.setState({ results: response.results });
                },
                errorFn);
    }

    render() {
        const selectedResult = this.state.results[this.state.selectedResult] || {};

        return (
            <div className="App">
                <h1>Who Is My Representative?</h1>

                <SearchForm
                    onSubmit={this.onSubmit.bind(this)}
                />

                {/* This might be worth putting into its own component, but negligable for this sample app */}
                {this.state.results.length > 0 &&
                    <div className="results-area">
                        <div className="left-side">
                            <div className="results-list">
                                <div className="results-list-header">
                                    <div className="table-cell">Name</div>
                                    <div className="table-cell">Party</div>
                                </div>
                                {this.state.results.map((result, i)=>(
                                    <div
                                        className={`results-list-row ${this.state.selectedResult === i ? 'selected' : ''}`}
                                        key={`result-${i}`}
                                        onClick={this.onSelectRow.bind(this, i)}
                                    >
                                        <div className="table-cell">{result.name || ''}</div>
                                        <div className="table-cell">{result.party || ''}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="right-side">
                            <div className={`results-details ${this.state.selectedResult !== -1 ? 'visible' : ''}`}>
                                <h3>Details</h3>

                                <div className="detail-row">
                                    <label>Name</label>
                                    <div>{selectedResult.name}</div>
                                </div>

                                <div className="detail-row">
                                    <label>Party</label>
                                    <div>{selectedResult.party}</div>
                                </div>

                                <div className="detail-row">
                                    <label>District</label>
                                    <div>{selectedResult.district}</div>
                                </div>

                                <div className="detail-row">
                                    <label>Phone</label>
                                    <div>{selectedResult.phone}</div>
                                </div>

                                <div className="detail-row">
                                    <label>Office Address</label>
                                    <div>{selectedResult.office}</div>
                                </div>

                                {selectedResult.link &&
                                    <div className="detail-row">
                                        <label>Link</label>
                                        <div><a href={selectedResult.link} target="_blank">{selectedResult.link || ''}</a></div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
