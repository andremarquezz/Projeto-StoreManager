const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const productsService = require("../../../services/productsService");
// const productsController = require("../../../controllers/productsController");

chai.use(chaiAsPromised);

describe("Testa a camada Products Controller", () => {
  beforeEach(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    sinon.restore;
  });
  const data = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  // const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  describe("Testa a chamada para todos os produtos", () => {
    it("Espera que ao chamar todos os produtos retorne o codigo 200 e produtos", async () => {
      const response = {};
      sinon.stub(productsService, "getAll").resolves({ code: 200, data });
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(data)).to.be.equal(true);

      // return expect(productsService.getAll()).to.be.eventually.keys(
      //   "code",
      //   "data"
      // );
    });
  });
});
