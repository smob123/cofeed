/**
 * list of all the available user stories
 */

// list of all users
import users from '../../../../globals/lists/users';

// user object
import User from '../../../../globals/objects/user';

// get the stories of the first five users only, as the remaining three will be displayed in the suggestions section
const stories = [];

for (let i = 0; i < 5; i++) {
    const currentUserData = users[i];
    const user = new User(currentUserData.id, currentUserData.avatar, currentUserData.username);
    const isSeen = i < 3;
    stories.push({
        user: user,
        isSeen: isSeen
    });
}

export default stories;