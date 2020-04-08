import React from 'react';
import { Admin, Resource, List,
	Datagrid, TextField, DateField,
	Filter, TextInput, Pagination
} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import jsonServerProvider from 'ra-data-json-server';
import Box from '@material-ui/core/Box';
import {
	Chart,
	PieSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Legend
  } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const dataProvider = jsonServerProvider('http://localhost:5000');

const SearchFilter = (props) => (
    <Filter {...props}>
		<TextInput label="Search"
				   source="term"
				   alwaysOn
		/>
    </Filter>
);
const tpl = [
	{ lang: 'it', count: 6 },
	{ lang: 'pt', count: 5 },
	{ lang: 'fr', count: 2 },
	{ lang: 'en', count: 55 },
  ];

  const tpd = [
    { date: '2020-04-07 15:59', count: 11},
    { date: '2020-04-08 10:21', count: 10},
    { date: '2020-04-08 10:35', count: 13},
    { date: '2020-04-08 12:45', count: 35},
    { date: '2020-04-08 15:59', count: 1},
    { date: '2020-04-08 18:29', count: 5},
    { date: '2020-04-08 19:48', count: 12},
    { date: '2020-04-08 19:59', count: 21},

  ];

const SearchPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;
export const SearchList = props => (
	<Card>
    <CardHeader title="Tweets Dashboard" />
      <List {...props} filters={<SearchFilter />} pagination={<SearchPagination />}>
          <Datagrid rowClick="">
              <TextField source="user" />
              <TextField source="lang" />
              <TextField source="text" />
              <DateField source="created_at" />
          </Datagrid>
      </List>
      <Box Height={1/4}>
      <Chart data={tpl} >
      <Legend />
      <PieSeries
        valueField="count"
        argumentField="lang"
      />
      <Title text="Tweets per Language" />
      <Animation />
      </Chart>
      
      <Chart data={tpd} >
        <ArgumentAxis />
        <ValueAxis max={7} />
        <BarSeries
          valueField="count"
          argumentField="date"
        />
        <Title text="Tweets Per Date" />
        <Animation />
      </Chart>
      </Box>
	</Card>
);




const App = () => (
	    <Admin dataProvider={dataProvider}>
	        <Resource name="search" list={SearchList} />
	    </Admin>
	);

export default App;
