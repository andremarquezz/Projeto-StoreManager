const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const SalesService = require("../../../services/salesService");
const SalesController = require("../../../controllers/salesController");

chai.use(chaiAsPromised);

describe("Testa a camada Sales Controller", () => {
  beforeEach(() => {
    sinon.restore;
  });
  const res = {};
  const req = {};

  const fakeAllProducts = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProducts = { id: 1, name: "Martelo de Thor" };

  const fakeProductsSold = {
    id: 1,
    itemsSold: [{ id: 3, name: "Escudo do Capitão América" }],
  };

  const fakeProductsUpdated = {
    saleId: 1,
    itemsUpdated: [{ id: 1, name: "machado de Thor" }],
  };

  it("Verifica que handleSaleProducts retorna um produto vendido com ID", async () => {
    sinon.stub(SalesService, "handleSaleProducts").resolves(fakeProductsSold);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeProductsSold);

    await SalesController.handleSaleProducts(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(fakeProductsSold)).to.be.deep.true;
  });

  it("Verifica que getAll retorna o codigo 200 e os produtos", async () => {
    sinon.stub(SalesService, "getAll").resolves(fakeAllProducts);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeAllProducts);

    await SalesController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(fakeAllProducts)).to.be.deep.true;
  });

  it("Verifica que getOne retorna o codigo 200 e um unico produto", async () => {
    sinon.stub(SalesService, "getOne").resolves([fakeOneProducts]);
    req.params = sinon.stub().returns(1);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns([fakeOneProducts]);

    await SalesController.getOne(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith([fakeOneProducts])).to.be.deep.true;
  });

  it("Verifica que updateProduct retorna o codigo 200 e o produto atualizado com novo nome", async () => {
    sinon.stub(SalesService, "updateProduct").resolves(fakeProductsUpdated);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    req.body = sinon.stub().returns("machado");
    req.params = sinon.stub().returns(1);

    await SalesController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(fakeProductsUpdated)).to.be.deep.true;
  });
  it("Verifica que deleteProduct retorna apenas o codigo 204", async () => {
    sinon.stub(SalesService, "deleteProduct").resolves();
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();

    await SalesController.deleteProduct(req, res);

    expect(res.status.calledWith(204)).to.be.true;
  });
});
