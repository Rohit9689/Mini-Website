import { gql } from "@apollo/client";

export const Book_info = gql`
  query Query {
    getBooks {
      id
      title
      author
      description
      price
      publisher
      edition
      reviews {
        id
        rating
        comment
      }
    }
  }
`;
