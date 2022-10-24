import React from 'react';

class FetchPosts {
  static get() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => { return data; })
  }
}

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  postAddHandler(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const post = {
      title: title,
      body: body,
      id: 1
    };

    this.props.update(post);
  }

  render() {
    return (
      <form onSubmit={this.postAddHandler} className="w-2/5">
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="title" placeholder="Title" />
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="body" placeholder="Body" />
        <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" type="submit">Add post</button>
      </form> 
    );	
  }
}


class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="m-2 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{this.props.post.title}</div>
          <p className="text-gray-700 text-base"> {this.props.post.body} </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{this.props.post.id}</span>
        </div>
      </div>
    )
  }
}

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : []
    };
  } 
 

  componentDidMount() {
    FetchPosts.get()
    .then( (data) => {
      this.setState({posts : data});  
    });
  }

   render() {
    return (
      <>
        <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
        <CreatePost update={this.handler} />
        <h1 className="font-bold text-2xl m-2">POSTS</h1>
        <div>
          {this.state.posts.map((post) => (
            <Post key={post.id} post={post} />  
          ))}
        </div>
      </>
    );
  }
}

export default Posts;
