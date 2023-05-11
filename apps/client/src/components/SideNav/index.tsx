import Item from './Item';
import sideNavItems from '@/config/sideNavItems';

export default function SideNav({ navBarShown }: { navBarShown: boolean }) {
  return (
    <aside
      className={`overflow-scroll ${
        navBarShown
          ? 'absolute w-full top-0 h-[calc(100vh_-_64px)] bg-white'
          : 'hidden lg:block lg:w-80'
      }`}
    >
      <nav className="flex flex-col gap-2 w-full p-4 lg:p-0">
        {sideNavItems.map((item, index) => (
          <Item key={index} href={item.href} icon={item.icon}>
            {item.title}
          </Item>
        ))}
      </nav>
    </aside>
  );
}
