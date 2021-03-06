import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../shared/models/product.model';
import {CartModel} from '../../shared/models/cart.model';
import {CartService} from '../../shared/services/cart.service';
import {AuthorizationService} from '../../shared/services/authorization.service';
import {EmployeeModel} from '../../shared/models/employee.model';
import {number} from 'ng2-validation/dist/number';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: ProductModel;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  cartModel: CartModel = new CartModel();

  constructor(private cartService: CartService) { }


  addToCart(product: ProductModel) {

    let cardModel = this.cartService.getAuthenticatorCart();
    if (!cardModel.id) {

      this.cartModel.id = Math.random();
      this.cartModel.products = [];
      this.cartModel.products.push(product);
      product.quantity = 1;


      this.cartService.storeAuthorizationCart(this.cartModel);
      this.cartModel = this.cartService.getAuthenticatorCart();

    } else {
      this.cartModel = this.cartService.getAuthenticatorCart();

      product.quantity = 1;

      if (this.cartModel.products.some(x => x.id === product.id)) {
        console.log(this.cartModel.products.some(x => x.id === product.id));
        console.log(this.cartModel.products.find(x => x.id === product.id));

        let model: ProductModel = <ProductModel>this.cartModel.products.find(x => x.id === product.id);
        model.quantity = model.quantity + 1;
        console.log('updated model : ' + model);
      } else {
        this.cartModel.products.push(this.product);
      }

      this.cartService.storeAuthorizationCart(this.cartModel);
    }
  }

  addProduct() {

  }

  UpdateQuantity() {

  }

  getCartId(): number {
    let model = this.cartService.getAuthenticatorCart();
    if (!model.id) {
      return model.id;
    }

    return model.id = Math.random() ? model.id : new CartModel().id;
  }


  getQuantity() {
    if (!this.cartModel) {
      return 0;
    }

    this.cartModel.products = [];

    let item = this.cartModel.products[this.product.id];
    return item ? item.quantity : 0;
  }
}
