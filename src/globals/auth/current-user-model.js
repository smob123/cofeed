/**
 * fetches and returns current user's data
 */
import { BehaviorSubject } from "rxjs";

import currentUserData from "./current-user-data";

export default class CurrentUserModel {
    currentUser = new BehaviorSubject(null);

    fetchCurrentUser() {
        // update the subject's value after 2 seconds to replicate an API call
        setTimeout(() => {
            this.currentUser.next(currentUserData);
        }, 2000);
    }
}