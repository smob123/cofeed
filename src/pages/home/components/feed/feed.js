import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import FeedItem from "./feed-item";
import FeedModel from './feed-model';

export default class Feed extends Component {

    feedModel = new FeedModel();
    FILTERS = {
        ALL: 'All',
        FOLLOWING: 'Following',
        NEWEST: 'Newest'
    }

    constructor(props) {
        super(props);

        this.state = {
            feedContent: [],
            selectedFilter: this.FILTERS.ALL
        };
    }

    componentDidMount() {
        this.initializeFeedListener();
    }

    initializeFeedListener() {
        this.feedModel.fetchFeedItems();

        this.feedModel.feedItems.subscribe(newItems => this.setState({ feedContent: newItems }));
    }

    getFeedContent() {
        const feedElements = [];

        for (const feedItem of this.state.feedContent) {
            feedElements.push(
                <Col key={feedItem.id}>
                    <FeedItem feedObject={feedItem} onLikeClick={() => { this.updateFeedLikeStatus(feedItem) }} />
                    <p>{feedItem.datetime}</p>
                </Col>
            );
        }

        return feedElements;
    }

    updateFeedLikeStatus(feedItem) {
        if (feedItem.isLiked) {
            this.feedModel.unsavePost(feedItem.id);
        } else {
            this.feedModel.savePost(feedItem.id);
        }
    }

    getFilters() {
        const elements = [];

        for (const filter of Object.keys(this.FILTERS)) {
            const filterName = this.FILTERS[filter];
            elements.push(
                <div className='mx-2' key={'home_feed_filter_' + filterName}>
                    <p className={`cursor-pointer ${this.state.selectedFilter === filterName ? 'text-primary' : ''}`}
                        onClick={() => { this.filterFeed(filterName) }}>
                        {filterName}
                    </p>
                </div>
            );
        }

        return elements;
    }

    filterFeed(filterName) {
        this.setState({ selectedFilter: filterName });

        switch (filterName) {
            case this.FILTERS.ALL:
                this.feedModel.removeFilters();
                break;
            case this.FILTERS.FOLLOWING:
                this.feedModel.filterFollowing();
                break;
            case this.FILTERS.NEWEST:
                this.feedModel.sortByDateDesc();
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <section>
                <div className="d-flex align-items-center justify-content-between">
                    <h6>Feed</h6>

                    <div className="d-flex">
                        {this.getFilters()}
                    </div>
                </div>

                <Container fluid>
                    <Row xs={1} md={2}>
                        {this.getFeedContent()}
                    </Row>
                </Container>

            </section>
        );
    }
}