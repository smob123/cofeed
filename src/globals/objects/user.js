/**
 * defines a user's properties
 */
export default class User {
    constructor(id, avatar, username) {
        this.id = id;
        this.avatar = avatar;
        this.username = username;
    }

    toJson = () => {
        return {
            id: this.id,
            avatar: this.avatar,
            username: this.username
        }
    }

    static fromJson(json) {
        return new User(json.id, json.avatar, json.username);
    }
}