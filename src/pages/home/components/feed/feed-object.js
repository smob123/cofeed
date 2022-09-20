/**
 * defines a feed item's properties
 */
export default class FeedObject {
    constructor(id, imageSrc, user, numOfLikes, numOfComments, isLiked, date) {
        this.id = id;
        this.imageSrc = imageSrc;
        this.user = user;
        this.numOfLikes = numOfLikes;
        this.numOfComments = numOfComments;
        this.isLiked = isLiked;
        this.date = date;
    }
}