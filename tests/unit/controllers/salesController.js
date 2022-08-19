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

  const fakeData = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  it("Espera que ao chamar getAll retorne o codigo 200 e os produtos", async () => {
    sinon.stub(SalesService, "getAll").resolves(fakeData);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(fakeData);

    await SalesController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.eq(true);
    expect(res.json.calledWith(fakeData)).to.be.deep.eq(true);
  });
});
