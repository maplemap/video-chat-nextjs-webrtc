import { MdStream } from 'react-icons/md';
import MyAvatar from './my-avatar';
import Time from './time';

export default function Navbar() {
  return (
    <div className="flex h-[6vh] w-full items-center justify-between bg-light-primary px-5 py-3 dark:bg-dark-primary">
      <MdStream className="h-10 w-12" />
      <div className="flex items-center gap-x-3">
        <Time />
        <MyAvatar />
      </div>
    </div>
  );
}
