export const NON_NUMERIC_REGEX = /[^0-9.]/g;

export const navBarDataId = {
    mainHeader: 'primary-header',
    secondaryHeader: 'secondary-header',
    cartMenu: 'shopping-cart-link',
    burgerMenu: 'open-menu',
    allItemsMenu: 'inventory-sideb ar-link',
    aboutMenu: 'about-sidebar-link',
    logoutMenu: 'logout-sidebar-link',
    resetMenu: 'reset-sidebar-link',
    closeMenu: 'close-menu'
}

export const inventoryDataId = {
    inventoryList: 'inventory-list',
    inventoryItem: 'inventory-item',
    itemName: 'inventory-item-name',
    itemDesc: 'inventory-item-desc',
    itemPrice: 'inventory-item-price',
    addToCartBtn: (productName: string) => `add-to-cart-${productName}`,
    remove: (productName: string) => `remove-${productName}`
}
