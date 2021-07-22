import graphql from 'graphql';
import Approach from './approach.js';
import Task from './task.js';
const { GraphQLID, GraphQLNonNull, GraphQLInterfaceType, GraphQLString }  = graphql;

const SearchResultItem = new GraphQLInterfaceType(
  {
    name: 'SearchResultItem',
    fields: () =>(
      {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      }
      ),
      resolveType(obj) 
      {
        if (obj.type === 'task') 
        {
          return Task;
        }

        if (obj.type === 'approach') 
        {
          return Approach;
        }
      }
  }
);

export default SearchResultItem;