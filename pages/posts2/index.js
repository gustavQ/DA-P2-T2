import { useState, useEffect } from "react";


export default function POSTS() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchPosts().then((data) => {setData(data);})
  }, [])


  if (!data) return <p>No POSTS fetched</p>
  return (
    <div>
      <h1 className="font-bold text-2xl m-2">ADD POSTS</h1>
      <AddPost id={data.length} addData={setData} />  
      <h1 className="font-bold text-2xl m-2">POSTS</h1>
      {data.map(post => (
        <Post key={post.id} post={post} />        
      ))}
    </div>
  )
}

function AddPost({id, addData }) {
  
  function postAddHandle(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const body = event.target.elements.body.value;
    const post = {
      title: title,
      body: body,
      id: id+1 
    };

    addData(ppost => ppost.concat(post));
  }
  
  return (
      <form onSubmit={postAddHandle} className="w-2/5">
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="title" placeholder="Title" />
        <input className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner" name="body" placeholder="Body" />
        <button className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline" type="submit">Add post</button>
      </form> 
  );	
}

function Post({post}) {
  return (
    <div className="m-2 rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base"> {post.body} </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">#{post.id}</span>
      </div>
    </div>
  );
}

function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => { return data; })
}
