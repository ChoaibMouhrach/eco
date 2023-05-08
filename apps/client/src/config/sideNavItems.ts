import { IconType } from 'react-icons'
import { MdOutlinePersonOutline } from 'react-icons/md'

type SideNavConfig = {
  title: string
  href: string
  icon: IconType
}[]

const sideNavItems: SideNavConfig = [
  {
    title: 'Profile',
    href: '/profile',
    icon: MdOutlinePersonOutline,
  },
]

export default sideNavItems
