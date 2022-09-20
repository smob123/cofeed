import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import { connect } from 'react-redux';
import { set } from '../../../../globals/auth/current-user-reducer';

import CircularAvatar from "../../../../components/circular-avatar/circular-avatar";

import StoriesModel from "./stories-model";
import User from '../../../../globals/objects/user';

SwiperCore.use([Navigation, Pagination]);

class Stories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stories: []
        };
    }

    componentDidMount() {
        this.initStoriesListener();
    }

    initStoriesListener() {
        const model = new StoriesModel();

        model.stories.subscribe(fetchedStories => this.setState({ stories: fetchedStories }));

        model.fetchStories();
    }

    getStoryElements() {
        const storyElements = [];

        // check if the current user's data was fetched
        if (this.props.currentUser.value) {
            // parse the data
            const currentUser = User.fromJson(this.props.currentUser.value);
            // add te current user's avatar and name to the beginning of the stories list
            storyElements.push(
                <SwiperSlide key={currentUser.id}>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <div className='position-relative overflow-hidden rounded-circle'>
                            <CircularAvatar size={70} imageSrc={currentUser.avatar} />
                            <div className='position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-50'></div>
                            <h1 className='position-absolute text-light top-50 start-50 translate-middle'>
                                +
                            </h1>
                        </div>

                        <p className="text-truncate">
                            You
                        </p>
                    </div>
                </SwiperSlide>
            );
        }

        for (const story of this.state.stories) {
            // decide the border color based on whether the story was seen or not
            const borderClass = story.isSeen ? 'border' : 'border-primary';

            storyElements.push(
                <SwiperSlide key={`user_story_${story.user.id}`}>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <CircularAvatar size={70} imageSrc={story.user.avatar} className={borderClass} />

                        <p className="text-truncate">
                            {story.user.username}
                        </p>
                    </div>
                </SwiperSlide>
            );
        }

        return storyElements;
    }

    render() {
        return (
            <Swiper
                className='mw-100'
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true, type: 'bullets' }}
                watchOverflow={true}
                breakpoints={{
                    300: {
                        slidesPerView: 2
                    },
                    500: {
                        slidesPerView: 3
                    },
                    780: {
                        slidesPerView: 4
                    },
                    1050: {
                        slidesPerView: 6
                    }
                }}>

                {this.getStoryElements()}

                <div className='pagination mt-3'></div>
            </Swiper>
        );
    }
}

const mapToState = state => ({
    currentUser: state.currentUser
});

export default connect(mapToState, { set })(Stories);