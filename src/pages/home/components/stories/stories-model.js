/**
 * fetches, and stores available stories
 */
import { BehaviorSubject } from 'rxjs';

import StoryObject from './story-object.js';
import StoriesData from './stories-data.js';

export default class StoriesModel {
    // list of stories
    stories = new BehaviorSubject([]);

    fetchStories() {
        // imitate an api call by waiting for 3 seconds before sending the data back
        setTimeout(() => {
            const storyObjects = [];

            for (const story of StoriesData) {
                storyObjects.push(
                    new StoryObject(story.user, story.isSeen)
                );
            }

            this.stories.next(storyObjects);
        }, 3000);
    }
}