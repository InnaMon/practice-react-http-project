import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        error: false,
        selectedPostId: null
    }

    componentDidMount() {
        console.log('Posts props:', this.props)
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
            this.setState({error: true});
        });
    }

    postSelected = (id) => {
        this.setState({ selectedPostId: id });
        // this.props.history.push({pathname: '/' + id});
        // this.props.history.push('/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something wesnt wrong :/ </p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                  <Link to={'/posts/' + post.id} key={post.id}>
                    <Post  
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelected(post.id)}
                    />
                  </Link>
                );
            });
        } 

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        )
    }
}

export default Posts;