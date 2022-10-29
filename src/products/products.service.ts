import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async returnProducts() {
    const products = await this.productModel.find().exec();
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    prodId: string,
    prodTitle: string,
    prodDescription: string,
    prodPrice: number,
  ) {
    const updatedProduct = await this.findProduct(prodId);
    if(prodTitle){
        updatedProduct.title = prodTitle;
    }
    if(prodDescription){
        updatedProduct.description = prodDescription;
    }
    if(prodPrice){
        updatedProduct.price = prodPrice;
    }
    try{
        updatedProduct.save();
    }
    
    catch (error){
        return error
    }
    return null
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId})
    return result;
  }

  async findProduct(prodId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(prodId);
    } catch (error) {
      throw new NotFoundException('Could not find product');
    }
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
