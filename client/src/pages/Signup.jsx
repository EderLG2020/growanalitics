import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Typography,
    Card,
    Select,
    message,
  } from "antd";
  import { FaUser } from "react-icons/fa";
  import { MdLock, MdEmail } from "react-icons/md";
  import { useNavigate } from "react-router-dom";
  import { createUsuario } from "../api/users"; 
  
  const { Title, Text } = Typography;
  
  export default function SignUp() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
  
    const onFinish = async (values) => {
      try {
        const payload = {
          usuario: values.usuario,
          correo: values.correo,
          nombre: values.nombre,
          apell_paterno: values.apell_paterno,
          apell_materno: values.apell_materno,
          contrasena: values.contrasena,
          tipo_usuario: values.tipo_usuario,
        };
  
        await createUsuario(payload);
        message.success("Usuario creado correctamente");
        navigate("/"); // 👈 vuelve al login
      } catch (error) {
        console.error("Error creando usuario:", error);
        message.error("No se pudo crear el usuario");
      }
    };
  
    return (
      <Row justify="center" align="middle" className="min-h-screen">
        {/* Imagen lateral */}
        <Col
          xs={0}
          md={12}
          className="hidden md:flex flex-col content-center items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="flex-grow pb-5 flex items-center justify-center">
            <img
              src="/image/signin-image.jpg"
              alt="signup illustration"
              className="max-w-sm w-full h-auto object-contain"
            />
          </div>
  
          <Text className="hidden md:block text-center mb-6">
            <a href="/" className="text-gray-800 hover:underline">
              Already have an account? Log in
            </a>
          </Text>
        </Col>
  
        {/* Formulario */}
        <Col xs={24} md={12} className="p-8 flex items-center justify-center">
          <Card
            className="w-full max-w-md shadow-lg rounded-2xl"
            variant="borderless"
            styles={{ body: { padding: "2rem" } }}
          >
            <Title level={2} className="text-center mb-6">
              Sign Up
            </Title>
  
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Usuario"
                name="usuario"
                rules={[{ required: true, message: "Ingrese un usuario" }]}
              >
                <Input
                  prefix={<FaUser className="text-gray-400" />}
                  placeholder="Usuario"
                  className="border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-blue-500"
                />
              </Form.Item>
  
              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  { required: true, message: "Ingrese un correo" },
                  { type: "email", message: "Correo inválido" },
                ]}
              >
                <Input
                  prefix={<MdEmail className="text-gray-400" />}
                  placeholder="Correo electrónico"
                  className="border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-blue-500"
                />
              </Form.Item>
  
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: "Ingrese su nombre" }]}
              >
                <Input placeholder="Nombre" />
              </Form.Item>
  
              <Form.Item
                label="Apellido Paterno"
                name="apell_paterno"
                rules={[{ required: true, message: "Ingrese apellido paterno" }]}
              >
                <Input placeholder="Apellido Paterno" />
              </Form.Item>
  
              <Form.Item
                label="Apellido Materno"
                name="apell_materno"
                rules={[{ required: true, message: "Ingrese apellido materno" }]}
              >
                <Input placeholder="Apellido Materno" />
              </Form.Item>
  
              <Form.Item
                label="Contraseña"
                name="contrasena"
                rules={[{ required: true, message: "Ingrese una contraseña" }]}
              >
                <Input.Password
                  prefix={<MdLock className="text-gray-400" />}
                  placeholder="Contraseña"
                  className="border-0 border-b border-gray-300 rounded-none shadow-none focus:ring-0 focus:border-blue-500"
                />
              </Form.Item>
  
              <Form.Item
                label="Tipo de Usuario"
                name="tipo_usuario"
                rules={[{ required: true, message: "Seleccione un tipo" }]}
              >
                <Select
                  placeholder="Seleccione tipo de usuario"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "editor", label: "Editor" },
                    { value: "viewer", label: "Viewer" },
                  ]}
                />
              </Form.Item>
  
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="rounded-md bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Crear Cuenta
                </Button>
              </Form.Item>
            </Form>
  
            <Text className="block md:hidden text-center mt-6">
              <a href="/" className="text-gray-800 hover:underline">
                Already have an account? Log in
              </a>
            </Text>
          </Card>
        </Col>
      </Row>
    );
  }
  