import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css'],
})
export class ProductListsComponent implements OnInit {
  products?: Product[];
  currentCategoryById: number = 1;
  previouseCategoryId: number = 1;
  searchMode?: boolean = false;

  sizeUpdatesize?: number = 5;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previouseKeyword?: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    let keyword = 'keyword';
    const theKeyword: string = this.route.snapshot.params[keyword];

    if (this.previouseKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previouseKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    let id = 'id';
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryById = this.route.snapshot.params[id];
    } else {
      this.currentCategoryById = 1;
    }

    if (this.previouseCategoryId != this.currentCategoryById) {
      this.thePageNumber = 1;
    }

    this.previouseCategoryId = this.currentCategoryById;

    console.log(
      `currentCategoryId=${this.currentCategoryById}, thePageNumber=${this.thePageNumber}`
    );

    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryById
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: {
      _embedded: { products: Product[] | undefined };
      page: { number: number; size: number; totalElements: number };
    }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(e: any) {
    this.thePageSize = e.target.value;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
