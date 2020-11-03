import React, { Component } from 'react';
import RushingPlayersService from './RushingPlayersService';

const rushingPlayersService = new RushingPlayersService();

class RushingPlayersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      nextPageURL: '',
      sort_state:false  //Initially set to -
    };
    this.nextPage = this.nextPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }


  componentDidMount() {
    var self = this;
    rushingPlayersService.getPlayers().then(function (result) {
      console.log(result);
      self.setState({ players: result.data, nextPageURL: result.nextlink })
    });
  }


  handleDelete(e, id) {
    var self = this;
    rushingPlayersService.deletePlayer({ id: id }).then((result) => {
      if (result.data != 403) {
        var newArr = self.state.company.filter(function (obj) {
          return obj.id !== id;
        });
        self.setState({ players: newArr })
      }
      else {
        alert("403 Not Allowed")
      }
    });
  }


  handleSearch() {
    var self = this;
    rushingPlayersService.searchPlayers({
      "query": this.refs.query.value,
    }).then(function (result) {
      console.log("The result is " + result.data);
      self.setState({ players: result.data, nextPageURL: result.nextlink })
    }).catch((e) => {
      alert('No results');
    });
  }


  handleSort(sort) {
    var self = this;
    if (this.state.sort_state){
        this.refs.sort.value = sort
    }
    else {
        this.refs.sort.value = '-'+sort
    }
    this.state.sort_state = !this.state.sort_state
    rushingPlayersService.searchPlayers({
      "query": this.refs.query.value,
      "sort": this.refs.sort.value
    }).then(function (result) {
      console.log("The result is " + result.data);
      self.setState({ players: result.data, nextPageURL: result.nextlink })
    }).catch((e) => {
      alert('No results');
    });
  }


  handleCsvDownload() {
    var fileDownload = require('js-file-download');
    const { Parser } = require('json2csv');

    var self = this;
    rushingPlayersService.searchPlayers({
      "query": this.refs.query.value,
      "sort": this.refs.sort.value,
    }).then(function (result) {

      let fields = ["Player", "Team", "Pos", "Att", "Att/G", "Yds", "Avg",
        "Yds/G", "TD", "Lng", "1st", "1st%", "20+", "40+", "FUM"];
      const parser = new Parser({
        fields,
        unwind: ["Player", "Team", "Pos", "Att", "Att/G", "Yds", "Avg",
          "Yds/G", "TD", "Lng", "1st", "1st%", "20+", "40+", "FUM"]
      });
      const csv = parser.parse(result.data);
      fileDownload(csv, 'data.csv');
    }).catch((e) => {
      alert('No results');
    });
  }


  handleSubmit(event) {
    if (this.refs.query.value) {
      this.handleSearch();
    }
    event.preventDefault();

  }


  nextPage() {
    var self = this;
    console.log(this.state.nextPageURL);
    rushingPlayersService.getPlayerByURL(this.state.nextPageURL).then(
      (result) => {
        self.setState({ players: result.data, nextPageURL: result.nextlink })
      });
  }
  render() {

    return (
      <div className="players--list">
        <form className="form-group form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control mr-sm-2" type="text" ref='query' placeholder="Search" aria-label="Search" />
            <input className="btn btn-primary" type="submit" value="Search" />
          </div>
        </form>
        <div className="download--button">
          <th>
            <button className="btn btn-primary" ref='csv' type="button"
              onClick={() => this
                .handleCsvDownload()}>
              CSV Download
              </button>
          </th>
        </div>

        <table className="table">
          <thead key="thead">
            <tr>
              <th>Player</th>
              <th>
                <button className="btn btn-info" ref='sort' type="button"
                  onClick={() => this
                    .handleSort('yds')}>
                  Yds | SORT
            </button>
              </th>
              <th>
                <button className="btn btn-info" ref='sort' type="button"
                  onClick={() => this
                    .handleSort('lng')}>
                  Lng | SORT
                </button>
              </th>
              <th>
                <button className="btn btn-info" ref='sort' type="button"
                  onClick={() => this
                    .handleSort('td')}>
                  TD | SORT
              </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map(c =>
              <tr key={c.id}>
                <td>{c.Player}</td>
                <td>{c.Yds}</td>
                <td>{c.Lng}</td>
                <td>{c.TD}</td>
                <td>
                  {/* <button onClick={(e) => this.handleDelete(e, c.id)}>
                    Delete</button> -->
                  <!-- <a href={"/rushingplayers/" + c.id}> Update</a> */}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RushingPlayersList;
