'use strict';

var HomeRepo = React.createClass({
  render: function() {
    return <a onClick={this.handleClick}>
      {this.props.repo.fullName}
    </a>;
  },
  handleClick: function(evt) {
    evt.preventDefault();
    this.props.onOpen(this.props.repo);
  }
});

var Home = React.createClass({
  render: function() {
    var user = this.props.user;
    var repoList = this.state.repoList;
    return (
      <div>
        <h1>Reposiories of {user.meta.login}</h1>
        <ul>
          {repoList.map((repo) =>
            <li className="homerepo">
              <HomeRepo repo={repo} onOpen={this.handleOpen} />
            </li>
          )}
        </ul>
        <p>{logoutButton()}</p>
      </div>
    );
  },
  getInitialState: function() {
    return {repoList: []};
  },
  componentDidMount: function() {
    this.props.user.repos()
      .done((repoList) => {
        this.setState({repoList: repoList});
      });
  },
  handleOpen: function(repo) {
    window.location.href = '/?repo=' + repo.fullName;
  }
});

function initializeHomepage(user) {
  React.render(<Home user={user} />, document.querySelector('#top'));
}
