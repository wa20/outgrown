import React, { Component, useEffect } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import Logo from '../../assets/outgrownLogo.png'
import HomeContent from "../../components/home-content/home-content"
import Hero from "../../components/hero/hero"
import Footer from "../../components/footer/footer"
import Nav from "../../components/navbar/navbar"
import blurb from "../../components/blurb/blurb"
import Filterbar from "../../components/filter/filter-bar"
import MarketProducts from "../../components/marketplace-page/marketplace-page"
import {
  Button,
  Container,
  Dropdown,
  Divider,
  Grid,
  Placeholder,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Accordion
} from 'semantic-ui-react'
import { useStoreContext } from '../../utils/globalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core/styles';
import BriefCard from '../../components/brief-card/brief-card';
// import Carousel from '../../components/carousel/carousel'


const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })
  
  
  const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        content='Marketplace'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
          paddingTop: 30
        }}
      />
    </Container>
  )
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  }
  
  class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Media greaterThan='mobile'>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 250, padding: '1em 0em' }}
              vertical
            >
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Media>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }
  
  class MobileContainer extends Component {
    state = { }
  
    //accordian
    handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index
      this.setState({ activeIndex: newIndex })
    }
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
  
    render() {
      const { children } = this.props
      const { sidebarOpened } = this.state
      const { activeIndex } = this.state
  
      return (
        <Media as={Sidebar.Pushable} at="mobile">
  
              <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 180, padding: "1em 0em" }}
                vertical
              >
                <HomepageHeading mobile />
              </Segment>
  
              {children}
  
          
        </Media>
      );
    }
  }
  
  MobileContainer.propTypes = {
    children: PropTypes.node,
  }
  
  const ResponsiveContainer = ({ children }) => (
    
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  )
  
  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }
  
  
  const ProfilePage = () => {
    return (
      <div>
        <ResponsiveContainer>
        <Nav/>
        <Filterbar/>
          

        <Footer />
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default ProfilePage;