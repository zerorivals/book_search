// import user model
import User from '../models/User.js';
// import sign token function from auth
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    getSingleUser: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        console.log('No user found in context');
        return null;
      }
      else {
        const foundUser = await User.findOne({ _id: context.user._id });

        if (!foundUser) {
          console.log('No user found');
          return null;
        }

        return (foundUser);
      }
    }
  },
  Mutation: {
    createUser: async (_parent: any, args: any) => {
      const user = await User.create(args);

      if (!user) {
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return ({ token, user });
    },
    login: async (_parent: any, args: any) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        console.log('No user found');
        return null;
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        console.log('Incorrect password');
        return null;
      }
      const token = signToken(user.username, user.password, user._id);
      return ({ token, user });
    },
    saveBook: async (_parent: any, args: any, context: any) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return (updatedUser);
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    deleteBook: async (_parent: any, args: any, context: any) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return null;
      }
      return (updatedUser);
    }
  }
}


export default resolvers;