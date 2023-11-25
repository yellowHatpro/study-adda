
//TODO: Use types
export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    label?: string

}

export interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[]
}

export interface RoomItemWithChildren extends NavItemWithChildren {
    people?: []
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface RoomSidebarNavItem extends RoomItemWithChildren {}
