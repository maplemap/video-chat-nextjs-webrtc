import { MdStream } from 'react-icons/md';
import Link from 'next/link';
import MyAvatar from './my-avatar';
import Time from './time';

export default function Navbar() {
  return (
    <div className='flex h-[6vh] w-full items-center justify-between bg-light-primary px-5 py-3 dark:bg-dark-primary'>
      <Link href='/'>
        <MdStream className='h-10 w-12' />
      </Link>
      <div className='flex items-center gap-x-3'>
        <Time />
        <MyAvatar />
      </div>
    </div>
  );
}
