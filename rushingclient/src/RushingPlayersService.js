import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RushingPlayersService {

  constructor() {
    console.log("Doing something here")
  }


  getPlayers() {
    const url = `${API_URL}/api/rushingplayers/`;
    console.log('Simple' + url)
    return axios.get(url).then(response => response.data);
  }


  getPlayersByURL(link) {
    const url = `${API_URL}${link}`;
    console.log("By URL" + url)
    return axios.get(url).then(response => response.data);
  }


  getPlayer(id) {
    const url = `${API_URL}/api/rushingplayers/${id}`;
    console.log("By ID" + url)
    return axios.get(url).then(response => response.data);
  }


  deletePlayer(player) {
    const url = `${API_URL}/api/rushingplayers/${player.id}`;
    return axios.delete(url);
  }


  createPlayers(player) {
    const url = `${API_URL}/api/rushingplayers/`;
    return axios.post(url, player);
  }


  updatePlayer(player) {
    const url = `${API_URL}/api/rushingplayers/${player.id}`;
    return axios.put(url, player);
  }


  searchPlayers(query) {
    var sort, query, csv = null
    if (!query.sort) { sort = '' } else { sort = query.sort }
    if (!query.query) { query = '' } else { query = query.query }

    const url = `${API_URL}/api/rushingplayers/?q=${query}&sort=${sort}`;
    return axios.get(url).then(response => response.data);
  }
}
