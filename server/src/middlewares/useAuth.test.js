const authMiddleware = require("./auth");
const { verifyToken } = require("../config/jwt");

// Mock de verifyToken
jest.mock("../config/jwt", () => ({
  verifyToken: jest.fn(),
}));

describe("authMiddleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("debería devolver 401 si no hay token", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token no encontrado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("debería asignar req.user y llamar next si el token es válido", () => {
    const fakeToken = "token_valido";
    const fakeDecoded = { id: 1, usuario: "eder" };

    req.cookies.token = fakeToken;
    verifyToken.mockReturnValue(fakeDecoded);

    authMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith(fakeToken);
    expect(req.user).toEqual(fakeDecoded);
    expect(next).toHaveBeenCalled();
  });

  it("debería devolver 403 si el token es inválido", () => {
    req.cookies.token = "token_invalido";
    verifyToken.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token inválido o expirado",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
