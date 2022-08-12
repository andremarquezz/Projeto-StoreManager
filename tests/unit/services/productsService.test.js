const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const ProductModel = require("../../../models/productsModel");
const { CustomErrors } = require("../../../errors/CustomError");

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
      const callProductsServiceAll = await productsService.getAll();

      expect(callProductsServiceAll).to.be.eq({ code: 200, data: fakeProductsAll });
    });
  });
  describe("Testa a chamada para um unico o produto", () => {
    it("Espera que ao chamar um unico produto retorne o codigo 200 e o produto", async () => {
      sinon.stub(ProductModel, "getOne").resolves(fakeOneProduct);
      const callProductsServiceOne = await productsService.getOne('1');
      expect(callProductsServiceOne).to.be.eq({
        code: 200,
        data: fakeOneProduct
      });
    });
  });
  describe("Testa tratamento de errros", () => {
    it('Retorna um erro caso não consiga capturar todos os produtos', async () => {
      sinon.stub(ProductModel, "getAll").resolves(null);
      const callProductsServiceAll = await productsService.getAll();
      expect(callProductsServiceAll).to.throw(new CustomErrors("Product not found", 404));
    })
  });
})
