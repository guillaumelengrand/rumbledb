import {GetServerSideProps} from 'next';
import Link from 'next/link';

const IndexAdmin = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Link href={`/admin/miniature`}>Miniatures</Link>
            <Link href={`/admin/deck`}>Decks</Link>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return {
        props: {},
    };
};

export default IndexAdmin;
