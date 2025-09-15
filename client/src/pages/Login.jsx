import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Card,
  Checkbox,
} from "antd";
import { FacebookFilled, TwitterSquareFilled } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";
import { AiOutlineGoogle } from "react-icons/ai";

import { useLogin } from "../hook/useLogin";

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useLogin();

  const onFinish = (values) => {
    login(values);
  };
  

  return (
    <Row justify="center" align="middle" className="min-h-screen ">
      <Col
        xs={0}
        md={12}
        className="hidden md:flex flex-col content-center items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex-grow pb-5 flex items-center justify-center">
          <img
            src="/image/signin-image.jpg"
            alt="login illustration"
            className="max-w-sm w-full h-auto object-contain"
          />
        </div>

        <Text className="hidden md:block text-center mb-6">
        <Link to="/signup" className="text-gray-800 hover:underline">
          Create an account
        </Link>
        </Text>
      </Col>

      <Col xs={24} md={12} className="p-8 flex items-center justify-center">
        <Card
          className="w-full max-w-md shadow-lg rounded-2xl"
          variant="borderless"
          styles={{ body: { padding: "2rem" } }}
        >
          <Title level={2} className="text-center mb-6">
            Sign In
          </Title>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Your Name"
              name="username"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                prefix={<FaUser className="text-gray-400" />}
                placeholder="Your name"
                variant="underlined"
                className="border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-blue-500"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<MdLock className="text-gray-400" />}
                placeholder="Password"
                variant="underlined"
                className="border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-blue-500"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="rounded-md bg-blue-600 hover:bg-blue-700"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div className="flex items-center justify-center gap-4 mt-4 text-2xl">
            <Text className="text-gray-600 text-base">Or login with</Text>
            <FacebookFilled
              style={{ color: "#1877F2" }}
              className="cursor-pointer hover:opacity-80"
            />
            <TwitterSquareFilled
              style={{ color: "#1DA1F2" }}
              className="cursor-pointer hover:opacity-80"
            />
            <AiOutlineGoogle
              style={{
                color: "#ffffff",
                background: "#DB4437",
                borderRadius: "50%",
              }}
              className="cursor-pointer hover:opacity-80 p-1"
            />
          </div>

          <Text className="block md:hidden text-center mt-6">
          <Link to="/signup" className="text-gray-800 hover:underline">
          Create an account
        </Link>
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
