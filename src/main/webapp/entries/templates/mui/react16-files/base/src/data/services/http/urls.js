
export const CATEGORY = (id) => `crud/productCategorys/${id}`;
export const CATEGORIES = () => 'crud/productCategorys/principal';
export const BUSINESS_HOURS = () => 'crud/businessHourss';
export const WAY_PAYMENTS = () => 'crud/wayPayments';
export const HOME = () => 'crud/homes/configuration';
export const PRODUCTS = () => 'crud/products';
export const PRODUCT_BY_ID = (id) => `crud/products/${id}`;
export const PARTNER_BY_ID = (id) => `crud/partners/${id}`;
export const SETTINGS = () => 'crud/settingss/one';
export const AUTH = () => '/auth';

export const WISH_LIST = (id) => `crud/buyers/${id}/wishList`;
export const DELETE_WISH_LIST = (id, product) => `crud/buyers/${id}/wishList/${product}`;
