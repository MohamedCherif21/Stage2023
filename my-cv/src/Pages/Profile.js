import React, { useState } from "react";
import DefaultLayout from "../Components/DefaultLayout";
import { Button, Form, Spin, Tabs, message } from "antd";
import PersonalInfo from "../Components/PersonalInfo";
import SkillsEducation from "../Components/SkillsEducation";
import axios from "axios";
import ExperienceProjects from "../Components/ExperienceProjects";

function Profile() {
  const [Loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("my-cv-users"));
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await axios.post("api/user/update", {
        ...values,
        _id: user.data._id,
      });
      localStorage.setItem("my-cv-users", JSON.stringify(result.data));
      setLoading(false);
      message.success("profile updated successefuly");
      console.log(user.data._id);
    } catch (error) {
      setLoading(false);
      message.error("update failedd");
    }
  };
  return (
    <DefaultLayout>
      {Loading && <Spin size="large" />}
      <h4><b>Update profile</b></h4>
      <hr/>
      <div className="update-profile">
        <Form layout="vertical" onFinish={onFinish} initialValues={user.data}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: "Personal Info",
                key: "1",
                children: <PersonalInfo />,
              },
              {
                label: "Skills & Education",
                key: "2",
                children: <SkillsEducation />,
              },
              {
                label: "Experience / Projects",
                key: "3",
                children: <ExperienceProjects />,
              },
            ]}
          />
          <Button htmlType="submit">Submit</Button>
        </Form>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
