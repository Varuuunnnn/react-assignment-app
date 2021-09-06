import axios from 'axios';
import { Dropdown, Grid, Button } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';

const Labels = () => {
  let [listOfCalls, setListOfCalls] = useState([]);
  let [listOfLabels, setListOfLabels] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const getCallList = () => {
    var config = {
      method: 'get',
      url: 'https://damp-garden-93707.herokuapp.com/getcalllist',
      headers: {
        'Content-Type': 'application/json',
        user_id: '24b456',
      },
    };

    axios(config).then(function (response) {
      let callList = response.data.data.call_data.map((val, index) => {
        return { text: val.call_id, value: val.call_id, key: index };
      });
      setListOfCalls(callList);
    });
  };

  const getListOfLabels = () => {
    var config = {
      method: 'get',
      url: 'https://damp-garden-93707.herokuapp.com/getlistoflabels',
      headers: {
        'Content-Type': 'application/json',
        user_id: '24b456',
      },
    };

    axios(config).then(function (response) {
      let labelsList = response.data.data.unique_label_list.map(
        (val, index) => {
          return { text: val, value: val, key: index };
        },
      );
      setListOfLabels(labelsList);
    });
  };

  const fetchData = () => {
    /* ******** for getting list of call list ********* */
    getCallList();
    /* ******** for getting list of labels ********* */
    getListOfLabels();
  };

  const onSelectCalls = (value) => {
    console.log(value);
  };
  const onSelectLabels = (value) => {
    console.log(value);
  };
  const onClickUpdate = (value) => {
    console.log(value);
  };

  return (
    <div style={{ margin: '30px' }}>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              style={{ margin: '2px 10px' }}
              placeholder="List of Calls"
              fluid
              multiple
              selection
              search
              options={listOfCalls}
              onChange={onSelectCalls}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              style={{ margin: '2px 10px' }}
              placeholder="List of Labels"
              fluid
              multiple
              selection
              search
              options={listOfLabels}
              onChange={onSelectLabels}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button onClick={onClickUpdate} style={{ margin: '0px 22px' }}>
            Update
          </Button>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Labels;
