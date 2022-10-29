import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';


@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://forphil:5B9rr3KVxugJnay9@cluster0.6gcawxv.mongodb.net/firstnestjs-project?retryWrites=true&w=majority'), CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
