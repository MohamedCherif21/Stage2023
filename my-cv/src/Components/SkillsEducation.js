import { Button, DatePicker, Form, Input, Progress } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function SkillsEducation() {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };
  return (
    <div>
      <h5>Education</h5>
      <hr />
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Instituion",
                        },
                      ]}
                    >
                      <Input placeholder="Instituion" />
                    </Form.Item>
                  </div>
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing degree",
                        },
                      ]}
                    >
                      <Input placeholder="Degree" />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item {...restField} name={[name, "dateRange"]}>
                      <RangePicker />
                    </Form.Item>
                  </div>
                  <div className="col-md-10">
                    <Form.Item
                      {...restField}
                      name={[name, "Description"]} // Assurez-vous que c'est le bon nom de champ
                      rules={[
                        {
                          required: true,
                          message: "Missing Description",
                        },
                      ]}
                    >
                      <TextArea placeholder="Description" />
                    </Form.Item>
                  </div>
                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 25, color: "red" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </>
              ))}
            </div>
            <Form.Item>
              <div className="col-md-10">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add one more Education
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form.List>

      <h5>Skills</h5>
      <hr />
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "skill"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Skill",
                        },
                      ]}
                    >
                      <Input placeholder="Skill" />
                    </Form.Item>
                  </div>
                  <div
                    className="col-md-4"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing degree",
                        },
                      ]}
                    >
                      <Input placeholder="degree" />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <MinusCircleOutlined
                      style={{ fontSize: 25, color: "red" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                  <ul></ul>
                </>
              ))}
            </div>
            <Form.Item>
              <div className="col-md-10">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add one more Skill
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
}

export default SkillsEducation;
