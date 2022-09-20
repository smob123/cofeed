import React, { Component } from 'react';
import CircularAvatar from '../../../../components/circular-avatar/circular-avatar';
import SuggestionsModel from './suggestions-model';

export default class Suggestions extends Component {

    suggestionsModel = new SuggestionsModel();

    constructor(props) {
        super(props);
        this.state = {
            suggestedUsers: []
        };
    }

    componentDidMount() {
        this.suggestionsModel.suggestions.subscribe(newValue => this.setState({ suggestedUsers: newValue }));
        this.suggestionsModel.fetchSuggestions();
    }

    getSuggestions() {
        const elements = [];

        for (const suggestion of this.state.suggestedUsers) {
            const isUserFollowed = this.suggestionsModel.isUserFollowed(suggestion.id);
            const buttonText = isUserFollowed ? 'Followed' : 'Follow';
            const buttonStyle = isUserFollowed ? 'btn-secondary' : 'btn-primary';

            elements.push(
                <div key={'suggested_user_' + suggestion.id} className='w-100 d-flex align-items-center justify-content-around my-3'>
                    <div className='d-flex align-items-center'>
                        <CircularAvatar size={50} imageSrc={suggestion.avatar} />

                        <p className='mx-1'>
                            {suggestion.username}
                        </p>
                    </div>

                    <div>
                        <button className={`btn ${buttonStyle}`} onClick={() => this.updateFollowStatus(suggestion.id, isUserFollowed)}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            );
        }

        return elements;
    }

    updateFollowStatus(userId, isFollowed) {
        if (isFollowed) {
            this.suggestionsModel.unfollow(userId);
        } else {
            this.suggestionsModel.follow(userId);
        }
    }

    render() {
        return (
            <div>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <p>
                        <strong>
                            Suggestions For You
                        </strong>
                    </p>

                    <p className='text-primary cursor-pointer'>
                        See All
                    </p>
                </div>

                <div className='mt-2'>
                    {this.getSuggestions()}
                </div>
            </div>
        );
    }
}