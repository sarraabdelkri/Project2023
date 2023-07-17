import { FaFacebook, FaLinkedin, FaTwitter, FaMailBulk } from 'react-icons/fa';

export function SocialShareButtons({ url, title }) {
    return (
        <div className="flex ">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
                <FaFacebook className="h-10 w-10 text-green-500 mr-5" />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`} target="_blank" rel="noreferrer">
                <FaTwitter className="h-10 w-10 text-green-500 mr-5" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noreferrer">
                <FaLinkedin className="h-10 w-10 text-green-500 mr-5" />
            </a>
            <a href={`mailto:?subject=${title}&body=${url}`} target="_blank" rel="noreferrer">
                <FaMailBulk className="h-10 w-10 text-green-500 mr-5" />
            </a>
        </div>
    );
}