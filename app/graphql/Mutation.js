import {gql} from "@apollo/client"

export const Add_Book = gql`
mutation CreateBook($input: BookInput!) {
  createBook(input: $input) {
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
`

export  const Add_Review = gql`
mutation CreateBook($input: ReviewInput) {
  createReview(input: $input) {
    id
    rating
    comment
  }
}
`
export const Delete_Book = gql`
mutation CreateBook($deleteBookId: ID!) {
  deleteBook(id: $deleteBookId)
}
`