import {useRouter} from 'next/router';
import Image from 'next/image';
import {Select, SelectItem} from '@nextui-org/react';

export default function LanguageSwitcher() {
    const router = useRouter();

    console.log({locale: router.locale});

    return (
        <div>
            <select
                className="bg-orange-400 rounded"
                onChange={e =>
                    router.push(
                        {
                            pathname: router.pathname,
                            query: router.query,
                        },
                        undefined,
                        {locale: e.target.value},
                    )
                }
                defaultValue={router.locale}
            >
                <option value="fr">
                    français
                    <Image src={'/france.png'} width={100} height={100} alt="français" />
                </option>
                <option value="en">
                    <Image src={'/united-kingdom.png'} width={100} height={100} className="w-full" alt="English" />
                </option>
            </select>

            {/* <Select
                className="max-w-xs text-black"
                onChange={e =>
                    router.push(
                        {
                            pathname: router.pathname,
                            query: router.query,
                        },
                        undefined,
                        {locale: e.target.value},
                    )
                }
                renderValue={item => {
                    return (
                        <div>
                            <Image src={'/france.png'} width={100} height={100} alt="français" />
                        </div>
                    );
                }}
            >
                <SelectItem className="text-black" key={'fr'} value={'fr'}>
                    <Image src={'/france.png'} width={100} height={100} alt="français" />
                </SelectItem>
                <SelectItem className="text-black" key={'en'} value={'en'}>
                    <Image src={'/united-kingdom.png'} width={100} height={100} className="w-full" alt="English" />
                </SelectItem>
            </Select> */}
        </div>
    );
}
