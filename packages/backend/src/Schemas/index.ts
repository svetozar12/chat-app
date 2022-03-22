import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import UserSchema from "./types/User.Schema";
import { update_formValidation } from "../helpers/schema";
import User from "../models/User.model";
import Chats from "../models/chatRoom.model";
import Invites from "../models/Invites.model";
import * as createError from "http-errors";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUser: {
      type: UserSchema,
      args: {
        username: { type: GraphQLString },
      },
      async resolve(parent, args: { username: string }) {
        const response = await User.findOne({ username: args.username });

        if (!response) {
          throw new Error(`User ${args.username} not found`);
        }
        return response;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserSchema,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
      },
      async resolve(parent, args: { username: string; password: string; email: string; gender: string }) {
        const response = await User.findOne({ username: args.username });
        if (response) {
          return createError(400, `${args.username} already exist`);
        }

        const user = new User({
          type: "POST",
          username: args.username,
          password: args.password,
          email: args.email,
          userAvatar: "",
          gender: args.gender,
        });

        const chat = new Chats({
          members: args.username,
        });

        user.save();
        chat.save();

        return args;
      },
    },
    updateUser: {
      type: UserSchema,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        userAvatar: { type: GraphQLString },
      },
      async resolve(parents, args: { username: string; password: string; email: string; gender: string; userAvatar: string }) {
        const users = await User.findOne({ username: args.username }).exec();
        if (!users) return createError(404, `${args.username} doesn't exist`);
        return args;
      },
    },
    deleteUser: {
      type: UserSchema,
      args: {
        username: { type: GraphQLString },
      },
      async resolve(parents, args: { username: string }) {
        const user = await User.findOne({ username: args.username }).exec();
        if (!user) return createError(404, `${args.username} not found`);
        await User.deleteOne({ username: args.username }).exec();
        await Invites.deleteMany({
          reciever: args.username,
        }).exec();
        await Invites.deleteMany({
          inviter: args.username,
        }).exec();
        await Chats.deleteMany({
          members: { $all: [args.username] },
        }).exec();
        return args;
      },
    },
  },
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
