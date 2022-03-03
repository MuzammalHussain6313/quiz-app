
import React, {Component} from "react";
import {getNews} from "../../api";

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
    }

    async getNews(){
        await getNews().then(async response => {
            var news = [];
            for(var i=0; i<100; i++){
                news.push(response.entries[i]);
            }
            await this.setState((prevState, props) => ({
                news: news,
            }));
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.news.length>0 && <div>
                    {
                        this.state.news.map((newsItem, index) => (
                            <div key={`${index}_news`}>
                                <p>API: {newsItem.API}</p>
                                <p>Description: {newsItem.Description}</p>
                                <p>Link: {newsItem.Link}</p>
                                <p>Category: {newsItem.Category}</p>
                            </div>
                        ))
                    }
                </div>}
                <div className="notFound">
                    Opps ! 404 page not found
                </div>
            </React.Fragment>
        )
    };
}

export default NotFound;
