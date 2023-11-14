import MiniatureList from '@/components/miniature/miniatureList';
import {getMiniatures} from '@/models/miniature';
import {rumble_miniatures} from '@prisma/client';
import {GetServerSideProps} from 'next';

interface MiniatureAdminProps {
    miniatures: rumble_miniatures[];
}
const MiniatureAdmin = ({miniatures}: MiniatureAdminProps) => {
    return (
        <div>
            <MiniatureList miniatures={miniatures} mode="admin" />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    let miniatures = await getMiniatures();
    return {
        props: {
            miniatures,
        },
    };
};

export default MiniatureAdmin;
