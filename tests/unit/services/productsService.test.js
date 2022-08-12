const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
const ProductModel = require("../../../models/productsModel");

chai.use(chaiAsPromised);

describe("Testa a camada Products Service", () => {
  beforeEach(sinon.restore);
  const fakeProductsAll = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  describe("Testa a chamada para todos os produtos", () => {
    it("Espera que ao chamar todos os produtos retorne codigo 200 e produtos", async () => {
      sinon.stub(ProductModel, "getAll").resolves(fakeProductsAll);

      return expect(productsService.getAll()).to.be.eventually.deep.eq({
        code: 200,
        data: fakeProductsAll,
      });
    });
  });
  describe("Testa a chamada para um unico o produto", () => {
    it("Espera que ao chamar um unico produto retorne o codigo 200 e o produto", async () => {
      sinon.stub(ProductModel, "getOne").resolves(fakeOneProduct);
      const callProductsServiceOne = await productsService.getOne("1");
      expect(callProductsServiceOne).to.be.deep.eq({
        code: 200,
        data: fakeOneProduct,
      });
    });
  });
  describe("Testa tratamento de erros", () => {
    it("Retorna um erro caso não consiga capturar todos os produtos", async () => {
      sinon.stub(ProductModel, "getAll").resolves(null);
      return expect(productsService.getAll()).to.eventually.rejectedWith(
        Error,
        "Product not found"
      )
    });
      it("Retorna um erro caso não consiga capturar um produto", async () => {
      sinon.stub(ProductModel, "getOne").resolves(null);
      return expect(productsService.getOne()).to.eventually.rejectedWith(
        Error,
        "Product not found"
      );
    });
  });
});
