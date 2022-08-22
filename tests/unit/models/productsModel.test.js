const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const chaiAsPromised = require("chai-as-promised");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

chai.use(chaiAsPromised);

describe("Testa a camada Product Model", () => {
  beforeEach(sinon.restore);
  const fakeProductsAll = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  const fakeOneProduct = { id: 1, name: "Martelo de Thor" };

  it("Testa a chamada para a função registerProduct", async () => {
    const fakeRegister = {
      id: 5,
      name: "teste",
    };

    sinon.stub(connection, "execute").resolves([[fakeRegister]]);

    return expect(
      productsModel.registerProduct("teste")
    ).to.be.eventually.deep.eq(fakeRegister);
  });

  it("Verifica que possui as chaves necessarias no retorno de GetAll ", async () => {
    sinon.stub(connection, "execute").resolves([fakeProductsAll]);
    const callProductsAll = await productsModel.getAll();

    expect(callProductsAll[0]).to.be.keys("id", "name");
  });

  it("Verifica que GetAll retorna os produtos necessarias", async () => {
    sinon.stub(connection, "execute").resolves([fakeProductsAll]);
    const callProductsAll = await productsModel.getAll();

    expect(callProductsAll).to.be.eq(fakeProductsAll);
  });

  it("Verifica que getOne retorna apenas um objeto com as chaves necessarias", async () => {
    sinon.stub(connection, "execute").resolves([[fakeOneProduct]]);

    const callProductsOne = await productsModel.getOne("1");

    expect(callProductsOne).to.be.an("object");
    expect(callProductsOne).to.be.keys("id", "name");
  });

  it("Verifica que productsIncludeTerm retorna um array", async () => {
    const responseFake = [fakeOneProduct];
    sinon.stub(connection, "execute").resolves([responseFake]);

    return expect(
      productsModel.productsIncludeTerm("martelo")
    ).to.be.eventually.an("array");
  });
  it("Verifica que productsIncludeTerm retorna um produto com termo martelo", async () => {
    const responseFake = [fakeOneProduct];

    sinon.stub(connection, "execute").resolves([responseFake]);

    return expect(
      productsModel.productsIncludeTerm("martelo")
    ).to.be.eventually.deep.eq(responseFake);
  });

  it("Verifica que checkProductExists retorna um objeto exists com valor 1", async () => {
    const responseFake = { exists: 1 };

    sinon.stub(connection, "execute").resolves([[responseFake]]);

    return expect(productsModel.checkProductExists(1)).to.be.eventually.deep.eq(
      responseFake
    );
  });
  it("Verifica que updateProduct com parametros martelo e 1 retorna o produto", async () => {
   sinon.stub(connection, "execute").resolves([[fakeOneProduct]]);

   return expect(productsModel.updateProduct('martelo', 1)).to.be.eventually.deep.eq(
     fakeOneProduct
   );
  });
  it("Verifica que findUpdatedProduct encontra o produto com o ID passado", async () => {
    sinon.stub(connection, "execute").resolves([[fakeOneProduct]]);

    return expect(productsModel.findUpdatedProduct(1)).to.be.eventually.deep.eq(
      fakeOneProduct
    );
  });
   it("Verifica que deleteProduct não tem retorno", async () => {
     sinon.stub(connection, "execute").resolves();

     return expect(
       productsModel.deleteProduct(1)
     ).to.be.eventually.eq(undefined);
   });
});
