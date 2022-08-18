const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

chai.use(chaiAsPromised);

describe("Testa a camada Products Controller", () => {
  beforeEach(() => {
    sinon.restore;
  });

  const res = {};
  const req = {};
  const data = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  const fakeRegister = {
    id: 4,
    name: "Jeeey",
  };

  it("Espera que ao chamar getAll retorne o codigo 200 e os produtos", async () => {
    sinon.stub(productsService, "getAll").resolves({ code: 200, data });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(data);

    await productsController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(data)).to.be.deep.eq(true);
  });
  it("Espera que ao chamar getOne retorne o codigo 200 e o produto", async () => {
    sinon
      .stub(productsService, "getOne")
      .resolves({ code: 200, data: fakeOneProduct });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeOneProduct);
    req.params = sinon.stub().returns(1);

    await productsController.getOne(req, res);

    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(fakeOneProduct)).to.be.deep.eq(true);
  });
  it("Espera que ao chamar registerProduct retorne o codigo 201 e o produto com ID", async () => {
    sinon
      .stub(productsService, "registerProduct")
      .resolves({ code: 201, data: fakeRegister });
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeRegister);
    req.body = sinon.stub().returns({ name: "Jeeey" });

    await productsController.registerProduct(req, res);

    expect(res.status.calledWith(201)).to.be.eq(true);
    expect(res.json.calledWith(fakeRegister)).to.be.deep.eq(true);
  });
  it("Espera que ao chamar productsIncludeTerm retorne o codigo 200 e o produto", async () => {
    sinon.stub(productsService, "productsIncludeTerm").resolves(fakeOneProduct);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeOneProduct);
    req.query = sinon.stub().returns("martelo");

    await productsController.productsIncludeTerm(req, res);

    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(fakeOneProduct)).to.be.deep.eq(true);
  });
  it("Espera que ao chamar updateProduct retorne o codigo 200 e o produto atualizado com novo nome", async () => {
    const fakeProductUpdated = { id: 1, name: "machado" };

    sinon.stub(productsService, "updateProduct").resolves(fakeProductUpdated);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    req.body = sinon.stub().returns("machado");
    req.params = sinon.stub().returns(1);

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(fakeProductUpdated)).to.be.deep.eq(true);
  });
  it("Espera que ao chamar deleteProduct retorne apenas o codigo 204", async () => {
    sinon.stub(productsService, "deleteProduct").resolves();
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();

    await productsController.deleteProduct(req, res);

    expect(res.status.calledWith(204)).to.be.eq(true);
  });
});
