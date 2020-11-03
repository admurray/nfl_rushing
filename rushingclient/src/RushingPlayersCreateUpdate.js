import React, { Component } from 'react';
import RushingPlayersService from './RushingPlayersService';

const rushingPlayersService = new RushingPlayersService();

class RushingPlayersCreateUpdate extends Component {
  constructor(props) {
    console.log('Running')
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { match: { params } } = this.props;
    if (params && params.id) {
      rushingPlayersService.getPlayer(params.id).then((c) => {
        this.refs = c.Player;
      })
    }
  }


  handleCreate() {
    rushingPlayersService.createPlayers(
      {
        "data": this.refs.data.value,
      }
    ).then((result) => {
      alert("Player/s created!");
    }).catch(() => {
      alert('There was an error! Please re-check your form.');
    });
  }


  handleUpdate(id) {
    console.log("Attempting update...")
    rushingPlayersService.updatePlayer(
      {
        "id": id,
        "player": this.refs.name.value,
      }
    ).then((result) => {
      console.log(result);
      alert("Company updated!");
    }).catch(() => {
      alert('There was an error! Please re-check your form.');
    });
  }


  handleSubmit(event) {
    const { match: { params } } = this.props;

    if (params && params.id) {
      this.handleUpdate(params.id);
    }
    else {
      this.handleCreate();
    }
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            JSON Data:</label>
          <textarea className="form-control" ref='data' ></textarea>

          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default RushingPlayersCreateUpdate;
