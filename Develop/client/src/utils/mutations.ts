import {gql} from '@apollo/client';

export const Create_User = gql`
mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
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
}`
export const Login_User = gql`
mutation Login($password: String!, $email: String, $username: String) {
  login(password: $password, email: $email, username: $username) {
    token
    user {
      _id
      bookCount
      email
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
      username
    }
  }
}`
export const Save_Book = gql`
mutation SaveBook($description: String!, $bookId: String!, $title: String!, $authors: [String], $link: String, $image: String) {
  saveBook(description: $description, bookId: $bookId, title: $title, authors: $authors, link: $link, image: $image) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}`
export const Delete_Book = gql`
mutation DeleteBook($bookId: String!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}`