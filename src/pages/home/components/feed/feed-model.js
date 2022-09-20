/**
 * fetches, stores, and manipulates feed data
 */
import { BehaviorSubject } from 'rxjs';

import FeedObject from './feed-object';
import FeedData from './feed-data';
import { LOCAL_STORAGE_KEYS } from '../../../../globals/constants/constants';

export default class FeedModel {
    // unmodified list of all feed items
    allFeedItems = [];

    // list of feed items, which can be manipulated using filters, and is used to display posts in the UI
    feedItems = new BehaviorSubject([]);

    /**
     * fetches feed items from the backend
     */
    fetchFeedItems() {
        setTimeout(() => {
            // reset feed items just in case, so that they would be repopulated
            this.allFeedItems = [];

            // get all the saved posts
            const parsedSavedPostIds = this.getSavedPosts();

            for (const feedItem of FeedData) {
                // check if the post has been liked by the user
                const isPostSaved = parsedSavedPostIds.includes(feedItem.id);
                let numOfLikes = feedItem.numOfLikes;

                // incremeant the number of the post's likes if the user has liked it before
                if (isPostSaved) {
                    numOfLikes++;
                }

                // add a new feed item
                this.allFeedItems.push(
                    new FeedObject(
                        feedItem.id,
                        feedItem.imageSrc,
                        feedItem.user,
                        numOfLikes,
                        feedItem.numOfComments,
                        isPostSaved,
                        feedItem.date
                    )
                );
            }

            // update the subject, so that the UI can update as well
            this.feedItems.next(this.allFeedItems);
        }, 3000);
    }

    /**
     * removes a post from local storage
     */
    unsavePost(postId) {
        // check if the user has any saved posts, and bail early if the don't
        let parsedSavedPostIds = this.getSavedPosts();

        if (!parsedSavedPostIds.includes(postId)) {
            return;
        }

        // fitler out the post by its ID, and update local storage
        parsedSavedPostIds = parsedSavedPostIds.filter(id => id !== postId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.LIKED_POSTS, JSON.stringify(parsedSavedPostIds));

        // update the post's like status, and number of likes in the subject
        const currentFeedItems = this.feedItems.value;
        const feedItem = currentFeedItems.find(value => value.id === postId);
        feedItem.isLiked = false;
        feedItem.numOfLikes--;

        // update the subject to notify the UI with the changes
        const feedItemIndex = currentFeedItems.indexOf(feedItem);
        currentFeedItems[feedItemIndex] = feedItem;
        this.feedItems.next(currentFeedItems);
    }

    /**
     * saves a post in local storage
     */
    savePost(postId) {
        // check if the post has been saved before, and bail early if it that's the case
        const parsedSavedPostIds = this.getSavedPosts();

        if (parsedSavedPostIds.includes(postId)) {
            return;
        }

        // update the list and save it in local storage
        parsedSavedPostIds.push(postId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.LIKED_POSTS, JSON.stringify(parsedSavedPostIds));

        // update the post's like status, and number of likes
        const currentFeedItems = this.feedItems.value;
        const feedItem = currentFeedItems.find(value => value.id === postId);
        feedItem.isLiked = true;
        feedItem.numOfLikes++;

        // update the subject to notify the UI with the changes
        const feedItemIndex = currentFeedItems.indexOf(feedItem);
        currentFeedItems[feedItemIndex] = feedItem;
        this.feedItems.next(currentFeedItems);
    }

    /**
     * returns the posts that were saved in local storage
     */
    getSavedPosts() {
        const savedLikedPostIds = localStorage.getItem(LOCAL_STORAGE_KEYS.LIKED_POSTS);

        if (!savedLikedPostIds) {
            return [];
        }

        return JSON.parse(savedLikedPostIds);
    }

    /**
     * removes all the filters applied to the subject
     */
    removeFilters() {
        this.feedItems.next(this.allFeedItems);
    }

    /**
     * filters out any posts that were made by people who are not followed
     */
    filterFollowing() {
        const followedUsers = localStorage.getItem(LOCAL_STORAGE_KEYS.FOLLOWED_USERS);

        if (!followedUsers) {
            this.feedItems.next([]);
            return;
        }

        const parsedFollowedUsers = JSON.parse(followedUsers);
        const filteredList = this.allFeedItems.filter(item => parsedFollowedUsers.includes(item.user.id));
        this.feedItems.next(filteredList);
    }

    /**
     * sorts post by date descending
     */
    sortByDateDesc() {
        const sortedList = [...this.allFeedItems];
        sortedList.sort((itemA, itemB) => {
            const itemADate = new Date(itemA.date);
            const itemBDate = new Date(itemB.date);
            return itemADate.getTime() - itemBDate.getTime();
        });

        this.feedItems.next(sortedList);
    }
}