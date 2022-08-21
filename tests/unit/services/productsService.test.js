const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const ProductsService = require("../../../services/productsService");
const ProductsModel = require("../../../models/productsModel");
const { NotFoundError } = require("../../../errors/NotFoundError");
const { ServerError } = require("../../../errors/ServerError");

chai.use(chaiAsPromised);

describe("Testa a camada Products Service", () => {
  beforeEach(sinon.restore);

  const fakeProductsAll = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  it("Verifica que ao chamar registerProduct retorna o codigo 201 e o produto ", async () => {
    sinon.stub(ProductsModel, "registerProduct").resolves(fakeOneProduct);

    return expect(
      ProductsService.registerProduct("Martelo de Thor")
    ).to.be.eventually.deep.eq({
      code: 201,
      data: fakeOneProduct,
    });
  });

  it("Verifica que ao chamar getAll retorna o codigo 200 e os produtos", async () => {
    sinon.stub(ProductsModel, "getAll").resolves(fakeProductsAll);

    return expect(ProductsService.getAll()).to.be.eventually.deep.eq({
      code: 200,
      data: fakeProductsAll,
    });
  });

  it("Verifica que ao chamar getOne retorna o codigo 200 e o produto", async () => {
    sinon.stub(ProductsModel, "getOne").resolves(fakeOneProduct);

    return expect(ProductsService.getOne("1")).to.be.eventually.deep.eq({
      code: 200,
      data: fakeOneProduct,
    });
  });

  it("Verifica que ao chamar productsIncludeTerm retorna um array com os produtos que possuem o termo", async () => {
    sinon.stub(ProductsModel, "productsIncludeTerm").resolves([fakeOneProduct]);

    return expect(
      ProductsService.productsIncludeTerm("martelo")
    ).to.be.deep.eventually.eq([fakeOneProduct]);
  });

  it("Verifica que ao chamar productsIncludeTerm sem termo retorna um array com todos os produtos", async () => {
    sinon.stub(ProductsModel, "productsIncludeTerm").resolves([]);
    sinon.stub(ProductsModel, "getAll").resolves(fakeProductsAll);

    await ProductsService.productsIncludeTerm("zzz");

    expect(ProductsModel.getAll.calledWith()).to.be.eq(true);
  });

  it("Verifica que ao chamar updateProduct retorna um objeto com o produto atualizado", async () => {
    const fakeProductUpdated = {
      id: 1,
      name: "machado",
    };
    sinon.stub(ProductsService, "checkProductExists").resolves();
    sinon.stub(ProductsModel, "updateProduct").resolves(fakeProductUpdated);

    return expect(ProductsService.updateProduct("machado", 1))
      .to.be.deep.eventually.eq(fakeProductUpdated)
      .and.include({ name: "machado" });
  });

  it("Verifica que ao chamar deleteProduct não tem retorno", async () => {
    sinon.stub(ProductsService, "checkProductExists").resolves();
    sinon.stub(ProductsModel, "deleteProduct").resolves();

    return expect(ProductsService.deleteProduct(1)).to.be.deep.eventually.eq(
      undefined
    );
  });

  it("Verifica que ao chamar deleteProduct verifica se o id existe", async () => {
    sinon.stub(ProductsService, "checkProductExists").resolves();
    sinon.stub(ProductsModel, "deleteProduct").resolves();

    return expect(ProductsService.deleteProduct(1)).to.be.deep.eventually.eq(
      undefined
    );
  });

  describe("Testa tratamento de erros em Products Service", () => {
    it("Verifica que getAll retorna um erro caso não consiga capturar todos os produtos", async () => {
      sinon.stub(ProductsModel, "getAll").resolves(null);
      return expect(ProductsService.getAll())
        .to.eventually.rejectedWith("Product not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });
    it("Verifica que getOne retorna um erro caso não consiga capturar um produto", async () => {
      sinon.stub(ProductsModel, "getOne").resolves(null);
      return expect(ProductsService.getOne())
        .to.eventually.rejectedWith("Product not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });
    it("Verifica que registerProduct retorna um erro caso não consiga registrar o produto", async () => {
      sinon.stub(ProductsModel, "registerProduct").resolves(null);
      return expect(ProductsService.registerProduct("teste"))
        .to.eventually.rejectedWith("Problema ao cadastrar produto")
        .and.be.an.instanceOf(ServerError)
        .and.have.property("code", 500);
    });
    it("Verifica que checkProductExists retorna um erro caso não consiga encontrar o produto", async () => {
      sinon.stub(ProductsModel, "checkProductExists").resolves({ exists: 0 });
      return expect(ProductsService.checkProductExists(5))
        .to.eventually.rejectedWith("Product not found")
        .and.be.an.instanceOf(NotFoundError)
        .and.have.property("code", 404);
    });
    it("Verifica que updateProduct retorna um erro caso não consiga atualizar um produto", async () => {
      sinon.stub(ProductsService, "checkProductExists").resolves();
      sinon.stub(ProductsModel, "updateProduct").resolves();

      return expect(ProductsService.updateProduct("teste", 1))
        .to.eventually.rejectedWith("Problema ao atualizar o produto")
        .and.be.an.instanceOf(ServerError)
        .and.have.property("code", 500);
    });
  });
});
