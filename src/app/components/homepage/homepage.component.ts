import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, Subject, of, takeUntil } from "rxjs";
import { Product } from "src/app/Models/product.model";
import { StoreService } from "src/app/service/store.service";
import { WishlistService } from "src/app/service/wishlist.service";
import Swiper from "swiper";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  constructor(
    private storeService: StoreService,
    private wishlistService: WishlistService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private router: Router,
    private metaTagService: Meta
  ) {}
  cols: Observable<number> = of(4);
  private unsubscribe$ = new Subject<void>();
  trendingProducts: Product[] | undefined;
  wishlistProductIds: string[] = [];
  slides = [
    {
      
      image: "../assets/image/loghomeer.jpg",
      //  image: "../assets/image/store2image.jpeg"
    },
    {
      // image: "../assets/image/bgwebshop.png",
      image: "../assets/image/expohabeshlog.png",
       animationClass: "",
       promoTitle: "",
       promoText: "",
       mainTitle: "",
       mainSubtitle: "",
       subtitle:
         "",
       buttonUrl: "",
    },
    // {
    //   // image: "../assets/image/bgslide.jpg",
    //   // image: "../assets/image/sofanishop.jpeg",
     
    // },
  ];

  loading = true;

  ngOnInit() {
    this.metaTagService.addTag({ rel: 'canonical', href: 'https://sofanimarket.com/' });
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Sofani Market - De toonaangevende Eritrese en Ethiopische levensmiddelenwinkel in Arnhem. Ontdek een breed assortiment van Habesha producten.' },
      { name: 'description', content: 'Sofani Market, Habesha Winkel, Eritrese winkel, Ethiopische winkel, levensmiddelen, Arnhem' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Sofani Market - Uw Eritrese Winkel in Arnhem' },
      { property: 'og:title', content: 'Habesha Winkel' },
      { property: 'og:title', content: 'Eritrese winkel' },
      { property: 'og:title', content: 'https://sofanimarket.com' },
      { property: 'og:description', content: 'Ontdek Sofani Market in Arnhem voor authentieke Eritrese en Ethiopische levensmiddelen en producten.' },
      { property: 'og:image', content: 'link_naar_een_afbeelding_van_uw_winkel' },
      { property: 'og:url', content: 'https://sofanimarket.com' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]);
    
    this.getProducts();
    this.fetchWishlistProductIds();

    setTimeout(() => {
      this.loading = false; 
    }, 1000);
  }
  getProducts(): void {
    this.storeService
      .GetPopularProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.trendingProducts = data;
      });
  }
  fetchWishlistProductIds(): void {
    this.wishlistService
      .getWishlistProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.wishlistProductIds = products.map((product) => product.productId);
      });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }

  onAddToWishlist(productId: string): void {
    if (!this.isInWishlist(productId)) {
      this.wishlistService.addToWishlist(productId);
      this.wishlistProductIds.push(productId);
    } else {
      this._snackBar.open("Product is already in the wishlist.", "Ok", {
        duration: 3000,
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const primarySwiper = new Swiper("#primary_slider", {
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-arrow.next",
          prevEl: ".swiper-arrow.prev",
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      const categoriesSwiper = new Swiper("#categories_slider", {
        spaceBetween: 20,
        speed: 400,
        navigation: {
          nextEl: ".swiper-arrow.next",
          prevEl: ".swiper-arrow.prev",
        },

        breakpoints: {
          992: {
            slidesPerView: 4,
          },

          767: {
            slidesPerView: 3,
          },

          450: {
            slidesPerView: 2,
          },

          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
      const trendingProducts = new Swiper("#trendingProducts_slider", {
        slidesPerView: 4, 
        spaceBetween: 20,
        speed: 2000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        

        breakpoints: {
          992: {
            slidesPerView: 4,
          },

          767: {
            slidesPerView: 3,
          },

          450: {
            slidesPerView: 2,
          },

          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
    }, 500);
  }

  products = [

    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/HabeshaDressMenen.jpg",
        },
      ],
      title: "ባህላዊ ናይ ሓበሻ ክዳን",
      piecePrice: 150,
      categoryName: "Women's clothing (ናይ ደቂ ኣንስትዮ ክዳውንቲ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },

    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Herrenbekleidung.jpg",
        },
      ],
      title: "Suit(ሱፍ)",
      piecePrice: 180,
      categoryName: "Men's Clothing (ናይ ደቂ ተባዕትዮ ክዳውንቲ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },

    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/balawichama.jpg",
        },
      ],
      title: "ሓበሻ ባህላዊ ጫማ",
      piecePrice: 20,
      categoryName: "Shoes Men (ናይ ደቂ ተባዕትዮ ጫማ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },

    
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/ayam.jpg",
        },
      ],
      title: "Aryam book",
      piecePrice: 10,
      categoryName: "Books(መጻሕፍቲ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/vaseline.jpg",
        },
      ],
      title: "vaseline(ቫዝሊን)",
      piecePrice: 6,
      categoryName: "cosmetics(መመላኽዒታት)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Ashenda-ኣሸንዳ.jpg",
        },
      ],
      title: "Ashenda-ኣሸንዳ",
      piecePrice: 7,
      categoryName: "Haarverlängerung",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/2ac.jpg",
        },
      ],
      title: "Big Cross Gold (ዓቢ መስቀል ወርቂ) ",
      piecePrice: 7,
      categoryName: "jewellery(ጌጣጌጥ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
  
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/dadal.jpg",
        },
      ],
      title: "berbere Spice /በርበሬ",
      piecePrice: 20,
      categoryName: "Groceries (ምግቢ)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
   
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Mdjaelectric.jpg",
        },
      ],
      title: "Mdja electric",
      piecePrice: 45,
      categoryName: "Traditional material (ባህላዊ ንብረት)",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
      kilo: 2
    },
   
    
  ];

 
}
// this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const fragment = this.route.snapshot.fragment;
    //     if (fragment) {
    //       const element = document.querySelector('#' + fragment);
    //       if (element) element.scrollIntoView();
    //     }
    //   }
    // });