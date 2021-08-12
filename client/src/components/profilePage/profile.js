import React, { useEffect, useState } from 'react'
import { createMedia } from "@artsy/fresnel";
import PropTypes from "prop-types";
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { useStoreContext } from '../../utils/globalState';

import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Accordion,
  Form,
  Table,
  Tab
} from "semantic-ui-react";
import auth from '../../utils/auth';


//Set the states, on change update them, on submit run the mutation with the values in state

function Profile({ _id }) {
  const userId = auth.getUserId()
  const [state, dispatch] = useStoreContext();
  const { data, loading } = useQuery(QUERY_USER, {
    variables: { _id: userId },
  });

  console.log(userId);

  let user;
  if (data) {
    user = data.user;

  }

  const [username, setUsername] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [street, setStreet] = useState(null);
  const [townCity, setTownCity] = useState(null);
  const [postCode, setPostCode] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleTownCityChange = (event) => {
    setTownCity(event.target.value);
  };

  const handlePostCodeChange = (event) => {
    setPostCode(event.target.value);
  };
  const userInfo = {
    email, username, firstName, lastName, street, townCity, postCode
  }

  console.log(userInfo)

  const [updateUser, { error }] = useMutation(UPDATE_USER);
  console.log(error);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          userInfo
        },
      });
      localStorage.setItem("log", JSON.stringify(data))
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const panes = [
    {
      menuItem: "Profile",
      render: () => (
        <Tab.Pane attached={false}>
          <Card fluid>
            <Card.Content header="">
              Hey
            </Card.Content>

            <Card.Content>
              <Card.Meta>Delivery Address</Card.Meta>
              {/* <Card.Description>address line 1</Card.Description> */}
              <Card.Description>address line 2</Card.Description>
              <Card.Description>City/Town</Card.Description>
              <Card.Description>Post Code</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="user" /> Username
            </Card.Content>
            <Card.Content extra>
              <Icon name="mail" /> Email
            </Card.Content>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Edit Profile",
      render: () => (
        <Tab.Pane attached={false}>
          <Segment inverted>
            <Grid.Row centered>
              <Form inverted onSubmit={handleFormSubmit}>
                <Form.Group widths="equal">
                  <Form.Input fluid label="User Name" placeholder="First name" onChange={handleUsernameChange} />
                  <Form.Input fluid label="Last name" placeholder="Last name" onChange={handleLastNameChange} />
                  <Form.Input fluid label="First Name" placeholder="First name" onChange={handleFirstNameChange} />
                  <Form.Input fluid label="Street" placeholder="Street" onChange={handleStreetChange} />
                  <Form.Input fluid label="town city" placeholder="town city" onChange={handleTownCityChange} />
                  <Form.Input fluid label="postcode" placeholder="postcode" onChange={handlePostCodeChange} />
                  <Form.Input fluid label="email" placeholder="email" onChange={handleEmailChange} />
                </Form.Group>
                <Button type="submit" >Submit</Button>
              </Form>
            </Grid.Row>
          </Segment>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <Segment style={{ padding: "5em " }} vertical textAlign="center">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Segment>
    </div>
  );
}
export default Profile