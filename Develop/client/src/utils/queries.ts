import {gql} from '@apollo/client';

export const Query_SingleUser = gql`
    query GetSingleUser {
  getSingleUser {
    _id
    bookCount
    email
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
    username
  }
}
`
    