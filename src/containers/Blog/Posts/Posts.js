import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(content => {
            const posts = content.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Inna'
                }
            })
            this.setState({ posts: updatedPosts });
            console.log(content);
        })
        .catch(error => {
            console.log('error:', error);
            // this.setState({error: true});
        });
    }

    postSelected = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something wesnt wrong :/ </p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelected(post.id)}/>
            });
        } 

        return (
            <section className="Posts">
                { posts }
            </section>
        )
    }
}

export default Posts;