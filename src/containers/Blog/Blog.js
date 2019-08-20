import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(content => this.setState({ posts: content }));
        // .then(content => console.log('response', content));
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title}/>
        });

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;