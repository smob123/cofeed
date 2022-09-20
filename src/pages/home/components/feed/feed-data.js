// post images
import Boat from './assets/images/boat.jpg';
import MilkeyWay from './assets/images/milkey-way.jpg';
import Tree from './assets/images/tree.jpg';
import Vase from './assets/images/vase.jpg';
import Books from './assets/images/books.jpg'
import Table from './assets/images/table.jpg'
import Flowers from './assets/images/flowers.jpg'

// all users
import users from '../../../../globals/lists/users';

// post data, which will be displayed in the feed
const feedData = [{
    id: 'feed_item_1',
    imageSrc: Boat,
    user: users[0],
    numOfLikes: 63,
    numOfComments: 92,
    date: '2022-05-01'
},
{
    id: 'feed_item_2',
    imageSrc: MilkeyWay,
    user: users[1],
    numOfLikes: 50,
    numOfComments: 38,
    date: '2022-09-19'
},
{
    id: 'feed_item_3',
    imageSrc: Tree,
    user: users[2],
    numOfLikes: 100,
    numOfComments: 46,
    date: '2022-01-29'
},
{
    id: 'feed_item_4',
    imageSrc: Vase,
    user: users[3],
    numOfLikes: 0,
    numOfComments: 0,
    date: '2022-03-07'
},
{
    id: 'feed_item_5',
    imageSrc: Books,
    user: users[6],
    numOfLikes: 0,
    numOfComments: 0,
    date: '2022-03-07'
},
{
    id: 'feed_item_6',
    imageSrc: Table,
    user: users[7],
    numOfLikes: 0,
    numOfComments: 0,
    date: '2022-03-07'
},
{
    id: 'feed_item_7',
    imageSrc: Flowers,
    user: users[8],
    numOfLikes: 0,
    numOfComments: 0,
    date: '2022-03-07'
}];

export default feedData;