const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe("Testa a camada Product Model", () => {
  beforeEach(sinon.restore);
  const fakeProductsAll = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  // it("Testa a chamada para registerProduct", async () => {
  //   const fakeRegister = {
  //     id: 5,
  //     name: "teste",
  //   };

  //   sinon.stub(connection, "execute").resolves([[fakeRegister]]);

  //   const callRegisterProduct = await productsModel.registerProduct("teste");

  //   expect(callRegisterProduct).to.be.deep.eq(fakeRegister);
  // });

  describe("Testa a chamada para todos os produtos", () => {
    it("Tenha as chaves necessarias em /products", async () => {
      sinon.stub(connection, "execute").resolves([fakeProductsAll]);
      const callProductsAll = await productsModel.getAll();

      expect(callProductsAll[0]).to.be.keys("id", "name");
    });

    it("Tenha todos os produtos em /products", async () => {
      sinon.stub(connection, "execute").resolves([fakeProductsAll]);
      const callProductsAll = await productsModel.getAll();

      expect(callProductsAll).to.be.eq(fakeProductsAll);
    });
  });

  describe("Testa a chamada para apenas um produto", () => {
    it("Retorna apenas um objeto com as chaves necessarias", async () => {
      sinon.stub(connection, "execute").resolves([[fakeOneProduct]]);

      const callProductsOne = await productsModel.getOne("1");

      expect(callProductsOne).to.be.keys("id", "name");
    });
    it("Retorna apenas um produto", async () => {
      sinon.stub(connection, "execute").resolves([[fakeOneProduct]]);
      const callProductsOne = await productsModel.getOne("1");

      expect(callProductsOne).to.be.eq(fakeOneProduct);
    });
  });
});
