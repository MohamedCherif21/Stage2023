import { Button, DatePicker, Form, Input, Progress } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function SkillsEducation() {
  return (
    <div>
        
      <h5>Experience</h5>
      <hr />
      <Form.List name="employment">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <Form.Item
                        {...restField}
                        name={[name, "job"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Job Tittle",
                          },
                        ]}
                      >
                        <Input placeholder="Job Tittle" />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        {...restField}
                        name={[name, "Employer"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing Employer",
                          },
                        ]}
                      >
                        <Input placeholder="Employer" />
                      </Form.Item>
                    </div>
                    <div className="row"></div>
                    <div className="col-md-4">
                    <Form.Item {...restField} name={[name, "dateRangeemployment"]}>
                      <RangePicker />
                    </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        {...restField}
                        name={[name, "city"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing city",
                          },
                        ]}
                      >
                        <Input placeholder="City" />
                      </Form.Item>
                    </div>

                    <div className="col-md-2">
                      <MinusCircleOutlined
                        style={{ fontSize: 25, color: "red" }}
                        onClick={() => remove(name)}
                      />
                    </div>
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
                  Add one more Empolyment
                </Button>
              </div>
            </Form.Item>
            
          </>
        )}
      </Form.List>

      <h5>Projects</h5>
      <hr />
      <Form.List name="Project">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "Project"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Project Tittle",
                        },
                      ]}
                    >
                      <Input placeholder="Project Tittle" />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                  <Form.Item {...restField} name={[name, "dateRangeexperience"]}>
                      <RangePicker />
                    </Form.Item>
                  </div>
                  <Form.Item
                      {...restField}
                      name={[name, "Descriptionproj"]} // Assurez-vous que c'est le bon nom de champ
                      rules={[
                        {
                          required: true,
                          message: "Missing Description",
                        },
                      ]}
                    >
                      <TextArea placeholder="Description" />
                    </Form.Item>
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
                    Add one more Project
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
