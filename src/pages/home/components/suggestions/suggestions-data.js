import users from '../../../../globals/lists/users';
import User from '../../../../globals/objects/user';

const suggestionsData = [];

for (let i = users.length - 3; i < users.length; i++) {
    const currentUserData = users[i];
    const user = new User(currentUserData.id, currentUserData.avatar, currentUserData.username);
    suggestionsData.push(user);
}

export default suggestionsData;