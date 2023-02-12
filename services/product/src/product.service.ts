import { Injectable, OnModuleInit, INestApplication , OnModuleDestroy } from '@nestjs/common';
import { connect ,Bucket, Cluster, Scope, Collection, PasswordAuthenticator, DocumentExistsError, IndexExistsError, QueryResult } from "couchbase"
import { Product } from "@libs/entities"


@Injectable()
export class ProductService
  implements OnModuleInit, OnModuleDestroy
{
  private cluster: Cluster;
  private bucket: Bucket;
  private scope: Scope;
  private collection: Collection;

  constructor() { }

  async onModuleInit() {

    const credentials = new PasswordAuthenticator("administrator", "administrator")    
    try {

      this.cluster = await connect("couchbase://localhost", credentials );
      this.bucket = this.cluster.bucket("ecommerce");
      this.scope = this.bucket.scope("_default");
      this.collection = this.scope.collection("products");

     
    } catch (error) {

      if (error instanceof IndexExistsError)   
        console.info('Index Creation: Indexes Already Exists')
      
      console.error(error);
     
    }


    const q: QueryResult = await this.cluster.query(`
      SELECT *
      FROM \`ecommerce\`._default.products
    `)

    console.log(q.rows)

    const product = new Product(q.rows[0])
    
  }

  async onModuleDestroy() {
    //await this.cluster.close()
  }

  async ProductById(id: string): Promise<Product> {
   
    try {
      return new Product(await this.collection.get(id) as unknown as Product);
    } catch (error) {
      
      if (error instanceof DocumentExistsError)  console.log("document not fount error on id:%s", id)
      return {} as Product


    }
  }


  async ProductByName(data: { name: string }) {

   
  }


}
