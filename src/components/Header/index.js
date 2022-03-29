import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  onClickMenu = () => {
    this.setState({showMenu: true})
  }

  muteMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassName
    let popularClassName
    let accountClassName

    switch (path) {
      case '/popular':
        homeClassName = 'passive-one'
        popularClassName = 'active-one'
        accountClassName = 'passive-one'
        break
      case '/profile':
        homeClassName = 'passive-one'
        popularClassName = 'passive-one'
        accountClassName = 'active-one'
        break
      default:
        homeClassName = 'active-one'
        popularClassName = 'passive-one'
        accountClassName = 'passive-one'
        break
    }

    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dps34f4by/image/upload/v1646985280/Group_7399_1_rs0qmy.png"
              className="app-logo"
              alt="website logo"
            />
          </Link>
          <ul className="list-items">
            <Link to="/" className="link">
              <li className={`pop-heading ${homeClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className="link">
              <li className={`pop-heading ${popularClassName}`}>Popular</li>
            </Link>
          </ul>
          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="search"
                className="search"
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="icon-button"
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="white"
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dps34f4by/image/upload/v1647240547/Mask_Group_clhm8s.png"
                className={`profile-logo ${accountClassName}`}
                alt="profile"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="list-mini">
              <Link to="/" className="link">
                <li className={`pop-heading ${homeClassName}`}>Home</li>
              </Link>
              <Link to="/popular" className="link">
                <li className={`pop-heading ${popularClassName}`}>Popular</li>
              </Link>

              <Link to="/account" className="link">
                <li className={`pop-heading ${accountClassName}`}>Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.muteMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
