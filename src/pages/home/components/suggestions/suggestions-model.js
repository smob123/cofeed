/**
 * fetches, stores, and manipulates suggested users
 */

import { BehaviorSubject } from "rxjs";
import { LOCAL_STORAGE_KEYS } from "../../../../globals/constants/constants";

import suggestionsData from './suggestions-data';

export default class SuggestionsModel {
    suggestions = new BehaviorSubject([]);

    /**
     * fetches user suggestions from the backend
     */
    fetchSuggestions() {
        setTimeout(() => {
            this.suggestions.next(suggestionsData);
        }, 3000);
    }

    /**
     * follows a user
     */
    follow(userId) {
        // get the list of followed users
        let parsedFollowedUsers = this.getFollowedUsersList();

        // bail early if the user has followed this account before
        if (parsedFollowedUsers.includes(userId)) {
            return;
        }

        // update the list of followed users, and save it in local storage
        parsedFollowedUsers.push(userId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.FOLLOWED_USERS, JSON.stringify(parsedFollowedUsers));

        // update the subject to notify the UI with changes
        this.suggestions.next(this.suggestions.value);
    }

    /**
     * unfollows a user
     */
    unfollow(userId) {
        // get the list of followed users
        let parsedFollowedUsers = this.getFollowedUsersList();

        // update the list of followed users, and save it in local storage
        parsedFollowedUsers = parsedFollowedUsers.filter(id => id !== userId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.FOLLOWED_USERS, JSON.stringify(parsedFollowedUsers));

        // update the subject to notify the UI with changes
        this.suggestions.next(this.suggestions.value);
    }

    /**
     * returns the list of followed users from local storage
     */
    getFollowedUsersList() {
        // get the list of followed users
        const savedFollowedUsers = localStorage.getItem(LOCAL_STORAGE_KEYS.FOLLOWED_USERS);

        // return an empty array if no users were followed
        if (!savedFollowedUsers) {
            return [];
        }

        // otherwise return the parsed list of followed users
        return JSON.parse(savedFollowedUsers);
    }

    /**
     * returns whether a user is followed or not
     */
    isUserFollowed(userId) {
        const parsedFollowedUsers = this.getFollowedUsersList();
        return parsedFollowedUsers.includes(userId);
    }
}