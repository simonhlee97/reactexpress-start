import React, { Component } from 'react'



export default class Posts extends Component {
	state = {
	  posts: [],
	  post: {
		  title: '',
		  post: ''
	  }
	}

	
	componentDidMount() {
		this.getPosts();
	}
	
	getPosts = () => {
		fetch('/posts')
			.then(response => response.json())
			.then(response => this.setState({ posts: response.data}))
			.catch(err => console.error(err))
	}

	addPost = () => {
		const {post} = this.state;
		fetch(`/posts/add?title=${post.title}&post=${post.post}`)
			.then(this.getProducts)
			.catch(err => console.error(err))
	}

	renderPost = ({id, title, post}) => (
		<div key={id}>
			<h1>{title}</h1>
			<p>{post}</p>
		</div>
	)
  
	render() {
		const {posts, post} = this.state;

		return (
			<div>
				<div>
					{posts.map(this.renderPost)}
				</div>

				<div>
					<input value={post.title} onChange={e => this.setState({post: {...post, title: e.target.value}})} />
					<input value={post.post} onChange={e => this.setState({post: {...post, post: e.target.value}})} />
					<button onClick={this.addPost}>Add Post</button>
				</div>
			</div>
	  	)
	}
}
