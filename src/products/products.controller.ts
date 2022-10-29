import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor( private productService: ProductService){}

    @Post()
    async addItems(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription : string,
        @Body('price') prodPrice: number
    ){
        const generatedId = await this.productService.insertProduct(
            prodTitle, 
            prodDescription, 
            prodPrice)
        return { id: generatedId}
    }

    @Get()
    async getItems(){
        const products = await this.productService.returnProducts()
        return {products: products};
    }

    @Get(':id')
    async getSingleItem(@Param('id') prodId){
        const product = await this.productService.getSingleProduct(prodId);
        return product;
    }

    @Patch(':id')
    async updateItem(
        @Param('id') prodId,
        @Body('title') prodTitle,
        @Body('description') prodDescription,
        @Body('price') prodPrice
        ){
        await this.productService.updateProduct(prodId, prodTitle, prodDescription, prodPrice)
        return null
    }

    @Delete(':id')
    async deleteItem(@Param('id') prodId){
        const result = await this.productService.deleteProduct(prodId)
        return result;
    }
}