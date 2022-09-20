import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCloud } from '@fortawesome/free-solid-svg-icons';
import Suggestions from '../../pages/home/components/suggestions/suggestions';

export default function Search() {
    return (
        <div>
            <div className='d-flex align-items-center justify-content-between'>
                <input placeholder="Search" className="border text-center text-muted rounded-50 py-2 mw-150px" />

                <div className='border rounded-circle p-2 mx-1'>
                    <FontAwesomeIcon icon={faBell} size='lg' className='text-muted' />
                </div>

                <div className='border rounded-circle bg-info p-2'>
                    <FontAwesomeIcon icon={faCloud} size='lg' className='text-light' />
                </div>
            </div>

            <div className='d-none d-lg-block mt-5'>
                <Suggestions />
            </div>
        </div>
    );
}