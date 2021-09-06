import axios from 'axios';
import { Dropdown, Grid, Input, Button } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

const Filters = () => {
  let [listOfAgents, setListOfAgents] = useState([]);
  let [ranges, setRanges] = useState({});
  let [filteredList, setFilteredList] = useState([]);
  let [selectedAgents, setSelectedAgents] = useState([]);
  let [minTimeRange, setMinTimeRange] = useState('');
  let [maxTimeRange, setMaxTimeRange] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    /* ******** calling API for getting list of all Agents ********* */
    axios
      .get('https://damp-garden-93707.herokuapp.com/getlistofagents')
      .then((response) => {
        let listOfAgents = response.data.data.listofagents.map((val, index) => {
          return { text: val, value: val, key: index };
        });
        setListOfAgents(listOfAgents);
      });

    /* ******** calling API for getting Call duration range ********* */
    axios
      .get('https://damp-garden-93707.herokuapp.com/getdurationrange')
      .then((response) => {
        let ranges = response.data.data;
        setRanges(ranges);
      });
  };

  const getFilteredList = () => {
    if (
      minTimeRange < ranges.minimum ||
      minTimeRange > ranges.maximum ||
      maxTimeRange > ranges.maximum ||
      maxTimeRange < ranges.minimum
    )
      return;

    var data = {
      info: {
        filter_agent_list: selectedAgents,
        filter_time_range: [parseInt(minTimeRange), parseInt(maxTimeRange)],
      },
    };
    var config = {
      method: 'post',
      url: 'https://damp-garden-93707.herokuapp.com/getfilteredcalls',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let filteredList = response.data.data;
        setFilteredList(filteredList);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSelectAgents = (event, data) => {
    setSelectedAgents(data.value);
  };

  const onEnterMinRange = (event, data) => {
    setMinTimeRange(data.value);
  };

  const onEnterMaxRange = (event, data) => {
    setMaxTimeRange(data.value);
  };

  const onClickFilter = (event, data) => {
    getFilteredList();
  };

  return (
    <div style={{ margin: '30px' }}>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              style={{ margin: '2px 10px' }}
              placeholder="List of Agents"
              fluid
              multiple
              selection
              search
              options={listOfAgents}
              onChange={onSelectAgents}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              style={{ margin: '2px 10px' }}
              iconPosition="left"
              placeholder="Min time range"
              type="number"
              label="Min"
              error={
                minTimeRange < ranges.minimum || minTimeRange > ranges.maximum
              }
              onChange={onEnterMinRange}
            />

            <Input
              style={{ margin: '2px 10px' }}
              iconPosition="left"
              placeholder="Max time range"
              type="number"
              label="Max"
              error={
                maxTimeRange > ranges.maximum || maxTimeRange < ranges.minimum
              }
              onChange={onEnterMaxRange}
            />
            <div style={{ margin: '2px 15px', color: 'red' }}>
              {minTimeRange < ranges.minimum ||
              minTimeRange > ranges.maximum ||
              maxTimeRange > ranges.maximum ||
              maxTimeRange < ranges.minimum
                ? `Please enter values in range ${ranges.minimum.toFixed(
                    2,
                  )} to ${ranges.maximum.toFixed(2)}`
                : ''}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Button onClick={onClickFilter} style={{ margin: '0px 22px' }}>
            Search
          </Button>
        </Grid.Row>
        {filteredList.length ? (
          <DataTable key={filteredList} tableData={filteredList} />
        ) : (
          <div>No data available !!</div>
        )}
      </Grid>
    </div>
  );
};

export default Filters;
