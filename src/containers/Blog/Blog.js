import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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
            console.log(this.state);
        })
        .catch(error => {
            this.setState({error: true});
        })
    }

    postSelected = (id) => {
        this.setState({ selectedPostId: id });
    }

    render () {
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
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;