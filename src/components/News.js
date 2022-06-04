import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
  capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capitalize(this.props.category)}- NEWSVERSE`;
    }
    async updateNews(){
      this.props.setprogress(0);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=388d485c3b0343709ceef9578ef22328&pageSize=${this.props.pageSize}`;
      this.setState({
        loading:true
      })
      let data= await fetch(url);
      this.props.setprogress(30);
      let parseddata=await data.json()
      this.props.setprogress(70);
      console.log(parseddata)
      this.setState( {articles: parseddata.articles, totalresults:parseddata.totalresults,loading:false } )
      this.props.setprogress(100);
    }
    async componentDidMount(){
      this.updateNews();
    }
    handlepreviousclick =async ()=>{
      this.setState({
        page:this.page.state - 1,
      })
      this.updateNews();
    }
    handlenextclick = async ()=>{
      this.setState({
        page:this.state.page+1
      })
      this.updateNews();
    }
    fetchMoreData = async () => {  
      this.setState({page: this.state.page + 1})
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults
      })
    };
  render() {
    return (
      <>
                <h1 className="text-center" style={{ margin: '60px 20px' }}>NEWSVERSE - Top {this.capitalize(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
    )
  }
}

export default News