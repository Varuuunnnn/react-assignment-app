import React, { useReducer, useState } from 'react';
import _ from 'lodash';
import { Table } from 'semantic-ui-react';

const filterData = (state, action) => {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
};

const DataTable = (props) => {
  let [tableData] = useState(props.tableData);
  const [state, dispatch] = useReducer(filterData, {
    column: null,
    data: tableData,
    direction: null,
  });
  const { column, data, direction } = state;

  return (
    <>
      <Table celled sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'agent_id' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'agent_id' })
              }
            >
              Agent ID
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={column === 'call_id' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'call_id' })
              }
            >
              Call ID
            </Table.HeaderCell>
            <Table.HeaderCell
              textAlign="center"
              sorted={column === 'call_time' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'call_time' })
              }
            >
              Call Time
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(({ agent_id, call_id, call_time }) => (
            <Table.Row key={call_id}>
              <Table.Cell>{agent_id}</Table.Cell>
              <Table.Cell textAlign="center">{call_id}</Table.Cell>
              <Table.Cell textAlign="center">{call_time}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default DataTable;
