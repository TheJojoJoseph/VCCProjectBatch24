/* eslint-disable no-console */
import { Table } from 'antd';
import qs from 'qs';
import { listStudents } from '../../api/students';
import React from 'react';
import { makeUrl, parseWebUrl } from '../../utils/queryString';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Class',
    dataIndex: 'class',
  },
];

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  // ...params,
});

class LoggedInPage extends React.Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 5,
    },
    loading: false,
  };

  getUrlParams = () => {
    let urlParams = parseWebUrl(this.props.location.search);
    return urlParams;
  };

  componentDidMount=() =>{
    const { pagination } = this.state;
    this.fetch({ pagination });
  }

  componentDidUpdate=()=>{
    let urlParams=this.getUrlParams();
    if(urlParams.addSuccess){
      this.props.history.replace({
        search: makeUrl({}),
      });
      this.fetch({ pagination: this.state.pagination });
    }
  }

  handleTableChange = (pagination) => {
    this.fetch({
      pagination,
    });
  };

  fetch = (params={}) => {
    this.setState({ loading: true });
    listStudents(getRandomuserParams(params))
      .then((data) => {
        this.setState({
          loading: false,
          data: data.data.data.data,
          pagination: {
            ...params.pagination,
            total: data.data.data.totalCount[0].count,
          },
        });
      });
  };

  render() {
    const { data, pagination, loading } = this.state;
    return (
      <Table
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default LoggedInPage;
