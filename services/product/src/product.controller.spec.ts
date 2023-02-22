import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { connect, Collection, Cluster, PasswordAuthenticator, MutationResult, GetResult, QueryResult } from "couchbase"
import { createId } from "@paralleldrive/cuid2"
import { PriceType, Product } from '@libs/entities';

describe('AppController', () => {
  let productController: ProductController;
  let cluster: Cluster
  let collection: Collection
  let product: Product = new Product({
    createdAt: Date.now(),
    updateAt: Date.now(),
    id: createId(),
    name: "IPhone X",
    brand: "Apple",
    price: {
      type: PriceType.TRY,
      unit: 1000000,
      task: 18
    },
  })

  
  beforeEach(async () => {
    cluster = await connect("couchbase://localhost", new PasswordAuthenticator("administrator", "administrator"))
    collection = cluster.bucket("ecommerce_test").collection("products")
    const app: TestingModule = await Test.createTestingModule({
        controllers: [ProductController],
        providers: [ProductService],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });


  describe('Product', () => {
    it('should add new product', async () => {
      
      const newRecord: MutationResult = await collection.insert(product.id, product)

      expect(newRecord).toBeInstanceOf(MutationResult)
       
    })
    
    it('should retrive document by id', async () => {

      const record: GetResult = await collection.get(product.id)

      expect(record).toBeInstanceOf(GetResult)
      expect(record.content).toMatchObject(product)
    })

    it('should retrive document by name', async () => {
      
      const records = await cluster.query(`
        SELECT *
        FROM \`ecommerce_test\`._default.products
        WHERE name=$1
        ORDER BY createdAt
      `, { parameters: [product.name] })
      
      expect(records).toBeInstanceOf(QueryResult<Product[]>)
      expect(records.rows.length).toBeGreaterThan(0)
      expect((records.rows[records.rows.length - 1] ).products?.id).toEqual(product.id)
    })
  });
});
