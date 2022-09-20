import React, { Component } from "react";
import Stories from "./components/stories/stories";
import Feed from './components/feed/feed';
import Suggestions from "./components/suggestions/suggestions";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Stories />

                <hr className="text-muted" />

                <div className="my-2">
                    <Feed />
                </div>

                <div className="my-2 d-lg-none">
                    <Suggestions />
                </div>
            </div>
        );
    }
}