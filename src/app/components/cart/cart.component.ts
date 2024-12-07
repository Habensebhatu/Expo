import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartI, ProductAddCart } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  phoneNumber = '061790373929';
  shippingCost: number = 7.65;
  cart: CartI = { items: [] };
  Products: Array<ProductAddCart> = [];
  selectedCountry: string = ''; // Initially no country selected

  countries = [
    { code: 'AT', name: 'Austria' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czechia' },
    { code: 'DK', name: 'Denmark' },
    { code: 'EE', name: 'Estonia' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'GR', name: 'Greece' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IT', name: 'Italy' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MT', name: 'Malta' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'RO', name: 'Romania' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'ES', name: 'Spain' },
    { code: 'SE', name: 'Sweden' }
  ];
  

  constructor(private cartService: CartService, private http: HttpClient, private storeService: StoreService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart: CartI) => {
      this.cart = _cart;
      this.Products = this.cart.items;
      this.calculatorShippingCost(); // Recalculate shipping cost when the cart changes
    });
  }

  // Method to open the CountryDialogComponent
  openCountryDialog() {
    // Check if a country is selected
    if (!this.selectedCountry) {
      alert("Please select a country first."); // Show an alert if no country is selected
      return;
    }
   else{
    this.onCheckout();
   }
  }

  getLastProductCategory() {
    if (this.Products && this.Products.length > 0) {
      return this.Products[this.Products.length - 1].categoryName;
    }
    return '';
  }

  getTotalQuantity(items: ProductAddCart[]): number {
    return items.reduce((prev, current) => prev + current.quantity, 0);
  }

  getTotal(items: ProductAddCart[]): number {
    return this.cartService.getTotal(items);
  }

  // Update the shipping cost based on the selected country
  calculatorShippingCost() {
    const totalWeight = this.Products.reduce((prev, current) => prev + (current.kilo * current.quantity), 0);

    switch (this.selectedCountry) {
        case 'DE': // Germany
            if (totalWeight <= 5) {
                this.shippingCost = 6;  // 1-5kg
            } else if (totalWeight <= 10) {
                this.shippingCost = 10; // 6-10kg
            } else if (totalWeight <= 30) {
                this.shippingCost = 16; // 10-30kg
            } else {
                this.shippingCost = 27.80; // Over 30kg (backend does not specify this case)
            }
            break;

        case 'NO': // Norway
            this.shippingCost = totalWeight <= 25 ? 25 : 30;
            break;

        case 'NL': // Netherlands
            this.shippingCost = totalWeight <= 25 ? 19 : 25;
            break;

        case 'AT': // Austria
            this.shippingCost = totalWeight <= 25 ? 20 : 30;
            break;

        case 'BE': // Belgium
            this.shippingCost = totalWeight <= 25 ? 18 : 28;
            break;

        case 'BG': // Bulgaria
            this.shippingCost = totalWeight <= 25 ? 22 : 32;
            break;

        case 'HR': // Croatia
            this.shippingCost = totalWeight <= 25 ? 23 : 33;
            break;

        case 'CY': // Cyprus
            this.shippingCost = totalWeight <= 25 ? 28 : 38;
            break;

        case 'CZ': // Czechia
            this.shippingCost = totalWeight <= 25 ? 18 : 28;
            break;

        case 'DK': // Denmark
            this.shippingCost = totalWeight <= 25 ? 22 : 32;
            break;

        case 'EE': // Estonia
            this.shippingCost = totalWeight <= 25 ? 21 : 31;
            break;

        case 'FI': // Finland
            this.shippingCost = totalWeight <= 25 ? 23 : 33;
            break;

        case 'FR': // France
            this.shippingCost = totalWeight <= 25 ? 18 : 28;
            break;

        case 'GR': // Greece
            this.shippingCost = totalWeight <= 25 ? 24 : 34;
            break;

        case 'HU': // Hungary
            this.shippingCost = totalWeight <= 25 ? 19 : 29;
            break;

        case 'IE': // Ireland
            this.shippingCost = totalWeight <= 25 ? 26 : 36;
            break;

        case 'IT': // Italy
            this.shippingCost = totalWeight <= 25 ? 20 : 30;
            break;

        case 'LV': // Latvia
            this.shippingCost = totalWeight <= 25 ? 20 : 30;
            break;

        case 'LT': // Lithuania
            this.shippingCost = totalWeight <= 25 ? 21 : 31;
            break;

        case 'LU': // Luxembourg
            this.shippingCost = totalWeight <= 25 ? 18 : 28;
            break;

        case 'MT': // Malta
            this.shippingCost = totalWeight <= 25 ? 26 : 36;
            break;

        case 'PL': // Poland
            this.shippingCost = totalWeight <= 25 ? 17 : 27;
            break;

        case 'PT': // Portugal
            this.shippingCost = totalWeight <= 25 ? 19 : 29;
            break;

        case 'RO': // Romania
            this.shippingCost = totalWeight <= 25 ? 20 : 30;
            break;

        case 'SK': // Slovakia
            this.shippingCost = totalWeight <= 25 ? 19 : 29;
            break;

        case 'SI': // Slovenia
            this.shippingCost = totalWeight <= 25 ? 20 : 30;
            break;

        case 'ES': // Spain
            this.shippingCost = totalWeight <= 25 ? 18 : 28;
            break;

        case 'SE': // Sweden
            this.shippingCost = totalWeight <= 25 ? 22 : 32;
            break;

        default:
            this.shippingCost = 7.65; // Default shipping cost
            break;
    }
}


  // Update products and recalculate shipping
  getProducts() {
    this.storeService.setAllProducts(true);
  }

  onAddQuantity(item: ProductAddCart): void {
    console.log('Quantity', item);
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: ProductAddCart): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: ProductAddCart): void {
    this.cartService.removeFromCart(item);
  }

  // Handle checkout process
  onCheckout(): void {
    // Send the selected country along with other data
    console.log("this.selectedCountry",  this.selectedCountry)
    this.http
      .post('https://webshopfilimon.azurewebsites.net/api/StripeExpo/checkout', {
        items: this.cart.items,
        country: this.selectedCountry, // Send selected country to backend
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe('pk_live_51PupbL023wMa17ED9GghmFma2S8mVGLXX5Y95l8CdRG4902IoexrGPeVGGUI7ArrqBI4puGicIIRShWkUc69ai2E00kDZeaZnV');
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }

  onCountryChange() {
    console.log("this.selectedCountry",  this.selectedCountry)
    this.calculatorShippingCost(); // Recalculate shipping cost when country is changed
  }
}


