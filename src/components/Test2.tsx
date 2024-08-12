import React, { useState, useEffect } from "react";
//eslint-disable-next-line
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line
import { Table, Button, Form, Input, Select, DatePicker, Radio, Space, InputNumber, Checkbox } from "antd";
import type { TableProps } from "antd";
// eslint-disable-next-line
import { selectPeople, addPerson, editPerson, deletePerson } from "../features/personSlice";
import { Person } from '../types/person';
import "./Test2.scss";

const Test2 = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [citizenValue, setCitizenValue] = useState(["", "", "", "", ""]);
  const [SelectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const dispatch = useDispatch();
  const people: Person[] = useSelector(selectPeople);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexInput: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    const input = document.querySelectorAll(".InputCitizen") as NodeListOf<
      HTMLInputElement
    >;
    const newCitizenValue = [...citizenValue];
    newCitizenValue[indexInput] = value;

    // อัปเดตค่าในฟอร์ม
    let citizenID = newCitizenValue.join("");
    form.setFieldsValue({ citizenID });

    // ตรวจสอบการโฟกัส
    if (
      indexInput < citizenValue.length - 1 &&
      value.length === e.target.maxLength
    ) {
      input[indexInput + 1].focus();
    }
    if (value.length === 0 && indexInput > 0) {
      input[indexInput - 1].focus();
    }

    // ปรับปรุงสถานะช่องที่ต้องการ disable
    setCitizenValue(newCitizenValue);
  };

  const getInputDisabledStatus = (index: number) => {
    if (index > 0 && citizenValue[index - 1].length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = (values: any) => {
    const person: Person = {
      id: Date.now(),
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
      Nationality: values.Nationality,
      citizenId: values.citizenId,
      gender: values.gender,
      phoneCountryCode: values.phoneCountryCode,
      phoneNumber: values.phoneNumber,
      passportNumber: values.passportNumber,
      expectedSalary: parseInt(values.expectedSalary),
    };
    if (mode === "edit") {
      dispatch(editPerson(person));
    } else {
      dispatch(addPerson(person));
    }
  };

  const handleSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const selectAll = (e: any) => {
    console.log(e.target.checked);
    const value = e.target.checked;
    if (value) {
      const rowKeys = people.map((person) => person.id);
      setSelectedRowKeys(rowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleDeleteSelected = () => {
    SelectedRowKeys.forEach((id) => {
      dispatch(deletePerson(id));
    });

    setSelectedRowKeys([]);
  };

  const changeMode = (mode: "add" | "edit", record: Person) => () => {
    console.log(record);
    setMode(mode);
    form.setFieldsValue({
      title: record.title,
      firstName: record.firstName,
      lastName: record.lastName,
      birthDate: record.birthDate,
      Nationality: record.Nationality,
      citizenId: record.citizenId,
      gender: record.gender,
      phoneCountryCode: record.phoneCountryCode,
      phoneNumber: record.phoneNumber,
      passportNumber: record.passportNumber,
      expectedSalary: record.expectedSalary,
    });

  }

  const tableProps: TableProps<Person> = {
    pagination: { position: ["topRight"] },
    rowSelection: {
      type: "checkbox",
      onChange: (selectedRowKeys, selectedRows) => {
        handleSelectChange(selectedRowKeys);
      },
    },
    columns: [
      {
        title: t("Table.Name"),
        render: (record: Person) => `${record.firstName} ${record.lastName}`,
        key: "name",
      },
      {
        title: t("Table.Gender"),
        render: (record: Person) => t(`Gender.${record.gender}`),
        key: 'gender'
      },
      {
        title: t("Table.Phone"),
        render: (record: Person) => `+${record.phoneCountryCode} ${record.phoneNumber}`,
        key: 'phone'
      },
      {
        title: t("Table.Nationality"),
        render: (record: Person) => t(`Nationality.${record.Nationality}`),
        key: 'nationality'
      },
      {
        title: t("Menege"),
        render: (record: Person) => (
          <Space>
            <Button type="primary" onClick={changeMode("edit", record)}>
              {t("Form.Menege.EDIT")}
            </Button>
            <Button type="primary" danger onClick={() => dispatch(deletePerson(record.id))}>
              {t("Form.Menege.DELETE")}
            </Button>
          </Space>
        ),
      },
    ],
    dataSource: people,
    rowKey: "id",
  };

  useEffect(() => {
    form.resetFields();
  }, [people]);

  return (
    <div className="Test2">
      <div className="FormData">
        <Form
          form={form}
          name="addPerson"
          layout="horizontal"
          initialValues={{ modifier: "public" }}
          style={{ maxWidth: "none" }}
          onFinish={onFinish}
          className="row"
        >
          <Form.Item
            label={t("Form.Title")}
            name="title"
            rules={[{ required: true }]}
            className="FormItem col-2"
          >
            <Select
              placeholder={t("Form.Title")}
              allowClear
              className="SelectTitle"
            >
              <Select.Option value="Mr.">{t("Form.Mr")}</Select.Option>
              <Select.Option value="Miss">{t("Form.Miss")}</Select.Option>
              <Select.Option value="Mrs.">{t("Form.Mrs")}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Form.FirstName")}
            name="firstName"
            rules={[{ required: true }]}
            className="FormItem col-5"
          >
            <Input className="Inpust" />
          </Form.Item>
          <Form.Item
            label={t("Form.LastName")}
            name="lastName"
            rules={[
              {
                required: true,
                message: t("Please input your last last name!"),
              },
            ]}
            className="FormItem col-5"
          >
            <Input className="Input" />
          </Form.Item>
          <Form.Item
            label={t("Form.BirthDay")}
            name="birthDate"
            rules={[{ required: true }]}
            className="FormItem col-3"
          >
            <DatePicker
              placeholder={t("Form.MM/DD/YYYY")}
              format={{
                format: "MM/DD/YYYY",
              }}
              className="DatePicker"
            />
          </Form.Item>
          <Form.Item
            label={t("Form.Nationality")}
            name="Nationality"
            rules={[{ required: true }]}
            className="FormItem col-9"
          >
            <Select
              placeholder={t("Form.Nationality")}
              allowClear
              className="SelectNationality"
            >
              <Select.Option value="TH">{t("Nationality.TH")}</Select.Option>
              <Select.Option value="FR">{t("Nationality.FR")}</Select.Option>
              <Select.Option value="USA">{t("Nationality.USA")}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={t("Form.CitizenID")}
            name="citizenID"
            rules={[{ required: true }]}
            className="FormItem col-12"
          >
            <div className="citizen-id-inputs">
              {citizenValue.map((value, index) => (
                <Input
                  key={index}
                  className="InputCitizen"
                  disabled={getInputDisabledStatus(index)}
                  style={{
                    width:
                      index === 0
                        ? "7.69%"
                        : index === 1
                          ? "31.84%"
                          : index === 2
                            ? "39.8%"
                            : index === 3
                              ? "15.92%"
                              : "7.69%",
                    backgroundColor: getInputDisabledStatus(index)
                      ? "#f0f0f0"
                      : "#fff",
                  }}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength={
                    index === 0
                      ? 1
                      : index === 1
                        ? 4
                        : index === 2
                          ? 5
                          : index === 3
                            ? 2
                            : 1
                  }
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label={t("Form.Gender")}
            name="gender"
            rules={[{ required: true }]}
            className="FormItem col-12"
          >
            <Radio.Group>
              <Radio value="Male">{t("Gender.Male")}</Radio>
              <Radio value="Female">{t("Gender.Female")}</Radio>
              <Radio value="Unsex">{t("Gender.Unsex")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t("Form.Phone")}
            name="phoneCountryCode"
            rules={[{ required: true }]}
            className="FormItem col-3"
          >
            <Select className="w-100">
              <Select.Option value="66">+ 66</Select.Option>
              <Select.Option value="1">+ 1</Select.Option>
              <Select.Option value="33">+ 33</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true }]}
            className="FormItem col-6"
          >
            <div className="d-flex align-items-center">
              <Space
                style={{
                  marginRight: '5px',
                }}
              >
                -
              </Space>
              <Input maxLength={10} className="Inpust" />
            </div>
          </Form.Item>
          <Form.Item
            label={t("Form.PassportNumber")}
            name="passportNumber"
            rules={[{ required: true }]}
            className="FormItem col-7"
          >
            <Input className="Inpust" />
          </Form.Item>
          <Form.Item
            label={t("Form.ExpectedSalary")}
            name="expectedSalary"
            rules={[{ required: true }]}
            className="FormItem col-7"
          >
            <InputNumber className="InputNumber" />
          </Form.Item>


          <Form.Item
            className="FormItem col-5"
            style={{ textAlign: "right" }}
          >
            <Button htmlType="button" onClick={onReset}
              style={{ marginRight: 8 }}
            >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="TableData">
        <div className="d-flex align-items-center">
          <Checkbox
            checked={SelectedRowKeys.length === people.length}
            onChange={selectAll}
          >
            {t("Table.SelectAll")}
          </Checkbox>
          <Button onClick={handleDeleteSelected}>
            {t("Form.Menege.DELETE")}
          </Button>
        </div>
        <Table
          {...tableProps}
          pagination={{ position: ["topRight"] }}
          dataSource={people}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Test2;
