/* eslint-disable */

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { ROUTES } from "../../Routes.constants";
import PropType from "prop-types";
import style from "./style.module.scss";
import { Modal, Button } from "antd";
import InputField from "../InputField";
import { notify } from "../../utils/notifications";
import { isValid } from "../../utils/formValidator";
import { FORM_FIELDS } from "./TopNav.config";
import { addStudent } from "../../api/students";
import { makeUrl, parseWebUrl } from "../../utils/queryString";
import logo from "../../assets/logo.png";

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      name: { value: "", error: "" },
      age: { value: "", error: "" },
      stu_class: { value: "", error: "" },
    };
  }

  clearForm = () => {
    this.setState({
      name: { value: "", error: "" },
      age: { value: "", error: "" },
      stu_class: { value: "", error: "" },
    });
  };

  handleLogout = () => {
    localStorage.clear();
    props.history.push(ROUTES.LOGIN);
  };

  toggleStudentModal = async () => {
    let { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  addStudent = () => {
    const { name, age, stu_class } = this.state;
    addStudent({
      name: name.value,
      age: age.value,
      class: stu_class.value,
    })
      .then((res) => {
        notify.success("Student added successfully");
        this.props.history.replace({
          search: makeUrl({ addSuccess: true }),
        });
        this.clearForm();
        this.toggleStudentModal();
      })
      .catch((err) => {
        notify.error("Error in adding student");
      });
  };

  inputChange = async (e) => {
    const { name, value } = e.target;
    const data = await isValid({ fields: FORM_FIELDS, key: name, value });
    this.setState({
      [e.target.name]: {
        value,
        error: data.error || null,
      },
    });
  };

  render() {
    const { isModalVisible, name, age, stu_class } = this.state;
    return (
      <>
        <div className={style["nav-bar"]}>
          <div className={style.navs}>
            <img src={logo} alt="Logo" className={style.logo} />{" "}
            {/* Add logo here */}
            <Link onClick={(e) => e.preventDefault}>VCC Project - IITJ</Link>
          </div>
          <div className={style["user-controls"]}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                this.toggleStudentModal();
              }}
            >
              Add Student
            </Link>
          </div>
        </div>
        <Modal
          title="Add Student Form"
          visible={isModalVisible}
          onOk={this.addStudent}
          onCancel={this.toggleStudentModal}
        >
          <ul className={style.formsBlock__list}>
            <li>
              <InputField
                htmlForName="name"
                placeholderLabel="Name"
                type="text"
                onChange={this.inputChange}
                value={name.value}
                error={name.error}
              />
            </li>
            <li>
              <InputField
                htmlForName="age"
                placeholderLabel="Age"
                type="number"
                onChange={this.inputChange}
                value={age.value}
                error={age.error}
              />
            </li>
            <li>
              <InputField
                htmlForName="stu_class"
                placeholderLabel="Class"
                type="number"
                onChange={this.inputChange}
                value={stu_class.value}
                error={stu_class.error}
              />
            </li>
          </ul>
        </Modal>
      </>
    );
  }
}

export default withRouter(TopNav);

TopNav.PropType = {
  className: PropType.string,
};
