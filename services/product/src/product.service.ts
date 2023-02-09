import { PriceUnit, Product } from '@libs/entities';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, PasswordAuthenticator, Cluster, Collection, Scope, QueryStringSearchQuery } from "couchbase"
import { createId } from "@paralleldrive/cuid2"
@Injectable()
export class ProductService implements OnModuleInit, OnModuleDestroy {


  private collection: Collection;
  private cluster: Cluster
  private scope: Scope
  /**
   * @description connect couchbase cluster and select product collection
   */
  async onModuleInit() {
    try {
      this.cluster = await connect("couchbase://localhost", new PasswordAuthenticator("administrator", "administrator"))
      
      console.log("connected to cluster")
    } catch (error) {
       
      console.log("unable to connect cluster")
    }

   
    this.scope = this.cluster.bucket("ecommerce").scope("_default")
    this.collection = this.scope.collection("Products")
  }

  async onModuleDestroy() {

   // await this.cluster.close()
  }
  

  
  async FindById(data: { id: string }): Promise<{ data: Product }> {
    
    
    const result: Product = await this.collection.get("iswc9qh1dm3zcwunzxqq0ikn").then((result) => result.content).catch(e => {
      
      console.log(e)
      return {}
    })

    console.log(result)
    return {
      data: result
    }
 
  }


  async Create(data: {}) {

    const product = new Product({
      id: createId(),
      brand: "Apple",
      name: "IPhone x",
      specs: []
    })

 
    const query = "SELECT id FROM ecommerce._default.Products;"


    try {
      const isExist = await this.cluster.query(query, { adhoc: false})
    
      console.log(isExist.rows)
    } catch (error) {
      console.error(error)
    }
    //const created = await this.collection.upsert(product.id, product)
    
    //console.log(created)
    return {}

  }
}
