import gql from "graphql-tag";

export const CATEGORIES = gql`
  query GetAllStoreCategories {
    storeCategories {
      id
      type
    }
  }
`;

export const STORE_TYPES = gql`
  query GetAllStoreTypes {
    storeTypes {
      id
      type
      storeCategoryId
    }
  }
`;

export const STORE_TYPE_BY_CATEGORY_ID = gql`
  query getStoreTypeByCategoryId($id: Int!) {
    storeTypeByCategoryId(id: $id) {
      id
      type
      storeCategoryId
    }
  }
`;

export const ALL_STORES = gql`
  query GetAllStores {
    stores {
      id
      name
      longitude
      latitude
      storeTypeId
    }
  }
`;

export const STORES_BY_TYPE_ID = gql`
  query GetStoresByTypeId($id: Int!) {
    storesByTypeId(id: $id) {
      id
      name
      longitude
      latitude
      storeTypeId
    }
  }
`;

export const ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      storeId
      name
      price
      image
    }
  }
`;

export const PRODUCTS_BY_STORE_ID = gql`
  query getAllProductsByStoreId($id: Int!) {
    productsByStoreId(id: $id) {
      id
      name
      price
      image
    }
  }
`;

export const ALL_ORDERS_BY_USER_ID = gql`
  query GetAllOrdersByUserId($id: Int!) {
    allOrdersByUserId(id: $id) {
      id
      userId
      storeId
      delivererId
      orderTotal
      status
    }
    products {
      name
    }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        fullName
        email
      }
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation SignUp($fullName: String!, $email: String!, $password: String!) {
    SignUp(fullName: $fullName, email: $email, password: $password) {
      fullName
      email
    }
  }
`;
