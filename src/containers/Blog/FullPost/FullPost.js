import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        console.log('Full Post', this.props)
        if (this.props.match.params.id) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                fetch('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
                .then(response => response.json())
                .then(post => 
                    // console.log('postid:', post)
                    this.setState({loadedPost: post}));
            }
        }
    }

    deletePost = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
        .then(response => response.json())
        .then(post =>
            console.log('delete post:', post)
        );
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // check that a props.id exists and display loading since will recieve 
        // props before het new loadedPost state due to asynch behavior of fetching data in componentDidUpdate
        if (this.props.id) {
            <p style={{textAlign: 'center'}}>Loading...!</p>
        }

        //only execute below code if loadedPost state has been set to truw with updated fetch data 
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePost}className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;