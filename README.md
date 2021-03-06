# theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:
* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements
1. Create a web app. This must be able to do the following steps
    1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
    2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
    3. The user should be able to filter by the player's name
    4. The user should be able to download the sorted data as a CSV, as well as a filtered subset
    
2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution
1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

### Installation and running this solution		

- Clone this repository
`git clone https://github.com/admurray/nfl_rushing.git`
- Change directory into the cloned directory
`cd nfl_rushing`
- Run docker compose 
`docker-compose up`

*Unfortunately the docker-compose step takes some time, this is something that is
a TODO and can be improved by using prebuilt Django/NodeJS images. NodeJS
 installation takes up a fair amount of time*

#### General Information

*Technologies used*
- Python 3+ (Django 3.0.7)
- React
- SQL (SQLite)
- Docker/Docker-compose
- Supervisor

Landing page for the application : http://127.0.0.1:3000

It may take a few seconds to start up the first time.
*Note:* Please make sure you do not have any application running on port 3000
or change the port mapping in the docker-compose.yml to something more
convenient, if your service cannot be taken offline.


#### Uploading the data
The landing page contains all the data from the rushing.json file. This data was
uploaded into the sqlite database via the web application, by navigating to the
link: http://127.0.0.1:3000/rushingplayers.
This should not be required, however may be useful if more data is to be uploaded.

#### Searching via names
On the landing page of the application, you can search for players using their
names or a part of their name, using the searchbar.

#### Sorting the fields
You can sort in ascending and descending order for the fields `yrd`, `lng` and
`td`. Clicking on the button repeatedly flips the sort order. This is true with
all the sorting fields.

#### Downloding the CSV
Once you have the searched data,  sorted it, you can download this data in
csv format using the Download CSV button. This works with the unsorted data
as well.


##### Please feel free to report any issues to - adityamurray at yahoo.com