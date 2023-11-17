import {getFamilies, getMiniatureByDefId, getRoles, getTypes} from '@/models/miniature';
import {rumble_miniatures} from '@prisma/client';
import {GetServerSideProps} from 'next';
import {useEffect, useState} from 'react';

import {Button} from '@nextui-org/react';
import MiniatureForm from '@/components/miniature/miniatureForm';
import {fetchWrapper} from '@/lib/utils';
import {ToastContainer, toast} from 'react-toastify';

interface MiniatureByDefIdProps {
    miniature: rumble_miniatures;
    families: LocaleJson[];
    roles: LocaleJson[];
    types: LocaleJson[];
}
const AdminMiniatureByDefId = ({miniature, families, roles, types}: MiniatureByDefIdProps) => {
    const [miniatureState, setMiniatureState] = useState(miniature);

    useEffect(() => {
        console.log({miniatureState});
    }, [miniatureState]);
    return (
        <div className="flex flex-col gap-1 px-1">
            <ToastContainer />
            <h1 className="text-3xl">{miniature.name && (miniature.name as unknown as LocaleJson).en}</h1>

            <Button
                type="submit"
                onClick={async () => {
                    const res = await fetchWrapper(`/api/miniature/${miniature.defId}`, miniatureState, 'PUT');

                    if (res.ok) toast('Miniature update !');
                    else toast.error('Miniature update error !');
                }}
            >
                Save
            </Button>
            <div className="flex flex-row gap-1">
                <MiniatureForm
                    miniature={miniatureState}
                    setMiniature={setMiniatureState}
                    families={families}
                    roles={roles}
                    types={types}
                    locale="en"
                    className="w-1/2"
                />
                <MiniatureForm
                    miniature={miniatureState}
                    setMiniature={setMiniatureState}
                    families={families}
                    roles={roles}
                    types={types}
                    locale="fr"
                    className="w-1/2"
                />
            </div>
            <Button
                type="submit"
                onClick={async () => {
                    const res = await fetchWrapper(`/api/miniature/${miniature.defId}`, miniatureState, 'PUT');

                    if (res.ok) toast('Miniature update !');
                    else toast.error('Miniature update error !');
                }}
            >
                Save
            </Button>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    let {defId} = ctx.query;

    let miniature = defId && typeof defId === 'string' ? await getMiniatureByDefId(defId) : null;

    if (!miniature) return {notFound: true};

    let families = await getFamilies();
    let roles = await getRoles();
    let types = await getTypes();

    console.log({miniature});

    return {
        props: {miniature, families, roles, types},
    };
};

export default AdminMiniatureByDefId;
